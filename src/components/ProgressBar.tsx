import { View } from "react-native";

interface iProps {
  progress?: number;
}

export const ProgressBar = ({ progress = 0 }: iProps) => {
  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <View
        className="h-3 rounded-xl bg-violet-600"
        style={{ width: `${progress}%` }}
      />
    </View>
  );
};