import { useState } from "react";

export const useCalculationSL = () => {
  const [data, setData] = useState<any[]>();
  const [totalDivider, setTotalDivider] = useState<number>();
  const [divider, setDivider] = useState<any[]>();
  const [passFinalVote, setPassFinalVote] = useState<number>();
  const [threshold, setVoteThreshold] = useState<number>();
  const [totalVote, setTotalVote] = useState<number>();

  const setCalculation = (
    results: any[],
    total: number,
    passVote: number,
    voteThreshold: number
  ) => {
    setData(results);
    setTotalVote(total);
    setTotalDivider(results[0]?.bagi?.length);
    setDivider(results[0]?.bagi);
    setPassFinalVote(passVote);
    setVoteThreshold(voteThreshold);
  };

  return {
    setCalculation,
    data,
    totalVote,
    passFinalVote,
    totalDivider,
    divider,
    threshold,
  };
};
