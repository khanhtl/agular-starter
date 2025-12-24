
export class CalendarUtil {
    static isSameDate(d1: Date, d2: Date | null): boolean {
        if (!d2) return false;
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    }

    static isSameMonth(d1: Date, d2: Date): boolean {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
    }

    static isToday(date: Date): boolean {
        return this.isSameDate(date, new Date());
    }

    static getStartOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    static getEndOfMonth(date: Date): Date {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }

    static addMonths(date: Date, months: number): Date {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }

    static addYears(date: Date, years: number): Date {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    }

    static getDaysInMonth(date: Date): number {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    /**
     * Generates 42 days (6 weeks) for a month view to ensure consistent grid size.
     */
    static generateMonthGrid(viewDate: Date): Date[] {
        const startOfMonth = this.getStartOfMonth(viewDate);
        const startDay = startOfMonth.getDay(); // 0 (Sun) to 6 (Sat)

        // We want to start from the previous Sunday (if startDay is not Sunday)
        const startDate = new Date(startOfMonth);
        startDate.setDate(startDate.getDate() - startDay);

        const days: Date[] = [];
        for (let i = 0; i < 42; i++) {
            days.push(new Date(startDate));
            startDate.setDate(startDate.getDate() + 1);
        }
        return days;
    }
}
