import dayjs from "dayjs";

export const isTimeDifferenceMoreThanXMinutes = (
    date1: string | Date,
    date2: string | Date,
    x: number
): boolean => {
    const startDate = dayjs(date1);
    const endDate = dayjs(date2);

    const diffInMinutes = endDate.diff(startDate, "minute");

    return diffInMinutes > x;
};
