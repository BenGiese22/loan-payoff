

class DateUtil {

    static toISOString(date: Date): string {
        return date.toISOString().split('T')[0].replace(/-/g, '/');
    }

    static getMonthDifference(date1: Date, date2: Date): number {
        return date1.getMonth() - date2.getMonth() + (12 * (date1.getFullYear() - date2.getFullYear()));
    }
}

export default DateUtil
