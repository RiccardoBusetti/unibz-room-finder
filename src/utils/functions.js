import moment from "moment";

export const debounce = (func, timeout) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
    };
};

export const formatDateForServer = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm")
}

export const transformAvailabilities = (availabilities) => {
    if (!availabilities) return []

    return availabilities.map(availability => {
        var day = undefined;
        if (availability.from != null) {
            day = moment(availability.from).format('LL')
        } else if (availability.to != null) {
            day = moment(availability.to).format('LL')
        }

        return {
            day: day,
            from: availability.from == null ? "University opening" : moment(availability.from).format("HH:mm"),
            to: availability.to == null ? "University closing" : moment(availability.to).format("HH:mm")
        }
    })
}