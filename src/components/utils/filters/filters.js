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
    return data.filter(item => item[field] === value)
}

export const whereMonth = (data, field, month) => {
    return data.filter(item => {
        const date = new Date(item[field]);
        return date.getMonth() + 1 === month; 
    });
};

export const whereBetweenDates = (data, field, startDate, endDate) => {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    return data.filter(item => {
        const date = new Date(item[field]).getTime();
        return date >= startTimestamp && date <= endTimestamp;
    });
};
