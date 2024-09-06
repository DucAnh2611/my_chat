function convertTime(durationString, targetUnit) {
    const regex = /^(\d+)([a-zA-Z]+)$/;
    const match = durationString.match(regex);

    if (!match) {
        throw new Error("Invalid duration string");
    }

    const number = parseInt(match[1]);
    const timeUnit = match[2];

    if (targetUnit === timeUnit) {
        return number;
    }

    switch (timeUnit) {
        case "s":
            return number * convertTime("1000ms", targetUnit);
        case "m":
            return number * convertTime("60s", targetUnit);
        case "h":
            return number * convertTime("60m", targetUnit);
        case "d":
            return number * convertTime("24h", targetUnit);
        case "y":
            return number * convertTime("365d", targetUnit);
        default:
            return number;
    }
}

module.exports = {
    convertTime,
};
