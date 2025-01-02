"use client";

import { PrivateData } from "@/components/PrivateData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTonProof } from "@/hooks/useTonProof";
import { ArrowRight } from "lucide-react";

import Link from "next/link";

const exploreCards = [
  {
    title: 'HOST',
    content: 'Our contests is not sufficient for you? Create your own, and motivate your community to compete for the prizes.',
    link: '/create',
    buttonText: 'HOST A COMPETITION'
  },
  {
    title: 'WIN & EARN',
    content: 'Cascade - place where you can participate in special events. Some contests have no entry price, but still have some prize pot.',
    link: '/contests?filter=paid',
    buttonText: 'PAID CONTESTS'
  },
  {
    title: 'TRAINING',
    content: 'Participate in training contests to upgrade your skills in free competitive mode.',
    link: '/contests?filter=training',
    buttonText: 'TRAININGS'
  }
];

const targets = [
  {
    title: '1/ DEVELOPERS',
    description: 'Whether you\'re a seasoned coder or just starting, our contests offer challenges to sharpen your skills and compete for exciting prizes.'
  },
  {
    title: '2/ TECH ENTHUSIASTS',
    description: 'Dive into the exciting world of blockchain programming and test your knowledge in a fun, dynamic, and competitive environment.'
  },
  {
    title: '3/ STARTUP TEAMS',
    description: 'Engage your team in collaborative challenges to explore new solutions, strengthen problem-solving skills, and enhance your expertise.'
  },
  {
    title: '4/ EDUCATORS & TRAINERS',
    description: 'Use our platform to create training contests, providing students or trainees with hands-on experience in blockchain development.'
  },
  {
    title: '5/ ORGS & COMMUNITIES',
    description: 'Host engaging contests to promote your brand, foster a thriving developer community, or discover top-tier talent for your next big project.'
  }
];

export default function Home() {
  useTonProof();

  return (
    <div className="flex justify-center">
      <div className="w-[1200px]">
        <h1 className="flex flex-col items-center font-bold mt-[90px]">
          <div className="text-[95px] leading-[95px] bg-gradient-to-r from-[#2d83ec] to-[#7b84ff] bg-clip-text text-transparent">
            Cascade
          </div>
          <div className="text-[70px] leading-[90px] text-foreground">Compete. Win. Earn</div>
        </h1>
        <p className="text-center text-xl mt-[30px]">
          An open-source platform for <b>creating</b>, <b>hosting</b> <br />
          and <b>participating</b> in programming contests
        </p>
        <div className="flex justify-center gap-4 mt-[30px] mb-[50px]">
          <PrivateData />
          <Button variant="outline">
            EXPLORE CONTESTS <ArrowRight />
          </Button>
        </div>
        {/* Cards */}
        <h2 className="text-3xl text-foreground font-bold my-[15px]">
          Explore
        </h2>
        <div className="flex gap-6">
          {
            exploreCards.map(card => (
              <Card className="w-[380px] flex flex-col justify-between gap-[30px]">
                <div>
                  <CardHeader className="pb-[15px]">
                    <CardTitle className="text-muted-foreground text-sm">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {card.content}
                  </CardContent>
                </div>
                <CardFooter>
                  <Link href={card.link}>
                    <Button variant="link">
                      {card.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          }
        </div>

        {/* For Who */}
        <h2 className="text-3xl text-foreground font-bold mb-[15px] mt-[70px]">
          Who is this for?
        </h2>
        <div className="flex flex-col gap-6">
          {
            targets.map(target => (
              <div>
                <h2 className="text-muted-foreground font-bold text-base">
                  {target.title}
                </h2>
                <p className="text-foreground text-sm">
                  {target.description}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
