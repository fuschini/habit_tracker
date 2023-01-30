import { View, Text } from "react-native";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning.ts'
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const datesFromYearBeginning = generateDatesFromYearBeginning()

export function Home() {
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
            <View className="flex-row flex-wrap">
                {
                    datesFromYearBeginning.map(date => (
                        <HabitDay key={date.toISOString()} />
                    ))
                }
            </View>

        </View>
    )
}