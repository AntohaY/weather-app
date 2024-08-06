function convertTimepoint(timepoint: string): Date {
    // Validate input length
    if (timepoint.length !== 10) {
        throw new Error("Invalid timepoint format. Expected format is 'YYYYMMDDHH'.");
    }

    // Extract parts from the timepoint string
    const year = parseInt(timepoint.substring(0, 4), 10);
    const month = parseInt(timepoint.substring(4, 6), 10) - 1; // Month is 0-indexed
    const day = parseInt(timepoint.substring(6, 8), 10);
    const hour = parseInt(timepoint.substring(8, 10), 10);

    // Create a Date object
    return new Date(year, month, day, hour);
}

function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false // Ensure 24-hour format
    };

    return date.toLocaleString('en-US', options);
}

export default function addHoursToTimepoint(timepoint: string, hoursToAdd: number[]): string[] {
    const initialDate = convertTimepoint(timepoint);
    const result: string[] = [];

    hoursToAdd.forEach(hours => {
        const newDate = new Date(initialDate.getTime());
        newDate.setHours(initialDate.getHours() + hours);
        result.push(formatDate(newDate));
    });

    return result;
}