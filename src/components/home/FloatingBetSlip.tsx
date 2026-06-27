import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, shadows } from "@/constants/theme";

const { width: SW, height: SH } = Dimensions.get("window");

const W = 58;
const H = 57;

export default function FloatingBetSlip() {
  const [count] = useState(3);
  const insets = useSafeAreaInsets();
  const isDragging = useRef(false);

  const clearanceRef = useRef(70);
  clearanceRef.current = 50 + Math.max(insets.bottom, 8) + 12;

  const pan = useRef(
    new Animated.ValueXY({
      x: SW - W, // flush right edge (Figma: left: 354 on ~390px screen)
      y: SH * 0.33,
    })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        isDragging.current = false;
        pan.setOffset({ x: (pan.x as any)._value, y: (pan.y as any)._value });
        pan.setValue({ x: 0, y: 0 });
      },

      onPanResponderMove: (_, gesture) => {
        if (Math.abs(gesture.dx) > 4 || Math.abs(gesture.dy) > 4) {
          isDragging.current = true;
        }
        pan.setValue({ x: gesture.dx, y: gesture.dy });
      },

      onPanResponderRelease: () => {
        pan.flattenOffset();

        if (!isDragging.current) return;

        const rawX = (pan.x as any)._value;
        const rawY = (pan.y as any)._value;

        // Snap to nearest horizontal edge
        const snapX = rawX + W / 2 < SW / 2 ? 0 : SW - W;
        const clampedY = Math.max(
          60,
          Math.min(SH - H - clearanceRef.current, rawY)
        );

        Animated.spring(pan, {
          toValue: { x: snapX, y: clampedY },
          useNativeDriver: false,
          tension: 40,
          friction: 7,
        }).start();
      },
    })
  ).current;

  // Derive border-radius from which edge the button is on:
  // right edge → round left corners; left edge → round right corners
  const isOnRightEdge = Animated.diffClamp(pan.x, SW / 2, SW).interpolate({
    inputRange: [SW / 2, SW],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        position: "absolute",
        left: pan.x,
        top: pan.y,
        width: W,
        height: H,
        overflow: "hidden",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        ...shadows.betSlip,
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
        {/* Count badge circle */}
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
    </Animated.View>
  );
}
