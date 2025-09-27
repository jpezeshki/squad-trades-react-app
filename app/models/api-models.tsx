export interface Squad {
  squadId: string;
  squadName: string;
  createdBy: string;
  numberOfMembers: string;
  trades: Trade[];
}

export interface Trade {
  tradeId: string;
  squadId: string;
  createdBy: string;
  tickerSymbol: string;
  tradeDate: string;
  status: string;
  initialPrice: string;
  projectedPrice: string;
  direction: string;
  duration: string;
  notes: string;
}
