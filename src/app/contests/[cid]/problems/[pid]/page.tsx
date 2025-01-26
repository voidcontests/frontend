'use client';

import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { ContestDetailed, ProblemDetailed } from "@/api/dto/response";
import { useState, useEffect, ChangeEvent } from "react";
import { SolvedTag } from "@/components/solved-tag";
import { truncate_address } from "@/lib/strings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { useParams } from "next/navigation";
import Preview from "@/components/preview";
import { itoc } from '@/lib/utils';
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

export default function ProblemPage() {
    const [problem, setProblem] = useState<ProblemDetailed>();
    const [contest, setContest] = useState<ContestDetailed>();
    const { cid, pid } = useParams<{ cid: string, pid: string }>();
    const isConnectionRestored = useIsConnectionRestored();
    const [answer, setAnswer] = useState('');
    const wallet = useTonWallet();

    async function fetchContest() {
        try {
            const result = await API.contests.fetchByID(cid);
            setContest(result);
        } catch (error) {
            toast.error("Sometihng went wrong");
            setContest(undefined);
        }
    }

    async function submitAnswer() {
        if (answer.trim().length === 0) return;

        if (contest) {
            for (let i = 0; i < contest.problems.length; i++) {
                const p = contest.problems[i];
                if (pid === p.id.toString() && p.status === 'accepted') {
                    toast.info("Solution for this problem already accepted");
                    return;
                }
            }
        }

        try {
            const result = await API.problems.submit(cid, pid, answer);

            if (!result) {
                toast.error("Something went wrong. Try later");
                return;
            }

            if (result.verdict === 'OK') {
                toast.success('Correct! Answer accepted');
                return;
            } else {
                toast.warning('Your answer is incorrect');
            }
        } catch (e) {
            toast.error("Something went wrong. Try later");
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

    async function fetchProblem() {
        try {
            const result = await API.problems.getByID(cid, pid);
            setProblem(result);
        } catch (error) {
            toast.error("Sometihng went wrong");
            setProblem(undefined);
        }
    }

    // TODO: This guy dont reloading on wallet connect
    useEffect(() => {
        if (isConnectionRestored) {
            setTimeout(() => {
                fetchProblem();
            }, 1);
        }
    }, [wallet, isConnectionRestored]);

    useEffect(() => {
        if (problem) {
            document.title = problem.title + ' :: VOID*';
        } else {
            document.title = 'Problem :: VOID*';
        }
    }, [problem]);

    if (problem === undefined) return (
        <div>Loading data</div>
    );

    return (
        <div className="flex justify-center">
            <div className="max-w-7xl w-full flex flex-col">
                <div className="grid grid-cols-12 gap-5 mx-4">
                    <div className="col-span-9 flex flex-col gap-7">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex-1">
                                <Link href={`/contests/${cid}`} size="large">
                                    BACK TO CONTEST
                                </Link>
                            </div>
                            <h1 className="text-bright-text text-xl font-medium text-center">
                                {problem.title}
                            </h1>
                            <div className="flex-1"></div>
                        </div>
                        <Preview markdown={problem.statement} />
                        <div className="flex items-center gap-4">
                            <span className="flex-shrink-0 text-sm font-semibold">
                                Answer:
                            </span>
                            <Input
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') submitAnswer();
                                }}
                            />
                            <Button onClick={submitAnswer} disabled={answer.trim().length === 0}>SUBMIT</Button>
                        </div>
                    </div>
                    <div className="col-span-3 flex flex-col gap-5">
                        <TableContainer>
                            <TableHead>
                                PROBLEMSET
                            </TableHead>
                            <Table>
                                <TableHeaderRow>
                                    <TableRow>
                                        <TableHeaderCell className='w-[5%]'>#</TableHeaderCell>
                                        <TableHeaderCell className='w-[70%]'>Title</TableHeaderCell>
                                    </TableRow>
                                </TableHeaderRow>
                                <TableBody>
                                    {
                                        contest &&
                                        contest.problems.map((problem, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {itoc(index)}
                                                </TableCell>
                                                <TableCell>
                                                    <Link
                                                        href={`/contests/${contest.id}/problems/${problem.id}`}
                                                        className={pid === problem.id.toString() ? 'text-bright-text font-semibold' : ''}
                                                    >
                                                        {problem.title}
                                                    </Link>
                                                    {
                                                        <SolvedTag className="ml-2" state={problem.status} />
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                                        [problem.writer.address].map((setter, index) => (
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
                    </div>
                </div>
            </div>
        </div>
    );
}
