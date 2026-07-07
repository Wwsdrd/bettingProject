import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SvgXml } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ONBOARDING_ONE_XML } from "@/components/onboarding/onboardingOneXml";
import { ONBOARDING_TWO_XML } from "@/components/onboarding/onboardingTwoXml";
import { ONBOARDING_THREE_XML } from "@/components/onboarding/onboardingThreeXml";
import { colors } from "@/constants/theme";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

// Figma frame is 412×917 — illustrations sit at native size, 42.21px above
// the title. Widths scale with the screen; heights are clamped so short
// devices never push the copy off-screen.
const FIGMA_SCALE = SCREEN_W / 412;
const V_SCALE = SCREEN_H / 917;
const ILLU_TITLE_GAP = 42.21;
const ILLU_MAX_H = SCREEN_H * 0.48;

interface Slide {
  key: string;
  xml: string;
  nativeW: number;
  nativeH: number;
  title: string;
  subtitle: string;
}

const SLIDES: Slide[] = [
  {
    key: "welcome",
    xml: ONBOARDING_ONE_XML,
    nativeW: 226.856,
    nativeH: 395.786,
    title: "Welcome to Bloomingbet",
    subtitle: "Your trusted space to bet on sports and win big, anytime, anywhere",
  },
  {
    key: "wallet",
    xml: ONBOARDING_TWO_XML,
    nativeW: 334.8145,
    nativeH: 423.9998,
    title: "Fund Your Wallet in Seconds",
    subtitle: "Instant deposits and withdrawals via bank, cards, or mobile money",
  },
  {
    key: "rules",
    xml: ONBOARDING_THREE_XML,
    nativeW: 310.2608,
    nativeH: 396.0001,
    title: "Your Game, Your Rules",
    subtitle: "Explore live matches, place bets, and enjoy seamless cashouts. Play responsibly.",
  },
];

function OnboardingSlide({ slide }: { slide: Slide }) {
  const height = Math.min(slide.nativeH * FIGMA_SCALE, ILLU_MAX_H);
  const width = height * (slide.nativeW / slide.nativeH);

  return (
    <View style={{ width: SCREEN_W, height: "100%" }}>
      {/* Illustration anchored just above the title, as in the Figma frame */}
      <View className="flex-1 items-center justify-end">
        <SvgXml
          xml={slide.xml}
          width={width}
          height={height}
          style={{
            marginTop: 32 * FIGMA_SCALE,
            marginBottom: ILLU_TITLE_GAP * FIGMA_SCALE,
          }}
        />
      </View>

      <Text
        style={{
          fontFamily: "Inter-SemiBold",
          fontSize: 24,
          lineHeight: 24,
          letterSpacing: -0.48,
          color: "#000000",
          textAlign: "center",
        }}
      >
        {slide.title}
      </Text>

      <Text
        style={{
          fontFamily: "Inter",
          fontSize: 16,
          lineHeight: 25,
          letterSpacing: -0.32,
          color: "#000000",
          textAlign: "center",
          maxWidth: 317,
          alignSelf: "center",
          marginTop: 17,
          marginBottom: 24 * FIGMA_SCALE,
        }}
      >
        {slide.subtitle}
      </Text>
    </View>
  );
}

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);

  const finish = () => router.replace("/(tabs)");

  const goNext = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      finish();
    }
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W));
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <FlatList
        ref={listRef}
        data={SLIDES}
        keyExtractor={(slide) => slide.key}
        renderItem={({ item }) => <OnboardingSlide slide={item} />}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        getItemLayout={(_, i) => ({ length: SCREEN_W, offset: SCREEN_W * i, index: i })}
        style={{ flex: 1 }}
      />

      {/* 185px band between the copy and the bottom bar, dots centered in it */}
      <View
        style={{ height: 185 * V_SCALE, gap: 8 }}
        className="flex-row items-center justify-center"
      >
        {SLIDES.map((slide, i) => (
          <View
            key={slide.key}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: i === index ? colors.brandGreen : "#D9D9D9",
            }}
          />
        ))}
      </View>

      <View
        className="flex-row items-center justify-between px-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <TouchableOpacity
          onPress={finish}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text
            style={{
              fontFamily: "Inter-SemiBold",
              fontSize: 12,
              lineHeight: 20,
              color: "#000000",
            }}
          >
            SKIP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goNext}
          style={{
            width: 76,
            height: 40,
            borderRadius: 5,
            backgroundColor: colors.brandGreen,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Inter-SemiBold",
              fontSize: 12,
              lineHeight: 20,
              color: "#FFFFFF",
            }}
          >
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
