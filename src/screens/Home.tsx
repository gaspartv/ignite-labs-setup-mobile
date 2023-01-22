import { View, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateRangeDatesFromYearStart } from "../utils/generate-range-between-dates";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const datesFromYearStart = generateRangeDatesFromYearStart();
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysFill = minimumSummaryDatesSizes - datesFromYearStart.length;

export const Home = () => {
  const { navigate } = useNavigation();

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
        <View className="flex-wrap flex-row">
          {datesFromYearStart.map((date, i) => (
            <HabitDay
              key={`${date.toString()}-${i}`}
              onPress={() => navigate("habit", { date: date.toISOString() })}
            />
          ))}

          {amountOfDaysFill > 0 &&
            Array.from({ length: amountOfDaysFill }).map((_, i) => (
              <View
                key={i}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: DAY_SIZE, height: DAY_SIZE }}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
