//expireAt is a future date

export const remainingTime = (expiresAt: Date): string => {
    const remainingTime = expiresAt.getTime() - Date.now();
    const remainingMinutes = Math.floor(remainingTime / (1000 * 60)).toString();
    const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000).toString();
    return `${remainingMinutes}::${remainingSeconds}`;
};
//
