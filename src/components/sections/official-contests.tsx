import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Tag } from "@/components/ui/tag";

export default function OfficialContests() {
    return (
        <div className="flex flex-col gap-2.5">
            <h1 className="text-xl font-medium">OFFICIAL CONTESTS</h1>
            <div className="flex gap-7">
                <Card className="w-[300px]">
                    <CardContent>
                        <div>
                            <Tag variant="green">Onboarding</Tag>
                        </div>
                        <CardTitle>
                            Introduction
                        </CardTitle>
                        <Separator />
                        <div className="flex justify-between">
                            <div>Prize pot</div>
                            <div>69 TON</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Entry price</div>
                            <div>0.5 TON</div>
                        </div>
                        <Separator />
                        <div>
                            Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-5">
                        <Button variant="link" className="w-full">LEADERBOARD</Button>
                    </CardFooter>
                </Card>

                <Card className="w-[300px]">
                    <CardContent>
                        <div>
                            <Tag>Starting soon</Tag>
                        </div>
                        <CardTitle>
                            The Void Round 297
                        </CardTitle>
                        <Separator />
                        <div className="flex justify-between">
                            <div>Prize pot</div>
                            <div>117 TON</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Entry price</div>
                            <div>1 TON</div>
                        </div>
                        <Separator />
                        <div>
                            Hosted by <Link href='https://github.com/jus1d'>@ndbtea</Link>
                        </div>
                    </CardContent>
                    <CardFooter className="pt-5">
                        <Button variant="link" className="w-full">APPLY</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}