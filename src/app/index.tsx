import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import BloomingBetLogo from "@/components/ui/BloomingBetLogo";
import { colors } from "@/constants/theme";

const { width: SCREEN_W } = Dimensions.get("window");

// Figma splash frame: logo spans ~70% of screen width, 137×31 native aspect
const LOGO_WIDTH = Math.round(SCREEN_W * 0.7);
const LOGO_HEIGHT = Math.round(LOGO_WIDTH * (31 / 137));

const SPLASH_HOLD_MS = 2200;

export default function Splash() {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => router.replace("/onboarding"), SPLASH_HOLD_MS);
    return () => clearTimeout(timer);
  }, [router, opacity]);

  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      <StatusBar style="light" />
      <Animated.View style={{ opacity }}>
        <BloomingBetLogo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
      </Animated.View>
    </View>
  );
}
