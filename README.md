# BloomingBet Mobile App

A premium Nigerian sports betting and casino mobile application built with React Native and Expo. This is the native mobile counterpart to the BloomingBet web platform, designed to match the experience of major Nigerian betting platforms like SportyBet and Bet9ja — native UI, live odds, and direct APK distribution.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) (SDK 56) + React Native 0.85 |
| Navigation | Expo Router (file-based) |
| Styling | NativeWind v5 (Tailwind for React Native) |
| Language | TypeScript |
| Icons | Lucide React Native |
| Blur Effects | expo-blur |
| State (Phase 2+) | Zustand + React Query |

---

## Project Structure

```
src/
├── app/                    # Expo Router screens
│   └── (tabs)/
│       └── index.tsx       # Home screen
├── components/
│   ├── home/
│   │   ├── TopBar.tsx
│   │   ├── PromoBanner.tsx
│   │   ├── CategoryNav.tsx
│   │   ├── LeagueTabs.tsx
│   │   ├── FeaturedMatchCard.tsx
│   │   ├── LiveMatchesSection.tsx
│   │   ├── MatchRow.tsx
│   │   ├── FloatingBetSlip.tsx
│   │   ├── GameCard.tsx
│   │   ├── HotGamesSection.tsx
│   │   └── PopularGamesSection.tsx
│   └── BottomTabBar.tsx
├── constants/
│   └── theme.ts            # Design tokens (colors, typography, spacing)
└── mock/
    ├── matches.ts          # Static match data
    └── games.ts            # Static games data
asset/
└── images/
    ├── hotPick/            # Hot Games section thumbnails
    └── popularGames/       # Popular Games section thumbnails
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android Studio (for Android emulator) or Xcode (for iOS simulator)

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd Betting-mobile-app

# Install dependencies
npm install
```

### Running the App

```bash
# Start Expo dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

Scan the QR code with [Expo Go](https://expo.dev/go) on your device, or press `a` for Android emulator / `i` for iOS simulator.

---

## Current Phase: Phase 0 — Home Screen (Static UI)

The current build is a pixel-close recreation of the Figma home screen design using mock/static data. No backend calls are made.

**Implemented:**
- Top bar (logo, hamburger menu, balance display)
- Promo hero banner
- Category navigation row (Sport, Live, Casino, Virtuals, Number Games)
- League quick-filter tabs
- Featured match card carousel
- Live matches section with tabs, sport filters, and market pills
- Floating bet slip button (draggable, frosted glass style)
- Hot Games horizontal scroll with real image placeholders
- Popular Games horizontal scroll with real image placeholders
- Bottom tab bar (Home, A-Z Menu, Games, Ticket, Profile)

---

## Roadmap

| Phase | Scope |
|---|---|
| Phase 0 | Home screen static UI (current) |
| Phase 1 | Auth — login, register, KYC/age verification |
| Phase 2 | Real API integration (replace mocks) |
| Phase 3 | Bet slip logic — odds calc, multi-bet, stake input |
| Phase 4 | Wallet — deposit/withdraw via Paystack |
| Phase 5 | Live odds via WebSockets, push notifications |
| Phase 6 | Casino / Virtuals / Number games flows |
| Phase 7 | Android APK distribution pipeline |

---

## Design

UI is built from Figma designs, mapped pixel-close to React Native using NativeWind. Design tokens (colors, typography, spacing, shadows) are centralized in [`src/constants/theme.ts`](src/constants/theme.ts).

**Brand green:** `#159A42`  
**Brand gold:** `#D99A39`  
**Background:** `#1C1F26`

---

## License

Private — all rights reserved. Not for redistribution.
