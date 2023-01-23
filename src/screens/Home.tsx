import { View, Text, ScrollView, Alert } from "react-native";
import { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import Loading from "../components/Loading";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";
import dayjs from "dayjs";
import { api } from "../lib/axios";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysFill = minimumSummaryDatesSizes - datesFromYearStart.length;

type iSummaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<iSummaryProps | null>(null);
  const { navigate } = useNavigation();

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/summary");
      setSummary(data);
    } catch (error: any) {
      Alert.alert("Ops", "Não foi possível carregar o sumário de hábitos.");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, i) => (
          <Text
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary && (
          <View className="flex-wrap flex-row">
            {datesFromYearStart.map((date, i) => {
              const dayWithHabits = summary.find((day) => {
                return dayjs(date).isSame(day.date, "day");
              });

              return (
                <HabitDay
                  key={`${date.toString()}-${i}`}
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  onPress={() =>
                    navigate("habit", { date: date.toISOString() })
                  }
                  
                />
              );
              
            })}

            {amountOfDaysFill > 0 &&
              Array.from({ length: amountOfDaysFill }).map((_, i) => (
                <View
                  key={i}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
