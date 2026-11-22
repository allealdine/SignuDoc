import { formatMessage } from "./format.ts";

export type ReminderIntervalCopy = {
  everyDays: string;
  everyDay: string;
  everyWeek: string;
  off: string;
};

/**
 * The reminder options shown in the UI. `formatReminderInterval()` in the
 * services layer stays the canonical wording for emails and audit records;
 * this variant only fills the translated copy for the active locale.
 */
export function formatReminderIntervalMessage(
  intervalDays: number | null,
  copy: ReminderIntervalCopy,
): string {
  if (intervalDays === null) {
    return copy.off;
  }

  if (intervalDays === 1) {
    return copy.everyDay;
  }

  if (intervalDays === 7) {
    return copy.everyWeek;
  }

  return formatMessage(copy.everyDays, { days: intervalDays });
}
