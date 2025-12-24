
import { CalendarComponent, CalendarEvent, CalendarLocale } from '@angular-starter/calendar';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-calendar-demo',
    standalone: true,
    imports: [CommonModule, CalendarComponent],
    template: `
    <div class="demo-container">
      <h1>Calendar Demo</h1>
      
      <div class="demo-flex">
        <div class="demo-section">
          <h3>Tiếng Việt (Mặc định)</h3>
          <app-calendar [(value)]="selectedDate"></app-calendar>
          <p class="selected-value">Ngày đã chọn: {{ selectedDate() | date:'dd/MM/yyyy' }}</p>
        </div>

        <div class="demo-section">
          <h3>English Locale</h3>
          <app-calendar [locale]="enLocale" [(value)]="selectedDate"></app-calendar>
        </div>

        <div class="demo-section">
          <h3>Dữ liệu sự kiện (Events)</h3>
          <app-calendar [events]="events" [(value)]="selectedDate"></app-calendar>
          <div class="event-legend">
            <span class="dot primary"></span> Meeting
            <span class="dot danger"></span> Deadline
            <span class="dot warning"></span> Birthday
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .demo-container {
      padding: 24px;
    }
    .demo-flex {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
    }
    .demo-section {
      margin-bottom: 24px;
      min-width: 280px;
    }
    .selected-value {
      margin-top: 16px;
      font-weight: 600;
      color: var(--c-brand);
    }
    .event-legend {
        margin-top: 12px;
        font-size: 0.85rem;
        display: flex;
        gap: 12px;
        color: #666;
    }
    .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;
    }
    .dot.primary { background: var(--c-brand); }
    .dot.danger { background: #ef4444; }
    .dot.warning { background: #f59e0b; }
    
    h1 { margin-bottom: 32px; }
    h3 { margin-bottom: 16px; font-size: 1.1rem; }
  `]
})
export class CalendarDemoComponent {
    selectedDate = signal<Date | null>(new Date());

    enLocale: CalendarLocale = {
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        months: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        today: 'Today',
        clear: 'Clear'
    };

    events: CalendarEvent[] = [
        { date: new Date(), title: 'Today Meeting', color: 'var(--c-brand)' },
        { date: new Date(new Date().setDate(new Date().getDate() + 2)), title: 'Deadline', color: '#ef4444' },
        { date: new Date(new Date().setDate(new Date().getDate() - 3)), title: 'Birthday', color: '#f59e0b' },
        { date: new Date(new Date().setDate(new Date().getDate() - 3)), title: 'Party', color: '#3b82f6' },
    ];
}
