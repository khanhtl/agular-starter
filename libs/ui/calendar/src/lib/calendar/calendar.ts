
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  model,
  signal
} from '@angular/core';
import { CalendarCell, CalendarEvent, CalendarLocale, CalendarViewType } from '../calendar.types';
import { CalendarUtil } from '../calendar.util';

const VI_LOCALE: CalendarLocale = {
  days: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  months: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
  today: 'Hôm nay',
  clear: 'Xóa'
};

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[tabindex]': '0',
    'role': 'grid',
    '[attr.aria-label]': 'headerTitle()',
  }
})
export class CalendarComponent {
  /** The currently selected date (model for two-way binding) */
  value = model<Date | null>(null);

  /** Minimum selectable date */
  min = input<Date | null>(null);

  /** Maximum selectable date */
  max = input<Date | null>(null);

  /** Custom events to display on the calendar */
  events = input<CalendarEvent[]>([]);

  /** Locale configuration for localization */
  locale = input<CalendarLocale>(VI_LOCALE);

  /** The current view type */
  viewType = signal<CalendarViewType>('month');

  /** The date being used to determine which month/year is shown */
  viewDate = signal<Date>(new Date());

  /** Names of the days of the week */
  weekDays = computed(() => this.locale().days);

  /** Month names */
  months = computed(() => this.locale().months);

  /** Computed grid for the month view */
  monthGrid = computed(() => {
    const days = CalendarUtil.generateMonthGrid(this.viewDate());
    const selected = this.value();
    const today = new Date();
    const currentViewDate = this.viewDate();
    const allEvents = this.events();

    return days.map(date => ({
      date,
      label: date.getDate().toString(),
      isCurrentMonth: CalendarUtil.isSameMonth(date, currentViewDate),
      isToday: CalendarUtil.isSameDate(date, today),
      isSelected: CalendarUtil.isSameDate(date, selected),
      isOtherView: !CalendarUtil.isSameMonth(date, currentViewDate),
      events: allEvents.filter(e => CalendarUtil.isSameDate(e.date, date))
    } as CalendarCell));
  });

  /** Computed grid for the year view */
  yearGrid = computed(() => {
    const currentYear = this.viewDate().getFullYear();
    const selected = this.value();
    const today = new Date();

    return this.months().map((month, index) => {
      const date = new Date(currentYear, index, 1);
      return {
        date,
        label: month.substring(0, 3),
        isSelected: selected ? (selected.getFullYear() === currentYear && selected.getMonth() === index) : false,
        isToday: today.getFullYear() === currentYear && today.getMonth() === index,
      } as CalendarCell;
    });
  });

  /** Computed grid for the decade view (12 years) */
  decadeGrid = computed(() => {
    const currentYear = this.viewDate().getFullYear();
    const startYear = Math.floor(currentYear / 10) * 10 - 1;
    const selected = this.value();
    const today = new Date();

    return Array.from({ length: 12 }, (_, i) => {
      const year = startYear + i;
      const date = new Date(year, 0, 1);
      return {
        date,
        label: year.toString(),
        isSelected: selected?.getFullYear() === year,
        isToday: today.getFullYear() === year,
        isOtherView: i === 0 || i === 11 // First and last are outside the decade
      } as CalendarCell;
    });
  });

  /** Header title based on current view */
  headerTitle = computed(() => {
    const date = this.viewDate();
    const type = this.viewType();

    if (type === 'month') {
      return `${this.months()[date.getMonth()]} ${date.getFullYear()}`;
    } else if (type === 'year') {
      return `${date.getFullYear()}`;
    } else {
      const startYear = Math.floor(date.getFullYear() / 10) * 10;
      return `${startYear} - ${startYear + 9}`;
    }
  });

  prev() {
    const type = this.viewType();
    const date = this.viewDate();
    if (type === 'month') {
      this.viewDate.set(CalendarUtil.addMonths(date, -1));
    } else if (type === 'year') {
      this.viewDate.set(CalendarUtil.addYears(date, -1));
    } else {
      this.viewDate.set(CalendarUtil.addYears(date, -10));
    }
  }

  next() {
    const type = this.viewType();
    const date = this.viewDate();
    if (type === 'month') {
      this.viewDate.set(CalendarUtil.addMonths(date, 1));
    } else if (type === 'year') {
      this.viewDate.set(CalendarUtil.addYears(date, 1));
    } else {
      this.viewDate.set(CalendarUtil.addYears(date, 10));
    }
  }

  toggleView() {
    const current = this.viewType();
    if (current === 'month') {
      this.viewType.set('year');
    } else if (current === 'year') {
      this.viewType.set('decade');
    }
  }

  selectCell(cell: CalendarCell) {
    const type = this.viewType();

    if (type === 'month') {
      this.value.set(cell.date);
      this.viewDate.set(cell.date);
    } else if (type === 'year') {
      this.viewDate.set(cell.date);
      this.viewType.set('month');
    } else if (type === 'decade') {
      this.viewDate.set(cell.date);
      this.viewType.set('year');
    }
  }

  selectToday() {
    const today = new Date();
    this.value.set(today);
    this.viewDate.set(today);
    this.viewType.set('month');
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const date = new Date(this.viewDate());
    const type = this.viewType();

    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'ArrowLeft':
        if (type === 'month') date.setDate(date.getDate() - 1);
        else if (type === 'year') date.setMonth(date.getMonth() - 1);
        else date.setFullYear(date.getFullYear() - 1);
        this.viewDate.set(date);
        break;
      case 'ArrowRight':
        if (type === 'month') date.setDate(date.getDate() + 1);
        else if (type === 'year') date.setMonth(date.getMonth() + 1);
        else date.setFullYear(date.getFullYear() + 1);
        this.viewDate.set(date);
        break;
      case 'ArrowUp':
        if (type === 'month') date.setDate(date.getDate() - 7);
        else if (type === 'year') date.setMonth(date.getMonth() - 3);
        else date.setFullYear(date.getFullYear() - 3);
        this.viewDate.set(date);
        break;
      case 'ArrowDown':
        if (type === 'month') date.setDate(date.getDate() + 7);
        else if (type === 'year') date.setMonth(date.getMonth() + 3);
        else date.setFullYear(date.getFullYear() + 3);
        this.viewDate.set(date);
        break;
      case 'Enter':
        if (type === 'month') {
          this.value.set(new Date(this.viewDate()));
        } else {
          this.selectCell({ date: this.viewDate(), label: '' });
        }
        break;
      case 'Escape':
        if (type === 'year') this.viewType.set('month');
        else if (type === 'decade') this.viewType.set('year');
        break;
    }
  }
}
