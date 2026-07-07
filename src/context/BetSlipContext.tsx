import React, { createContext, useContext, useState } from "react";

interface BetSlipContextValue {
  count: number;
  addBet: () => void;
  removeBet: () => void;
}

const BetSlipContext = createContext<BetSlipContextValue>({
  count: 0,
  addBet: () => {},
  removeBet: () => {},
});

export function BetSlipProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  const addBet = () => setCount((c) => c + 1);
  const removeBet = () => setCount((c) => Math.max(0, c - 1));

  return (
    <BetSlipContext.Provider value={{ count, addBet, removeBet }}>
      {children}
    </BetSlipContext.Provider>
  );
}

export function useBetSlip() {
  return useContext(BetSlipContext);
}
