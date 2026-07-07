import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { useBetSlip } from "@/context/BetSlipContext";

export default function FloatingBetSlip() {
  const { count } = useBetSlip();
  const insets = useSafeAreaInsets();
  // Match the tab bar height calculation from (tabs)/_layout.tsx
  const tabBarHeight = 56 + Math.max(insets.bottom, 16) + 16;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        position: "absolute",
        bottom: tabBarHeight + 12,
        right: 0,
        width: 58,
        height: 57,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        overflow: "hidden",
      }}
    >
      <BlurView
        intensity={40}
        tint="light"
        style={{
          flex: 1,
          backgroundColor: "#F6F6F699",
          alignItems: "center",
          justifyContent: "center",
          rowGap: 4,
        }}
      >
        {/* Count badge */}
        <View
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: colors.brandGreen,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.brandGold,
              fontSize: 16,
              fontWeight: "800",
              lineHeight: 20,
            }}
          >
            {count}
          </Text>
        </View>

        <Text
          style={{
            color: colors.textDark,
            fontSize: 10,
            fontWeight: "600",
            letterSpacing: 0.2,
          }}
        >
          Betslip
        </Text>
      </BlurView>
    </TouchableOpacity>
  );
}
