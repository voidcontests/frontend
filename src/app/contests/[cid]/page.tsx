'use client';

import { capitalize, truncate_address } from "@/lib/strings";
import { ContestDetailed } from "@/api/dto/response";
import { format_duration, itoc } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";
import { Link } from "@/components/ui/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Preview from "@/components/preview";
import { format_date } from '@/lib/utils';
import Timer from '@/components/timer';
import { toast } from "sonner";
import * as API from '@/api';
import {
    TableContainer,
    TableHead,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHeaderRow,
    TableHeaderCell,
} from "@/components/ui/table";
import {
    Widget,
    WidgetContent,
    WidgetTitle,
} from "@/components/ui/widget";
import { SolvedTag } from "@/components/solved-tag";
import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authorized } from "@/api/core/instance";
import NotFound from "@/app/not-found";

type DifficultyColorMap = {
    [key: string]: 'green' | 'orange' | 'red' | 'secondary';
};

const difficultyToBadgeType: DifficultyColorMap = {
    'easy': 'green',
    'mid': 'orange',
    'hard': 'red',
    'beginner': 'secondary',
}

export default function ContestPage() {
    const [contest, setContest] = useState<ContestDetailed>();
    const { cid } = useParams<{ cid: string }>();
    const isConnectionRestored = useIsConnectionRestored();
    const [tonConnectUI] = useTonConnectUI();
    const [notFound, setNotFound] = useState(false);

    const wallet = useTonWallet();

    async function fetchContest() {
        const { data, status } = await authorized.get(`/contests/${cid}`);

        switch (status) {
            case 200:
                setContest(data);
                break;
            case 404:
                setNotFound(true);
                break;
            default:
                toast.error('Something went wrong'); // TODO: Render 500 page instead
                setNotFound(true);
        }
    }

    // TODO: This guy dont reloading on wallet connect
    useEffect(() => {
        if (isConnectionRestored) {
            setTimeout(() => {
                fetchContest();
            }, 1);
        }
    }, [wallet, isConnectionRestored]);

    useEffect(() => {
        if (contest) {
            document.title = contest.title + ' :: VOID*';
        } else {
            document.title = 'Contests :: VOID*';
        }
    }, [contest]);

    const handleApplyClick = async () => {
        try {
            await API.contests.apply(cid);
            fetchContest();
        } catch (e) {
            toast.error('Something went wrong. Try again leter');
        }
    }

    if (notFound) return <NotFound />

    if (contest === undefined) return (
        <div>Loading data</div>
    );

    const setters = Array.from(new Set(contest.problems.map(problem => problem.writer.address)));

    return (
        <div className="flex justify-center">
            <div className="max-w-7xl w-full flex flex-col">
                <div className="grid grid-cols-12 gap-5 mx-4">
                    <div className="col-span-9 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-bright-text text-4xl font-medium">
                                {contest.title}
                            </h1>
                            <Separator />
                            <Preview markdown={contest.description} />
                        </div>
                        <TableContainer>
                            <TableHead>
                                PROBLEMSET
                            </TableHead>
                            <Table>
                                <TableHeaderRow>
                                    <TableRow>
                                        <TableHeaderCell className='w-[5%]'>#</TableHeaderCell>
                                        <TableHeaderCell className='w-[70%]'>Title</TableHeaderCell>
                                        <TableHeaderCell className='w-[25%]'>Difficulty</TableHeaderCell>
                                    </TableRow>
                                </TableHeaderRow>
                                <TableBody>
                                    {
                                        contest.problems.map((problem, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{itoc(index)}</TableCell>
                                                <TableCell>
                                                    {
                                                        !wallet
                                                            ? <div>{problem.title}</div>
                                                            : <Link href={`/contests/${contest.id}/problems/${problem.id}`}>{problem.title}</Link>
                                                    }
                                                    {
                                                        <SolvedTag className="ml-2" state={problem.status} />
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    <Tag variant={difficultyToBadgeType[problem.difficulty]}>{capitalize(problem.difficulty)}</Tag>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className="col-span-3">
                        <div className="flex flex-col gap-5">
                            <Widget className="flex-1">
                                <WidgetContent>
                                    <WidgetTitle className="text-bright-text">
                                        ABOUT
                                    </WidgetTitle>
                                    <div className="flex">
                                        <div className="flex-1 text-secondary-text">
                                            Start
                                        </div>
                                        <div className="flex-1">
                                            {format_date(new Date(contest.starting_at))}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1 text-secondary-text">
                                            Duration
                                        </div>
                                        <div className="flex-1">
                                            {format_duration(contest.duration_mins)}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="flex-1 text-secondary-text">
                                            Participants
                                        </div>
                                        <div className="flex-1">
                                            {contest.participants}
                                        </div>
                                    </div>
                                </WidgetContent>
                            </Widget>
                            <TableContainer>
                                <TableHead>
                                    SETTERS
                                </TableHead>
                                <Table>
                                    <TableHeaderRow>
                                        <TableRow>
                                            <TableHeaderCell className='w-[15%]'>#</TableHeaderCell>
                                            <TableHeaderCell>Writer address</TableHeaderCell>
                                        </TableRow>
                                    </TableHeaderRow>
                                    <TableBody>
                                        {
                                            setters.map((setter, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{`${index + 1}/`}</TableCell>
                                                    <TableCell>
                                                        <Link href={`https://tonscan.org/address/${setter}`}>
                                                            {truncate_address(setter)}
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {
                                !wallet
                                    ? <Button variant="link" onClick={() => tonConnectUI.openModal()}>CONNECT WALET TO APPLY</Button>
                                    : contest.is_participant === true
                                        ? <span className="text-center font-medium">You are participating!</span>
                                        : <Button variant="link" onClick={handleApplyClick}>APPLY</Button>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center mt-12">
                    <Timer target={new Date(contest.starting_at)} />
                </div>
            </div>
        </div>
    );
}
