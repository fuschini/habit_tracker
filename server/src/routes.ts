import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { prisma } from "./lib/prisma"


export async function appRoutes(app: FastifyInstance) {

    app.post('/habits', async (request) => {

        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
            )
        })

        const { title, weekDays } = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay
                        }
                    })
                }
            }
        })

    })

    app.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date() // NOTE: z.coerce.date() automatically converts a date string received from the frontend to a date object for the validation
        })

        const { date } = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')
        const weekDay = parsedDate.get('day')

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date
                },
                weekDays: {
                    some: {
                        week_day: weekDay
                    }
                }
            }
        })

        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate()
            },
            include: {
                dayHabits: true
            }
        })

        // Example of JS nullish coalescing
        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        }) ?? []

        return {
            possibleHabits,
            completedHabits
        }
    })

    app.patch('/habits/:habit_id/toggle', async (request) => {
        const toggleHabitParams = z.object({
            habit_id: z.string().uuid()
        })

        const { habit_id } = toggleHabitParams.parse(request.params)

        // Endpoint only allows toggles habit for today
        const today = dayjs().startOf('day').toDate()

        let day = await prisma.day.findUnique({
            where: {
                date: today
            }
        })

        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id
                }
            }
        })

        if (dayHabit) {
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            })
        } else {
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id
                }
            })
        }
    })

    app.get('/summary', async () => {
        const summary = await prisma.$queryRaw`
            select 
                d.id,
                d.date,
                (
                    select cast(count(*) as float)
                    from day_habits
                    where day_id = d.id
                ) as completed,
                (
                    select cast(count(*) as float)
                    from habit_week_days hwd
                    join habits h on hwd.habit_id = h.id
                    where week_day = cast(strftime('%w', d.date / 1000.0, 'unixepoch') as int) and h.created_at <= d.date
                ) as amount
            from days d
            order by d.date;
        `
        return summary
    })
}
