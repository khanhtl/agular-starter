import { CalendarComponent, CalendarUtil } from '@angular-starter/calendar';
import { AppDateInputDirective } from '@angular-starter/ui/input';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  signal,
  ViewChild
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { Calendar as CalendarIcon, LucideAngularModule, X } from 'lucide-angular';

@Component({
  selector: 'app-date-box',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule,
    CalendarComponent,
    AppDateInputDirective
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateBoxComponent),
      multi: true
    }
  ],
  templateUrl: './date-box.html',
  styleUrl: './date-box.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateBoxComponent implements ControlValueAccessor {
  /** Label for the date box */
  label = input<string>('');

  /** Placeholder for the input */
  placeholder = input<string>('dd/mm/yyyy');

  /** Whether the popover is open */
  isOpen = signal(false);

  /** Internal control for handling text input */
  inputControl = new FormControl('');

  /** Current date value */
  dateValue = signal<Date | null>(null);

  /** Icons */
  readonly CalendarIcon = CalendarIcon;
  readonly XIcon = X;

  @ViewChild('container') container?: ElementRef;

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.isOpen() && this.container && !this.container.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  toggleCalendar(event?: MouseEvent) {
    if (event) event.stopPropagation();
    this.isOpen.update(v => !v);
  }

  onDateSelect(date: Date | null) {
    this.dateValue.set(date);
    this.inputControl.setValue(CalendarUtil.formatDate(date));
    this.onChange(date);
    this.isOpen.set(false);
  }

  onInputBlur() {
    this.onTouched();
    const date = CalendarUtil.parseDate(this.inputControl.value);
    if (this.dateValue()?.getTime() !== date?.getTime()) {
      this.dateValue.set(date);
      this.onChange(date);
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    let date: Date | null = null;
    if (value instanceof Date) {
      date = value;
    } else if (typeof value === 'string' && value) {
      date = new Date(value);
      if (isNaN(date.getTime())) date = null;
    }

    this.dateValue.set(date);
    this.inputControl.setValue(CalendarUtil.formatDate(date));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }
}
