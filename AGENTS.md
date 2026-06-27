# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.



You are an expert mobile developer specializing in React Native, TypeScript, and the Expo framework. You write clean, simple, maintainable code. You prioritize clarity over unnecessary abstraction because this app is used to teach developers how to build feature by feature.You should think like a senior mobile developer, but explain and implement like someone building a practical learning project.
Your sole objective is to build a premium, high-performance mobile application based on our existing, fully functional web codebase and figma design ---

## . Figma & UI Design Interpretation
- When provided with Figma design screenshots, design system guidelines, or exported Dev Mode properties, prioritize pixel-perfect visual fidelity.
- Map Figma layout properties (Flexbox layouts, padding, gap, margins, border-radius) directly to React Native `native wind` attributes.
- Ensure typography scaling aligns with mobile viewport constraints while preserving the aesthetic hierarchy of the original design.

---
# Project overview

Blooming Bet — Mobile App Build Plan
Context
Blooming Bet is a Nigerian sports betting + casino platform. The web version
exists (sandbox.bloomingbet.com) and is being built by a colleague on the
team. This repo is the mobile app version, built native (React Native +
Expo) rather than as a WebView wrapper, to match what other major Nigerian
betting platforms (SportyBet, Bet9ja) do — native UI for live odds, no
webview lag, and freedom from Play Store gambling restrictions via direct
APK distribution.
Phase 0 goal (current): Recreate the home page from the provided Figma
reference 1:1, using mock data, so the boss can review direction before we
go further. No backend wiring yet.
#  Tech Stack
Framework: Expo (React Native), Expo Router for navigation
Styling: NativeWind (Tailwind for RN) — keep consistent with Secured
Escrow project conventions
State (later phases): Zustand for local state, React Query for
server state
Icons: lucide-react-native or custom SVGs matching Figma icon set
Fonts: match web (confirm family from Figma — looks like a
geometric sans, verify exact name once repo/Figma tokens are available)
Phase 0 — Home Page Static Build (current sprint)
Goal: pixel-close recreation of the home screen using mock/static data.
No API calls. Just UI + mock JSON.
Screen inventory (from Figma reference)
Top bar
Hamburger menu icon (left)
BloomingBet logo (green leaf/flower mark + wordmark)
Balance display, right-aligned: NGN 00.00
Promo banner (hero)
Full-width image/illustration banner
Overlay text: "Place your bet today" + "Get 50% welcome Bonus"
Small "Play responsibly" tag, bottom-left of banner
Category nav row (icon + label, horizontally scrollable)
Sport, Live, Casino, Virtuals, Number games, (chevron for more)
Active/selected state styling TBD — confirm with colleague's web repo
League quick-filter tabs (horizontally scrollable pill/tab row)
UEFA Champions League, Premier League, + more (cut off in screenshot,
icon-only chip visible at edge)
Featured Match card
League label with icon: "England Nation League"
Two team names stacked: "Grimbsy" / "Aston Villa"
Date/time row: "Thu 4 Sep 10:00 | 10:00"
3 odds buttons (green): e.g. 2.50 / 4.45 / 6.10
Card appears to be part of a horizontal carousel (peek of next card
visible at right edge)
Live matches section
Section tabs: Live / Highlight / Upcoming
Sport filter row: Football (active/green), Tennis, Basketball,
Baseball (scrollable)
Market filter pills: 1x2 (active), Double Chance, Over/Under,
Goal/No Goal (scrollable)
Table header row: Today | 1 | X | 2
Match rows (repeating):
Minute indicator (e.g. "9'", "20'", "45'", "90'") + live dot
Two team names stacked, current score per team (right-aligned "0")
3 odds buttons (green pills): 1 / X / 2
Floating Bet Slip button
Fixed/floating position, bottom-right, above bottom tab bar
Green circular badge showing selection count (e.g. "3")
Label: "Betslip"
Hot Games section
Section title: "HOT GAMES"
Horizontal scroll of game thumbnail cards (e.g. Lightning Blackjack,
Hot Pick 3, Hot Pick 4, + more off-screen)
Popular Games section
Section title: "POPULAR GAMES"
Horizontal scroll of game thumbnail cards (High Flyer, Spin2Win,
Crash X, + more off-screen)
"PLAY MORE, WIN MORE" — centered text link/CTA
Footer (likely lower priority for mobile — web footers don't
always map 1:1 to app; flag this for boss — mobile apps usually move
this info into a Profile/Settings/About section instead of a long
scrolling footer)
BloomingBet logo
Licensing text: "Bloomingbet Limited, the provider of this website,
operates under the Permit No: 000000 issued by the National Lottery
Regulatory Commission Abuja."
18+ age restriction badge + "Play Responsible" text
Payment method icons: Visa, Mastercard, Bank
Link columns: Blooming Bet (About, T&Cs, Privacy, Betting Rules,
Responsible Gambling) / Quick Links (FAQ, Sports, Help, Live
Betting, Contact Us, Become an Agent)
Contact info: phone + email
Social icons: X, Facebook, YouTube, Instagram, LinkedIn, TikTok
Copyright line
Bottom tab bar
Home (active) | A-Z Menu | Games | Ticket | Profile
Icon + label per tab
Open questions to flag to boss/colleague before pixel-finalizing
Exact color tokens (hex values for the dark navy background, the green
brand color, odds-button green, live-indicator color)
Font family
Whether footer content should appear in-app at all, or only in a
Profile/Legal section
Behavior of category nav + league tabs (do they filter the page, or
navigate to a new screen?)
Real icon assets vs. icon font/library equivalents
Deliverable for this phase
app/(tabs)/index.tsx — home screen composed of the components below
Component breakdown:
components/home/TopBar.tsx
components/home/PromoBanner.tsx
components/home/CategoryNav.tsx
components/home/LeagueTabs.tsx
components/home/FeaturedMatchCard.tsx
components/home/LiveMatchesSection.tsx
components/home/MatchRow.tsx
components/home/FloatingBetSlip.tsx
components/home/GameCard.tsx
components/home/HotGamesSection.tsx
components/home/PopularGamesSection.tsx
components/BottomTabBar.tsx (or via Expo Router tabs config)
mock/matches.ts, mock/games.ts — static data matching the shapes
seen in the screenshot
All odds buttons, bet slip badge, etc. are visual-only in this phase —
tapping can update local mock state (e.g. increment bet slip count) but
nothing hits a real backend
Future Phases (not yet scoped in detail)
Phase 1: Auth (login/register, KYC/age verification — confirm NLRC
licensing requirements with boss)
Phase 2: Real API integration — replace mocks once colleague shares
web repo / API docs
Phase 3: Bet slip logic — odds calc, multi-bet, stake input,
validation
Phase 4: Wallet — deposit/withdraw via Paystack or platform's
existing payment processor
Phase 5: Live odds updates (websockets/polling), push notifications
for bet results
Phase 6: Casino/Virtuals/Number games sections (likely each its own
flow, possibly third-party game providers via iframe/SDK — confirm)
Phase 7: Android direct-APK distribution pipeline (Play Store
restricts real-money gambling apps in Nigeria); iOS App Store
compliance review for gambling category
