import React from "react";
import { View, Text, ScrollView } from "react-native";
import GameCard from "@/components/home/GameCard";
import { Game } from "@/mock/games";
import { colors } from "@/constants/theme";

interface HotGamesSectionProps {
  games: Game[];
}

export default function HotGamesSection({ games }: HotGamesSectionProps) {
  return (
    <View style={{ backgroundColor: colors.bgPrimary, paddingTop: 20, paddingBottom: 4 }}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 13,
          fontWeight: "700",
          letterSpacing: 1.2,
          paddingHorizontal: 16,
          marginBottom: 12,
        }}
      >
        HOT GAMES
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {games.map((g) => (
          <GameCard key={g.id} game={g} size={110} />
        ))}
      </ScrollView>
    </View>
  );
}
