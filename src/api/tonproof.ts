import { Account, ConnectAdditionalRequest, TonProofItemReplySuccess } from "@tonconnect/ui";
import { authorized } from "./core/instance";

export const generatePayload = async (): Promise<ConnectAdditionalRequest | undefined> => {
    try {
        const { data } = await authorized.post('/tonproof/payload');
        return { tonProof: data.payload };
    } catch (e) {
        console.error(e);
        return;
    }
}

export const check = async (proof: TonProofItemReplySuccess['proof'], account: Account): Promise<string | undefined> => {
    try {
        const body = {
            address: account.address,
            network: account.chain,
            proof: {
                ...proof,
                state_init: account.walletStateInit
            }
        }

        const { data } = await authorized.post('/tonproof/check', body);

        return data.token;
    } catch (e) {
        console.error(e);
        return;
    }
}

export const getAccount = async (accessToken: string, account: Account) => {
    const { data } = await authorized.get(`/tonproof/account?network=${account.chain}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return data;
}