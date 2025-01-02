import { createContext } from "react";

export const TonProofContext = createContext<{ token: string | null, setToken?: (val: string | null) => void }>({ token: null })
