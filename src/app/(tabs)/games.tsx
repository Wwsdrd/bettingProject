import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

export default function GamesScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: colors.textSecondary, fontSize: 16 }}>Games — coming soon</Text>
      </View>
    </SafeAreaView>
  );
}
