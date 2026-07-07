import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LiveMatch } from "@/mock/matches";
import { colors, radius } from "@/constants/theme";
import { useBetSlip } from "@/context/BetSlipContext";

function OddsPill({ value }: { value: number }) {
  const [selected, setSelected] = useState(false);
  const { addBet, removeBet } = useBetSlip();

  function toggle() {
    if (selected) {
      removeBet();
    } else {
      addBet();
    }
    setSelected((s) => !s);
  }

  return (
    <TouchableOpacity
      onPress={toggle}
      activeOpacity={0.8}
      style={{
        flex: 1,
        backgroundColor: selected ? colors.brandGoldLight : colors.oddsBg,
        paddingVertical: 11,
        borderTopLeftRadius: 3.46,
        borderBottomLeftRadius: 3.46,
        borderTopRightRadius: 3.46,
        borderBottomRightRadius: 3.46,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: selected ? colors.textDark : "#fff", fontSize: 12, fontWeight: "700" }}>
        {value.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

export default function MatchRow({ match }: { match: LiveMatch }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 9,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        gap: 8,
        backgroundColor: colors.bgPrimary,
      }}
    >
      {/* ── Minute + live pulse ── */}
      <View style={{ width: 30, alignItems: "center" }}>
        <Text style={{ color: "#EDB327", fontSize: 11, fontWeight: "700" }}>
          {match.minute}
        </Text>
      </View>

      {/* ── Teams + live score ── */}
      <View style={{ flex: 1, gap: 3, marginRight: 4 }}>
        {/* Team A */}
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text
            style={{ color: colors.textPrimary, fontSize: 12, fontWeight: "700", flex: 1 }}
            numberOfLines={1}
          >
            {match.teamA}
          </Text>
          <Text
            style={{
              color: "#EDB327",
              fontSize: 12,
              fontWeight: "700",
              marginLeft: 6,
            }}
          >
            {match.scoreA}
          </Text>
        </View>

        {/* Team B */}
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text
            style={{ color: colors.textPrimary, fontSize: 12, fontWeight: "700", flex: 1 }}
            numberOfLines={1}
          >
            {match.teamB}
          </Text>
          <Text
            style={{
              color: "#EDB327",
              fontSize: 12,
              fontWeight: "700",
              marginLeft: 6,
            }}
          >
            {match.scoreB}
          </Text>
        </View>
      </View>

      {/* ── Odds pills (1 / X / 2) ── */}
      <View style={{ flexDirection: "row", gap: 4, width: 150 }}>
        {match.odds.map((odd, i) => (
          <OddsPill key={i} value={odd} />
        ))}
      </View>
    </View>
  );
}
