import { View, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import TopBar from "@/components/home/TopBar";
import PromoBanner from "@/components/home/PromoBanner";
import CategoryNav from "@/components/home/CategoryNav";
import LeagueTabs from "@/components/home/LeagueTabs";
import FeaturedMatchCard from "@/components/home/FeaturedMatchCard";
import LiveMatchesSection from "@/components/home/LiveMatchesSection";
import HotGamesSection from "@/components/home/HotGamesSection";
import PopularGamesSection from "@/components/home/PopularGamesSection";
import FloatingBetSlip from "@/components/home/FloatingBetSlip";
import Footer from "@/components/home/Footer";

import { featuredMatches, liveMatches } from "@/mock/matches";
import { hotGames, popularGames } from "@/mock/games";
import { colors } from "@/constants/theme";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  // Leave space for tab bar (50px content + safe area) + floating bet slip
  const scrollPaddingBottom = 50 + Math.max(insets.bottom, 8) + 70;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bgPrimary }}
      edges={["top"]}
    >
      <StatusBar style="light" />

      {/* Sticky top bar */}
      <TopBar />

      {/* Scrollable body */}
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.bgPrimary }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scrollPaddingBottom }}
      >
        <PromoBanner />
        <CategoryNav />
        <LeagueTabs />
        <FeaturedMatchCard matches={featuredMatches} />
        <LiveMatchesSection matches={liveMatches} />
        <HotGamesSection games={hotGames} />
        <PopularGamesSection games={popularGames} />
        <Footer />
      </ScrollView>

      {/* Floating bet slip above tab bar */}
      <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="box-none">
        <FloatingBetSlip />
      </View>
    </SafeAreaView>
  );
}
