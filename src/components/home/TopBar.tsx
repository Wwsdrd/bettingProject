import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Menu } from "lucide-react-native";
import BloomingBetLogo from "@/components/ui/BloomingBetLogo";
import { colors } from "@/constants/theme";

export default function TopBar() {
  return (
    <View
      style={{ backgroundColor: colors.bgHeader }}
      className="flex-row items-center justify-between px-4 py-3"
    >
      {/* Hamburger + Logo grouped on the left */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TouchableOpacity className="p-1">
          <Menu size={26} color={colors.textPrimary} />
        </TouchableOpacity>
        <BloomingBetLogo width={130} height={29} />
      </View>

      {/* Balance stays on the right */}
      <Text
        className="text-sm font-bold"
        style={{ color: colors.brandGreen }}
      >
        NGN 00.00
      </Text>
    </View>
  );
}
