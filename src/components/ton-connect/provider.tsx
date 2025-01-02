"use client";

import { TonConnectUIProvider, THEME, useTonConnectUI, TonConnectUI } from "@tonconnect/ui-react";
import { TonProofContext } from "@/contexts/TonProofToken";
import { useState } from "react";

const manifest = "https://raw.githubusercontent.com/voidcontests/frontend/refs/heads/master/public/tonconnect-manifest.json";

export const TonConnectProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <TonProofContext.Provider value={{ token, setToken }}>
            <TonConnectUIProvider
                manifestUrl={manifest}
                actionsConfiguration={{
                    modals: ['before', 'success', 'error'],
                    notifications: [],
                }}
                uiPreferences={{
                    theme: THEME.DARK
                }}
                walletsListConfiguration={
                    { includeWallets: undefined }
                }
            >
                {children}
            </TonConnectUIProvider >
        </TonProofContext.Provider>
    );
}