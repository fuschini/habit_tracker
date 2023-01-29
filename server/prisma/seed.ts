import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const firstHabitId = 'c8ca41d7-61f4-46bc-9345-a34719c77a27'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')
const secondHabitId = '991b9b8f-ecf3-4a56-b738-384b990b0f78'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')
const thirdHabitId = '3c5b96c5-ee3e-40f1-8491-bf081e51d236'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {
    await prisma.habitWeekDays.deleteMany()
    await prisma.dayHabit.deleteMany()
    await prisma.day.deleteMany()
    await prisma.habit.deleteMany()

    await Promise.all([
        prisma.habit.create({
            data: {
                id: firstHabitId,
                title: 'Drink 3L of water',
                created_at: firstHabitCreationDate,
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 }
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: secondHabitId,
                title: 'Exercise',
                created_at: secondHabitCreationDate,
                weekDays: {
                    create: [
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 }
                    ]
                }
            }
        }),

        prisma.habit.create({
            data: {
                id: thirdHabitId,
                title: 'Sleep for 8h',
                created_at: thirdHabitCreationDate,
                weekDays: {
                    create: [
                        { week_day: 1 },
                        { week_day: 2 },
                        { week_day: 3 },
                        { week_day: 4 },
                        { week_day: 5 }
                    ]
                }
            }
        }),

    ])

    await Promise.all([
        // Habits (Complete/Available): 1/1
        prisma.day.create({
            data: {
                // Monday
                date: new Date('2023-01-02T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId
                    }
                }
            }
        }),

        // Habits (Complete/Available): 1/1
        prisma.day.create({
            data: {
                date: new Date('2023-01-06T03:00:00.000z'),
                dayHabits: {
                    create: {
                        habit_id: firstHabitId
                    }
                }
            }
        }),

        // Habits (Complete/Available): 2/2
        prisma.day.create({
            data: {
                date: new Date('2023-01-04T03:00:00.000z'),
                dayHabits: {
                    create: [
                        { habit_id: firstHabitId },
                        { habit_id: secondHabitId },
                    ]
                }
            }
        })
    ])


}

run()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
