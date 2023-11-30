import React from "react";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

import Link from "next/link";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
  disabled?: boolean;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
  disabled= false
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "text-md flex  h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 font-medium text-neutral-400 transition hover:text-white",
        active && "text-white",disabled && "pointer-events-none"
      )}
    >
      <Icon size={26} />
      <p className="w-full truncate">{label}</p>
    </Link>
  );
};

export default SidebarItem;
