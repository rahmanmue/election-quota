export const noTabel = (idx: number, page: number, pageSize: number) =>
  (page - 1) * pageSize + idx + 1;
