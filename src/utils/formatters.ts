export const formatTagList = (tags: string[]): string => {
    return tags.map((tag) => `"${tag}"`).join(', ');
};

export const formatDate = (date: Date) => {
    const weekdays = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

    const dayOfWeek = weekdays[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();

    return {
        dayOfWeek,
        day,
        month,
        year,
        formattedHours,
        formattedMinutes,
        amOrPm,
        formatted: `${dayOfWeek}, ${day} ${month}. ${year} - ${formattedHours}:${formattedMinutes} ${amOrPm}`,
    };
};

export const sanitizeTags = (tags: string[]): string[] => {
    return tags.map((tag) => tag.toLowerCase());
};


