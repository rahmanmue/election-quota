import { useDispatch } from "react-redux";
import type { AppDispatch } from "./../store/store";

// Untuk memastikan TypeScript dapat memahami dispatch dan state selector di hook,
// membuat hook khusus dengan tipe TypeScript.

// Gunakan useDispatch dengan tipe AppDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
