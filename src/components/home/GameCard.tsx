import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { Game } from "@/mock/games";
import { radius } from "@/constants/theme";

interface GameCardProps {
  game: Game;
  size?: number;
}

export default function GameCard({ game, size = 110 }: GameCardProps) {
  const cardStyle = {
    width: size,
    height: size,
    borderRadius: radius.lg,
    overflow: "hidden" as const,
    marginRight: 10,
    justifyContent: "flex-end" as const,
  };

  const content = (
    <>
      {/* Accent stripe — only shown when no image */}
      {!game.image && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundColor: game.accentColor,
          }}
        />
      )}

      {/* Decorative circle — only shown when no image */}
      {!game.image && (
        <View
          style={{
            position: "absolute",
            top: 12,
            right: -14,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: game.accentColor,
            opacity: 0.18,
          }}
        />
      )}

      {/* Title overlay */}
      <View style={{ padding: 8, backgroundColor: "rgba(0,0,0,0.45)" }}>
        <Text
          style={{ color: "#fff", fontSize: 11, fontWeight: "700", lineHeight: 14 }}
          numberOfLines={2}
        >
          {game.title}
        </Text>
      </View>
    </>
  );

  if (game.image) {
    return (
      <TouchableOpacity style={cardStyle} activeOpacity={0.85}>
        <ImageBackground
          source={game.image}
          style={{ flex: 1, justifyContent: "flex-end" }}
          resizeMode="cover"
        >
          {content}
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[cardStyle, { backgroundColor: game.bgColor }]}
      activeOpacity={0.85}
    >
      {content}
    </TouchableOpacity>
  );
}
