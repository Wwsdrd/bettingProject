import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { CircleDot, Calendar } from "lucide-react-native";
import { FeaturedMatch } from "@/mock/matches";
import { colors, radius, shadows } from "@/constants/theme";
import { useBetSlip } from "@/context/BetSlipContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_GAP = 12;
const MS_PER_CARD = 4000; // ms to scroll one card width — raise to slow down

function OddsButton({ value }: { value: number }) {
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
        paddingVertical: 9,
        borderTopLeftRadius: 3.46,
        borderBottomLeftRadius: 3.46,
        borderTopRightRadius: 3.46,
        borderBottomRightRadius: 3.46,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: selected ? colors.textDark : "#FFFFFF", fontWeight: "700", fontSize: 15, letterSpacing: 0.3 }}>
        {value.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

function MatchCard({ match }: { match: FeaturedMatch }) {
  return (
    <View
      style={{
        width: CARD_WIDTH,
        backgroundColor: "#FFFFFF",
        borderRadius: radius.lg,
        paddingHorizontal: 20,
        paddingVertical: 12,   // reduced from 18 → slimmer card
        marginRight: CARD_GAP,
        ...shadows.card,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
        <CircleDot size={13} color={colors.textMuted} />
        <Text style={{ color: colors.textMuted, fontSize: 12 }}>{match.league}</Text>
      </View>

      <Text style={{ color: colors.textDark, fontSize: 17, fontWeight: "700", marginBottom: 1, lineHeight: 22 }}>
        {match.teamA}
      </Text>
      <Text style={{ color: colors.textDark, fontSize: 17, fontWeight: "700", lineHeight: 22, marginBottom: 8 }}>
        {match.teamB}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 }}>
        <Calendar size={13} color={colors.textMuted} />
        <Text style={{ color: colors.textMuted, fontSize: 12 }}>{match.datetime}</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 8 }}>
        {match.odds.map((odd, i) => (
          <OddsButton key={i} value={odd} />
        ))}
      </View>
    </View>
  );
}

export default function FeaturedMatchCard({ matches }: { matches: FeaturedMatch[] }) {
  const scrollRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const animRef = useRef<Animated.CompositeAnimation | null>(null);
  const momentumActive = useRef(false);

  const loopWidth = matches.length * (CARD_WIDTH + CARD_GAP);
  const loopedMatches = [...matches, ...matches];

  // ── Animation helpers ────────────────────────────────────────────────────

  const startAnimFrom = (fromX: number) => {
    if (matches.length === 0) return;

    // Normalize into [0, loopWidth) so we always start from the first copy
    const normalX = fromX % loopWidth;
    const remainingPct = (loopWidth - normalX) / loopWidth;

    // Instantly snap to the equivalent position in the first copy (invisible
    // because the duplicated cards look identical)
    scrollRef.current?.scrollTo({ x: normalX, animated: false });
    scrollX.setValue(normalX);

    animRef.current = Animated.timing(scrollX, {
      toValue: loopWidth,
      duration: remainingPct * matches.length * MS_PER_CARD,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    animRef.current.start(({ finished }) => {
      if (finished) startAnimFrom(0);
    });
  };

  const stopAnim = () => {
    animRef.current?.stop();
    animRef.current = null;
  };

  // ── Mount: start listener + animation ───────────────────────────────────

  useEffect(() => {
    if (matches.length === 0) return;

    const id = scrollX.addListener(({ value }) => {
      scrollRef.current?.scrollTo({ x: value, animated: false });
    });

    startAnimFrom(0);

    return () => {
      stopAnim();
      scrollX.removeListener(id);
    };
  }, [matches.length]);

  // ── Touch handlers ───────────────────────────────────────────────────────

  // User starts dragging → freeze the animation, let ScrollView respond normally
  const onScrollBeginDrag = () => {
    stopAnim();
  };

  // User lifts finger with no momentum → resume immediately
  const onScrollEndDrag = (e: any) => {
    momentumActive.current = false;
    const x = e.nativeEvent.contentOffset.x;
    // Give momentum scroll a tiny window to start; if it doesn't, resume here
    setTimeout(() => {
      if (!momentumActive.current) startAnimFrom(x);
    }, 80);
  };

  // Momentum started → mark it so the timeout above doesn't double-fire
  const onMomentumScrollBegin = () => {
    momentumActive.current = true;
  };

  // Momentum finished → resume from wherever it settled
  const onMomentumScrollEnd = (e: any) => {
    momentumActive.current = false;
    startAnimFrom(e.nativeEvent.contentOffset.x);
  };

  return (
    <View style={{ backgroundColor: "#3C3C44", paddingTop: 18, paddingBottom: 18 }}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 16,
          fontWeight: "700",
          paddingHorizontal: 16,
          marginBottom: 14,
        }}
      >
        Featured Match
      </Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        // scrollEnabled left ON so touch responds; animation pauses on drag
        // and auto-resumes once the hand is lifted
        contentContainerStyle={{ paddingHorizontal: 16 }}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {loopedMatches.map((m, i) => (
          <MatchCard key={`${m.id}-${i}`} match={m} />
        ))}
      </ScrollView>
    </View>
  );
}
