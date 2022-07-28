

class DateUtil {

    static toISOString(date: Date): string {
        return date.toISOString().split('T')[0].replace(/-/g, '/');
    }
}

export default DateUtil
