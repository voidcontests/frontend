import { cn } from "@/lib/utils";
import * as React from "react";

export interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  vertical?: boolean;
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(({ className, vertical = false, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn(
      'bg-border',
      vertical ? 'h-full w-[1px]' : 'w-full h-[1px]',
      className,
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
