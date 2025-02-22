import { cn } from "@/lib/utils";
import * as React from "react";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-surface text-sm not-dark:shadow-md",
      "flex flex-col justify-between p-5",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2.5", className)} {...props} />
));
CardContent.displayName = "CardContent";


const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-base font-medium leading-none", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardFooter, CardTitle, CardContent };
