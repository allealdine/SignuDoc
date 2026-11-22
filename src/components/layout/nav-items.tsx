import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Messages } from "@/lib/i18n/locales/en.ts";

export type ShellNavItem = {
  href: string;
  label: string;
};

type NavCopy = Messages["shell"]["nav"];

/** Hrefs stay fixed; only the label comes from the active dictionary. */
export function getPrimaryNavItems(copy: NavCopy): ShellNavItem[] {
  return [
    { href: "/dashboard", label: copy.documents },
    { href: "/templates", label: copy.templates },
    { href: "/envelopes/new", label: copy.newEnvelope },
    { href: "/settings", label: copy.settings },
  ];
}

export const ChevronLeftIcon = ChevronLeft;

export const ChevronRightIcon = ChevronRight;
