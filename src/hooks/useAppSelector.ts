import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "./../store/store";

// Untuk memastikan TypeScript dapat memahami dispatch dan state selector di hook,
// membuat hook khusus dengan tipe TypeScript.

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
