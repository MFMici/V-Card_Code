import { parse, getTime } from 'date-fns';

export const orderBy =  (data, field, order) => {
    if(order === 'asc'){
        return data.sort((a, b) => a[field] - b[field])
    }
    return data.sort((a, b) => b[field] - a[field])
}

export const limit = (data, limit) => {
    return data.slice(0, limit)
}

export const where = (data, field, value) => {
    return data.filter(item => item[field] === value);
}

export const whereMonth = (data, field, month) => {
    return data.filter(item => {
        const date = new Date(item[field]);
        return date.getMonth() + 1 === month; 
    });
};


export const whereBetweenDates = (data, field, startDate, endDate) => {
    const startTimestamp = getTime(parse(startDate, 'yyyy-MM-dd', new Date()));
    const endTimestamp = getTime(parse(endDate, 'yyyy-MM-dd', new Date()));

    return data.filter(item => {
        const timestamp = item[field];
        return timestamp >= startTimestamp && timestamp <= endTimestamp;
    });
};