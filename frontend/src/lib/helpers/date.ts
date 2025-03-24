import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatDate = (
  date: string | Date | null,
  format: string = "DD MMM YYYY HH:mm A",
) => {
  if (!date) return null;

  return dayjs(date).format(format);
};

export const timeAgo = (date: string | Date | null) => {
  if (!date) return null;

  return dayjs(date).fromNow();
};

export const timeLeft = (date: string | Date | null) => {
  if (!date) return null;

  const now = dayjs();
  const expirationDate = dayjs(date);

  if (expirationDate.isBefore(now)) {
    return "Expired";
  }

  return expirationDate.fromNow(true);
};

export const parseDate = (date: string | null) => {
  if (!date) return null;

  return new Date(date);
};

export const stringifyDate = (date: Date | null) => {
  if (!date) return null;

  return date.toISOString();
};
