export interface Game {
  id: string;
  title: string;
  bgColor: string;
  accentColor: string;
  image?: number;
}

export const hotGames: Game[] = [
  {
    id: "hg1",
    title: "Lightning\nBlackjack",
    bgColor: "#0D2E5A",
    accentColor: "#F5C542",
    image: require("../../asset/images/hotPick/Blackjack.png"),
  },
  {
    id: "hg2",
    title: "Hot Pick 3",
    bgColor: "#5A0D0D",
    accentColor: "#FF6B35",
    image: require("../../asset/images/hotPick/Image.png"),
  },
  {
    id: "hg3",
    title: "Hot Pick 4",
    bgColor: "#1A4A1A",
    accentColor: "#4CAF50",
    image: require("../../asset/images/hotPick/Hot pick 4.png"),
  },
  { id: "hg4", title: "Speed\nRoulette", bgColor: "#2D0D5A", accentColor: "#9B59B6" },
  { id: "hg5", title: "Mega Ball", bgColor: "#5A3A0D", accentColor: "#FF9800" },
];

export const popularGames: Game[] = [
  {
    id: "pg1",
    title: "High Flyer",
    bgColor: "#0D3A5A",
    accentColor: "#00BCD4",
    image: require("../../asset/images/popularGames/Blackjack (1).png"),
  },
  {
    id: "pg2",
    title: "Spin2Win",
    bgColor: "#5A0D2D",
    accentColor: "#E91E63",
    image: require("../../asset/images/popularGames/Blackjack (2).png"),
  },
  {
    id: "pg3",
    title: "Crash X",
    bgColor: "#1A3A1A",
    accentColor: "#8BC34A",
    image: require("../../asset/images/popularGames/Blackjack (3).png"),
  },
  { id: "pg4", title: "Aviator", bgColor: "#3A1A0D", accentColor: "#FF5722" },
  { id: "pg5", title: "Plinko", bgColor: "#0D0D5A", accentColor: "#3F51B5" },
];
