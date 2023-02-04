import { View, Text, ScrollView, Alert } from "react-native";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning.ts'
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { useNavigation } from "@react-navigation/native";
import { api } from "../lib/axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const datesFromYearBeginning = generateDatesFromYearBeginning()
const minimumSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearBeginning.length

type SummaryProps = Array<{
    id: string;
    date: string;
    amount: number;
    completed: number;
}>

export function Home() {
    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<SummaryProps | null>(null)

    const { navigate } = useNavigation()

    async function fetchData() {
        try {
            setLoading(true)
            const res = await api.get('/summary')
            setSummary(res.data)
        } catch (e) {
            Alert.alert('Ops', `Couldn't load habits summary`)
            console.log(e);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDays, i) => (
                        <Text
                            key={i}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{ width: DAY_SIZE, height: DAY_SIZE }}
                        >
                            {weekDays}
                        </Text>
                    ))
                }
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Ugly sintax to say only render the View if summary is not null */}
                {summary &&
                    <View className="flex-row flex-wrap">
                        {
                            datesFromYearBeginning.map(date => {
                                const dayWithHabits = summary.find(day => {
                                    return dayjs(date).isSame(day.date, 'day')
                                })

                                return (
                                    <HabitDay
                                        key={date.toISOString()}
                                        date={date}
                                        amountOfHabits={dayWithHabits?.amount}
                                        amountCompleted={dayWithHabits?.completed}
                                        onPress={() => navigate('habit', { date: date.toISOString() })}
                                    />
                                )
                            })
                        }

                        {
                            amountOfDaysToFill > 0 && Array
                                .from({ length: amountOfDaysToFill })
                                .map((_, i) => (
                                    <View
                                        key={i}
                                        className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                        style={{ width: DAY_SIZE, height: DAY_SIZE }}
                                    />
                                ))
                        }
                    </View>
                }
            </ScrollView>

        </View>
    )
}