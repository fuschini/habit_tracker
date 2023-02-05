import { Alert, ScrollView, Text, View } from "react-native";
import { useRoute } from '@react-navigation/native'
import dayjs from "dayjs";

import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import { EmptyHabits } from "../components/EmptyHabits";

interface Params {
    date: string
}

interface DayInfoProps {
    completedHabit: string[];
    possibleHabits: {
        id: string;
        title: string;
    }[]
}

export function Habit() {
    const route = useRoute()
    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])
    const { date } = route.params as Params

    const parsedDate = dayjs(date)
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MM')

    const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    async function fetchHabits() {
        try {
            setLoading(true)
            const res = await api.get('/day', { params: { date } })
            setDayInfo(res.data)
            setCompletedHabits(res.data.completedHabits)
        } catch (e) {
            console.log(e);
            Alert.alert('Ops', 'Failed to load habits info')
        } finally {
            setLoading(false)
        }
    }

    async function handleHabitToggle(habitId: string) {
        try {
            await api.patch(`/habits/${habitId}/toggle`)

            if (completedHabits.includes(habitId)) {
                setCompletedHabits(prevState => prevState.filter(habit => habit != habitId))
            } else {
                setCompletedHabits(prevState => [...prevState, habitId])
            }

        } catch (error) {
            console.log(error);
            Alert.alert('Ops', 'Failed to toggle habit status')
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [])

    if (loading) {
        return (<Loading />)
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <BackButton />

                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfWeek}
                </Text>

                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>

                <ProgressBar progress={habitsProgress} />

                <View className="mt-6">
                    {dayInfo?.possibleHabits.length != 0 ?
                        dayInfo?.possibleHabits.map((habit, i) => (
                            <Checkbox
                                key={habit.id}
                                title={habit.title}
                                checked={completedHabits.includes(habit.id)}
                                onPress={() => handleHabitToggle(habit.id)}
                            />
                        ))
                        : <EmptyHabits />
                    }
                </View>
            </ScrollView>

        </View>
    )
}