import { cn } from "@/lib/utils";
import * as React from "react";

const Widget = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-surface text-foreground text-sm not-dark:shadow-md",
      "flex flex-col justify-between p-5",
      className
    )}
    {...props}
  />
));
Widget.displayName = "Widget";

const WidgetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-2.5", className)} {...props} />
));
WidgetContent.displayName = "WidgetContent";

const WidgetTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-medium text-tertiary-foreground", className)}
    {...props}
  />
));
WidgetTitle.displayName = "WidgetTitle";

const WidgetFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  />
));
WidgetFooter.displayName = "WidgetFooter";

export { Widget, WidgetFooter, WidgetTitle, WidgetContent };
