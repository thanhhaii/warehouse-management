import dayjs from "dayjs";

export const formatConcurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: 'currency',
        currency: 'VND'
    }).format(value);
};

export const formatTime = (value: number) => {
    return dayjs(value * 1000).format('DD/MM/YYYY HH:mm:ss');
};