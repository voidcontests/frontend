import { cn } from "@/lib/utils";
import * as React from "react";

const TableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className="bg-surface border rounded-xl relative w-full overflow-auto"
    {...props}
  />
));
TableContainer.displayName = "TableContainer";

const TableTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('h-12 text-sm flex items-center font-medium px-5 border-b', className)}
    {...props}
  />
));
TableTitle.displayName = "TableTitle";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full caption-bottom text-sm", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("h-4 overflow-hidden bg-surface-2 [&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableHeaderRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("h-8 border-b transition-colors", className)} {...props} />
));
TableHeaderRow.displayName = "TableHeaderRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "first:px-5 first:w-0 h-full text-left text-sm text-secondary-foreground font-normal align-middle",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "h-10 border-b transition-colors",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "first:px-5 first:w-0 h-full text-left text-sm align-middle",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "h-10 w-full flex items-center justify-center bg-transparent font-regular text-sm text-foreground border-t last:[&>tr]:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("py-2 text-sm text-secondary-foreground border-t", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  TableContainer,
  Table,
  TableTitle,
  TableHeader,
  TableHeaderRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableCaption,
}
