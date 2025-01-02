import { useTonProof } from "../hooks/useTonProof";
import { useContext } from "react";
import { TonProofContext } from "../contexts/TonProofToken";
import * as Api from "@/api";
import { useTonWallet } from "@tonconnect/ui-react";
import { Button } from "./ui/button";

export const PrivateData = () => {
    useTonProof();

    const { token } = useContext(TonProofContext);
    const wallet = useTonWallet();

    if (!token) {
        return null;
    }

    const fetchPrivateData = () => {
        Api.tonproof.getAccount(token, wallet!.account).then(v => alert(JSON.stringify(v)))
    }

    return <Button
        variant="default"
        onClick={fetchPrivateData}
    >Fetch private data</Button>
}
