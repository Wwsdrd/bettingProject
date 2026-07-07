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
    <View style={{ backgroundColor: "#FFFFFF", paddingTop: 10, paddingBottom: 2 }}>
      <Text
        style={{
          color: colors.textDark,
          fontFamily: "Inter-SemiBold",
          fontWeight: "600",
          fontSize: 12,
          lineHeight: 21.46,
          letterSpacing: 0,
          paddingLeft: 14,
          marginBottom: 8,
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
          <GameCard key={g.id} game={g} />
        ))}
      </ScrollView>
    </View>
  );
}
