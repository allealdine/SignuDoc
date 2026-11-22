/** Keeps a dictionary's keys while widening its string values. */
export function defineMessages<T extends Record<string, unknown>>(
  messages: T,
): T {
  return messages;
}
