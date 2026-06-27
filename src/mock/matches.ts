export interface FeaturedMatch {
  id: string;
  league: string;
  teamA: string;
  teamB: string;
  datetime: string;
  odds: [number, number, number];
}

export interface LiveMatch {
  id: string;
  minute: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  odds: [number, number, number];
}

export const featuredMatches: FeaturedMatch[] = [
  {
    id: "fm1",
    league: "England Nation League",
    teamA: "Grimbsy",
    teamB: "Aston Villa",
    datetime: "Thu 4 Sep 10:00  |  10:00",
    odds: [2.5, 4.45, 6.1],
  },
  {
    id: "fm2",
    league: "UEFA Champions League",
    teamA: "Real Madrid",
    teamB: "Manchester City",
    datetime: "Fri 5 Sep 19:00  |  19:00",
    odds: [1.85, 3.5, 4.2],
  },
  {
    id: "fm3",
    league: "Premier League",
    teamA: "Arsenal",
    teamB: "Chelsea",
    datetime: "Sat 6 Sep 15:00  |  15:00",
    odds: [2.1, 3.3, 3.6],
  },
];

export const liveMatches: LiveMatch[] = [
  {
    id: "lm1",
    minute: "9'",
    teamA: "Rapid Bucuresti 1923",
    teamB: "FC CFR 1907 Cluj",
    scoreA: 0,
    scoreB: 0,
    odds: [2.5, 4.45, 6.1],
  },
  {
    id: "lm2",
    minute: "20'",
    teamA: "Rapid Bucuresti 1923",
    teamB: "FC CFR 1907 Cluj",
    scoreA: 0,
    scoreB: 0,
    odds: [2.5, 4.45, 6.1],
  },
  {
    id: "lm3",
    minute: "45'",
    teamA: "Rapid Bucuresti 1923",
    teamB: "FC CFR 1907 Cluj",
    scoreA: 0,
    scoreB: 0,
    odds: [2.5, 4.45, 6.1],
  },
  {
    id: "lm4",
    minute: "90'",
    teamA: "Rapid Bucuresti 1923",
    teamB: "FC CFR 1907 Cluj",
    scoreA: 0,
    scoreB: 0,
    odds: [2.5, 4.45, 6.1],
  },
];
