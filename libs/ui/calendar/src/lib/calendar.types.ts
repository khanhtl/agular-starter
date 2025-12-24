
export type CalendarViewType = 'month' | 'year' | 'decade' | 'century';

export interface CalendarEvent {
    date: Date;
    title: string;
    color?: string;
    data?: any;
}

export interface CalendarLocale {
    days: string[];
    months: string[];
    today: string;
    clear: string;
}

export interface CalendarCell {
    date: Date;
    label: string;
    isCurrentMonth?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
    isDisabled?: boolean;
    isOtherView?: boolean;
    events?: CalendarEvent[];
}

export interface CalendarState {
    viewDate: Date;
    selectedDate: Date | null;
    viewType: CalendarViewType;
}
