import React, { useRef, useState, useEffect } from "react";
import { View, Image, ScrollView, Dimensions } from "react-native";

const BANNER_WIDTH = Dimensions.get("window").width;
const BANNER_HEIGHT = 115;
const SLIDE_INTERVAL = 3000;

const slides = [
  require("../../../asset/images/Component 45.png"),
  require("../../../asset/images/Component 47.png"),
  require("../../../asset/images/Component 48.png"),
  require("../../../asset/images/Component 49.png"),
];

export default function PromoBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollTo = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * BANNER_WIDTH, animated: true });
    setActiveIndex(index);
  };

  // Auto-advance every SLIDE_INTERVAL ms
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % slides.length;
        scrollRef.current?.scrollTo({ x: next * BANNER_WIDTH, animated: true });
        return next;
      });
    }, SLIDE_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Pause auto-advance while user is swiping
  const pauseTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeTimer = () => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % slides.length;
        scrollRef.current?.scrollTo({ x: next * BANNER_WIDTH, animated: true });
        return next;
      });
    }, SLIDE_INTERVAL);
  };

  const onMomentumScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / BANNER_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScrollBeginDrag={pauseTimer}
        onScrollEndDrag={resumeTimer}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT }}
      >
        {slides.map((src, i) => (
          <Image
            key={i}
            source={src}
            style={{ width: BANNER_WIDTH, height: BANNER_HEIGHT }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Dot indicators */}
      <View
        style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        {slides.map((_, i) => (
          <View
            key={i}
            onTouchEnd={() => scrollTo(i)}
            style={{
              width: activeIndex === i ? 16 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: activeIndex === i ? "#159A42" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </View>
    </View>
  );
}
