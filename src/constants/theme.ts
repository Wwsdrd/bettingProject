/**
 * BloomingBet Design Tokens
 * Source of truth — update here to propagate everywhere.
 * Brand green #159A42 confirmed from Figma SVG export (logosvg).
 */

export const colors = {
  // --- Backgrounds (premium dark charcoal/slate — per Figma) ---
  bgPrimary: "#1C1F26",       // main screen bg — dark grey
  bgCard: "#272C3F",          // card / panel surface
  bgHeader: "#1C1F26",        // top-bar (slightly darker than body)
  bgTabBar: "#1C1F26",        // bottom tab bar (matches footer bg)
  bgBetSlip: "#159A42",
  bgCategoryIcon: "#2C3044",  // neutral dark circle — no green tint
  bgSportPillActive: "#159A42",
  bgSportPillInactive: "transparent",
  bgMarketPillActive: "transparent",

  // --- Banner ---
  bgBannerStart: "#0B4535",
  bgBannerEnd: "#0F6045",

  // --- Brand ---
  brandGreen: "#159A42",
  brandGreenDark: "#0E7A32",
  brandGold: "#D99A39",
  brandGoldLight: "#EDB327",

  // --- Text ---
  textPrimary: "#FFFFFF",
  textSecondary: "#8893A6",
  textMuted: "#5D6779",
  textBrand: "#159A42",
  textDark: "#1C2030",        // dark text used inside white cards

  // --- Odds Buttons ---
  oddsBg: "#159A42",
  oddsText: "#FFFFFF",

  // --- Navigation ---
  tabActive: "#159A42",
  tabInactive: "#6B7A93",
  tabUnderline: "#159A42",

  // --- Status ---
  liveIndicator: "#159A42",

  // --- Borders / Dividers ---
  border: "#2E3348",
  pillActiveBorder: "#FFFFFF",
  cardBorder: "#2A3050",

  // --- League cards (white elevated) ---
  leagueCardBg: "#FFFFFF",
} as const;

export const typography = {
  fontFamily: { sans: "System", display: "System" },
  fontSize: { xs: 11, sm: 12, base: 14, md: 16, lg: 18, xl: 22 },
  fontWeight: {
    regular: "400" as const,
    medium: "500" as const,
    semiBold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const spacing = {
  xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, xxl: 32,
} as const;

export const radius = {
  sm: 6, md: 8, lg: 12, xl: 16, full: 9999,
} as const;

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  leagueCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 4,
    elevation: 3,
  },
  betSlip: {
    shadowColor: "#159A42",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
} as const;

export const iconSize = {
  xs: 14, sm: 18, md: 22, lg: 26, xl: 32,
} as const;

const theme = { colors, typography, spacing, radius, shadows, iconSize } as const;
export default theme;
