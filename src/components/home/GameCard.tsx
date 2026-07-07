import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Game } from "@/mock/games";

const CARD_W = 118.28;
const CARD_H = 101.30;
const CARD_RADIUS = 5.22;

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const cardStyle = {
    width: CARD_W,
    height: CARD_H,
    borderRadius: CARD_RADIUS,
    overflow: "hidden" as const,
    marginRight: 10,
    justifyContent: "flex-end" as const,
  };

  const content = (
    <>
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
          style={{ width: CARD_W, height: CARD_H, justifyContent: "flex-end" }}
          resizeMode="cover"
          imageStyle={{ width: CARD_W, height: CARD_H, borderRadius: CARD_RADIUS }}
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
