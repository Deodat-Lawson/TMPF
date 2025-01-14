// StatsDateUtils.ts

export type DateRange = "DAY" | "WEEK" | "MONTH";

/**
 * Simple date addition helper
 */
export function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

export function addWeeks(base: Date, weeks: number): Date {
  return addDays(base, weeks * 7);
}

export function addMonths(base: Date, months: number): Date {
  const d = new Date(base);
  d.setMonth(d.getMonth() + months);
  return d;
}

/**
 * Returns [startDate, endDate] for the given (range, offset).
 */
export function getRangeDates(range: DateRange, offset: number): [Date, Date] {
  const now = new Date();

  let start: Date, end: Date;
  if (range === "DAY") {
    start = addDays(now, offset);
    end = start;
  } else if (range === "WEEK") {
    // find Monday of this week
    const dayOfWeek = now.getDay(); // Sunday=0, Monday=1, ...
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const mondayThisWeek = addDays(now, mondayOffset);

    start = addWeeks(mondayThisWeek, offset);
    end = addDays(start, 6); // Sunday
  } else {
    // MONTH
    const firstOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    start = addMonths(firstOfThisMonth, offset);
    end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
  }

  return [start, end];
}

/**
 * Formats a date as "MMM d, yyyy"
 */
export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
