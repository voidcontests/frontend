import { Widget, WidgetContent, WidgetTitle, WidgetFooter } from "@/components/ui/widget";
import ContentContainer from "@/components/content-container";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import NextLink from "next/link";
import React from "react";

export default async function HomePage() {
  return (
    <ContentContainer>
      <div className="flex flex-col items-center w-full pt-8 gap-8">
        <h1 className="flex flex-col items-center">
          <span className="font-bold text-8xl leading-[90px] bg-linear-to-r from-[#7b84ff] to-[#2d83ec] bg-clip-text text-center text-blue-400">
            THE VOID*
          </span>
          <span className="font-normal text-6xl leading-[75px] text-foreground text-center">
            Avoid the void in your head
          </span>
        </h1>
        <p className="text-center text-lg text-foreground max-w-xl">
          An open-source platform for <b>creating</b>, <b>hosting</b> and <b>participating</b> in programming contests
        </p>
        <div className="flex gap-5">
          <Button size="lg" asChild>
            <NextLink href="/contests">
              EXPLORE
            </NextLink>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <NextLink href="/create">
              CREATE
            </NextLink>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 mt-8">
        <h3 className="text-xl font-bold">
          DISCOVER
        </h3>
        <div className="grid grid-cols-3 gap-5">
          <Widget className="flex-1">
            <WidgetContent>
              <WidgetTitle>WIN & EARN</WidgetTitle>
              <p>
                <b>THE VOID*</b> - place where you can participate in special events. Some contests have no entry price, but still have some prize pot
              </p>
            </WidgetContent>
            <WidgetFooter className="pt-5">
              <Link href='/contests' size="large">
                EXPLORE
              </Link>
            </WidgetFooter>
          </Widget>

          <Widget className="flex-1">
            <WidgetContent>
              <WidgetTitle>BUILD</WidgetTitle>
              <p>
                Our contests are not only what you can do here.
                Looking for a place for hosting your own competition? You just found it
              </p>
            </WidgetContent>
            <WidgetFooter className="pt-5">
              <Link href='/create' size="large">
                CREATE
              </Link>
            </WidgetFooter>
          </Widget>

          <Widget className="flex-1">
            <WidgetContent>
              <WidgetTitle>TRAININGS</WidgetTitle>
              <p>
                Embark on a journey to elevate your expertise!
                Dive into <b>training rounds</b> tailored to enhance your performance in both free mode and competitive mode.
              </p>
            </WidgetContent>
            <WidgetFooter className="pt-5">
              <Link href='/contests?filters=training' size="large">
                TEST SKILL
              </Link>
            </WidgetFooter>
          </Widget>
        </div>
      </div>
    </ContentContainer>
  );
}
