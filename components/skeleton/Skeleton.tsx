import React from "react";
import { twMerge } from "tailwind-merge";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge("bg-neutral-700 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
