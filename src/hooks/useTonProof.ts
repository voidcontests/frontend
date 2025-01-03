import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { TonProofContext } from "../contexts/TonProofToken";
import { useContext, useEffect, useRef } from "react";
import * as Api from "@/api";

const localStorageKey = 'void-access-token';
const payloadTTLMS = 1000 * 60 * 20;

export function useTonProof() {
    const isConnectionRestored = useIsConnectionRestored();
    const { setToken } = useContext(TonProofContext);
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();

    const interval = useRef<ReturnType<typeof setInterval> | undefined>();

    useEffect(() => {
        if (!isConnectionRestored || !setToken) {
            return;
        }

        clearInterval(interval.current);

        if (!wallet) {
            localStorage.removeItem(localStorageKey);
            setToken(null);

            const refreshPayload = async () => {
                tonConnectUI.setConnectRequestParameters({ state: 'loading' });

                const value = await Api.tonproof.generatePayload();
                if (!value) {
                    tonConnectUI.setConnectRequestParameters(null);
                } else {
                    tonConnectUI.setConnectRequestParameters({ state: 'ready', value });
                }
            }

            refreshPayload();
            setInterval(refreshPayload, payloadTTLMS);
            return;
        }

        const token = localStorage.getItem(localStorageKey);
        if (token) {
            setToken(token);
            return;
        }

        if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
            Api.tonproof.check(wallet.connectItems.tonProof.proof, wallet.account).then(result => {
                if (result) {
                    setToken(result);
                    localStorage.setItem(localStorageKey, result);
                } else {
                    alert('Please try another wallet');
                    tonConnectUI.disconnect();
                }
            })
        } else {
            alert('Please try another wallet');
            tonConnectUI.disconnect();
        }

    }, [wallet, isConnectionRestored, setToken])
}
