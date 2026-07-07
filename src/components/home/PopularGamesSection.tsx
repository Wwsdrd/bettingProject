import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import GameCard from "@/components/home/GameCard";
import { Game } from "@/mock/games";
import { colors } from "@/constants/theme";

interface PopularGamesSectionProps {
  games: Game[];
}

export default function PopularGamesSection({ games }: PopularGamesSectionProps) {
  return (
    <View style={{ backgroundColor: "#FFFFFF", paddingTop: 10, paddingBottom: 10 }}>
      <Text
        style={{
          color: colors.textDark,
          fontSize: 13,
          fontWeight: "700",
          letterSpacing: 1.2,
          paddingHorizontal: 16,
          marginBottom: 8,
        }}
      >
        POPULAR GAMES
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

      {/* Play More CTA */}
      <TouchableOpacity style={{ alignItems: "center", marginTop: 10 }}>
        <Text
          style={{
            color: colors.brandGreen,
            fontSize: 13,
            fontWeight: "700",
            letterSpacing: 0.5,
          }}
        >
          PLAY MORE, WIN MORE
        </Text>
      </TouchableOpacity>
    </View>
  );
}
