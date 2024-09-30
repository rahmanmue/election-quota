export const noTabel = (idx: number, page: number, pageSize: number) =>
  (page - 1) * pageSize + idx + 1;

export const colorVote = (
  curr: number,
  threshold: number,
  passFinalVote: number
) => {
  if (curr >= passFinalVote) {
    return "bg-cyan-600 text-white";
  } else if (curr < passFinalVote && curr > threshold) {
    return "bg-orange-500 text-white";
  } else if (curr < threshold) {
    return "text-dark";
  }
};

export const isEmptyObject = (obj: any) => {
  return Object.values(obj).some(
    (val) => val === "" || val === null || val === undefined
  );
};
