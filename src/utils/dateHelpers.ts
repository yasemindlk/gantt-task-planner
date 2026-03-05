import dayjs, { type Dayjs } from "dayjs";

export type DateString = string;
// iki tarih arasındaki gün sayısı
export function getDurationDays(
  start: DateString | Dayjs,
  end: DateString | Dayjs,
): number {
  const startDate = dayjs(start).startOf("day");
  const endDate = dayjs(end).startOf("day");
  return endDate.diff(startDate, "day") + 1;
}

// görevin süresi
export function getTaskDurationDays(
  startDate: DateString,
  endDate: DateString,
): number {
  return getDurationDays(startDate, endDate);
}

export function minDate(
  a: DateString | Dayjs,
  b: DateString | Dayjs,
): DateString {
  const d1 = dayjs(a);
  const d2 = dayjs(b);
  return d1.isBefore(d2) || d1.isSame(d2)
    ? d1.format("YYYY-MM-DD")
    : d2.format("YYYY-MM-DD");
}

export function maxDate(
  a: DateString | Dayjs,
  b: DateString | Dayjs,
): DateString {
  const d1 = dayjs(a);
  const d2 = dayjs(b);
  return d1.isAfter(d2) || d1.isSame(d2)
    ? d1.format("YYYY-MM-DD")
    : d2.format("YYYY-MM-DD");
}

export function formatDisplayDate(date: DateString | Dayjs): string {
  return dayjs(date).format("DD.MM.YYYY");
}

export function toDateString(date: DateString | Dayjs): DateString {
  return dayjs(date).format("YYYY-MM-DD");
}

// ana görevin bar aralığı: alt görevlerin min(başlangıç) ve max(bitiş) tarihi
export function getMainTaskRange(
  mainTask: { startDate: string; endDate: string },
  subTasks: Array<{ startDate: string; endDate: string }>,
): { start: DateString; end: DateString } {
  if (subTasks.length === 0) {
    return { start: mainTask.startDate, end: mainTask.endDate };
  }
  const starts = subTasks.map((s) => s.startDate);
  const ends = subTasks.map((s) => s.endDate);
  return {
    start: starts.reduce((a, b) => minDate(a, b)),
    end: ends.reduce((a, b) => maxDate(a, b)),
  };
}
