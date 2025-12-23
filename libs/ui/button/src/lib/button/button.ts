import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, TemplateRef, booleanAttribute, inject, input, output, signal, viewChild } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface DropdownItem {
  label: string;
  icon?: string;
  click?: () => void;
  disabled?: boolean;
}

/**
 * A standard, accessible button component with multiple variants, sizes, and states.
 * Supports icons via content projection (`[slot=start]`, `[slot=end]`) and a built-in dropdown chevron.
 * 
 * @example
 * <app-button variant="primary" (click)="save()">Save</app-button>
 * <app-button variant="outline" [loading]="isLoading">Loading</app-button>
 * <app-button [dropdown]="true">Dropdown <svg slot="end" .../></app-button>
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class.lib-button]': 'true',
    '[class.variant-primary]': 'variant() === "primary"',
    '[class.variant-secondary]': 'variant() === "secondary"',
    '[class.variant-outline]': 'variant() === "outline"',
    '[class.variant-ghost]': 'variant() === "ghost"',
    '[class.variant-danger]': 'variant() === "danger"',
    '[class.variant-link]': 'variant() === "link"',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.size-icon]': 'size() === "icon"',
    '[class.is-loading]': 'loading()',
    '[class.is-disabled]': 'disabled()',
    '[class.is-split]': 'split()',
    '[attr.type]': 'type()',
    '[attr.disabled]': 'disabled() || loading() ? true : null',
    '(click)': 'handleClick($event)',
  }
})
export class ButtonComponent {
  private elementRef = inject(ElementRef);
  private rippleContainer = viewChild<ElementRef<HTMLElement>>('rippleContainer');

  /** The visual style variant of the button. Default is 'primary'. */
  variant = input<ButtonVariant>('primary');

  /** The size of the button. Default is 'md'. */
  size = input<ButtonSize>('md');

  /** The generic HTML type of the button. Default is 'button'. */
  type = input<ButtonType>('button');

  /** Whether the button is in a loading state. Shows a spinner and hides content. */
  loading = input(false, { transform: booleanAttribute });

  /** Whether the button is disabled. */
  disabled = input(false, { transform: booleanAttribute });

  /** Whether to show a dropdown chevron indicator on the right side. */
  dropdown = input(false, { transform: booleanAttribute });

  /** A template to show in the dropdown. */
  menu = input<TemplateRef<unknown>>();

  /** A simple list of items to show in the dropdown if no template is provided. */
  items = input<DropdownItem[]>([]);

  /** Whether to function as a split button with a separate chevron click area. */
  split = input(false, { transform: booleanAttribute });

  /** Whether to enable the ripple effect on click. */
  ripple = input(false, { transform: booleanAttribute });

  /** Event emitted when a dropdown item is clicked. */
  itemClicked = output<DropdownItem>();

  /** State for the overlay */
  isOpen = signal(false);

  toggle(event?: Event) {
    if (this.disabled() || this.loading()) return;

    // If split, this is the caret click. We handle ripple here because 
    // we stop propagation to the host's handleClick.
    if (this.split()) {
      if (this.ripple() && event instanceof MouseEvent) {
        this.createRipple(event);
      }
      event?.stopPropagation();
    }

    if (this.menu() || this.items().length > 0) {
      if (this.split()) {
        this.isOpen.update(v => !v);
      }
      // If not split, the handleClick on host will handle it as it bubbles.
      // We don't want to call it here too or it will toggle twice.
    }
  }

  close() {
    this.isOpen.set(false);
  }

  handleItemClick(item: DropdownItem) {
    if (item.disabled) return;
    item.click?.();
    this.itemClicked.emit(item);
    this.close();
  }

  /* Ripple Logic - Host Listener approach */
  handleClick(event: MouseEvent) {
    if (this.disabled() || this.loading()) return;

    if (this.ripple()) {
      this.createRipple(event);
    }

    // If it's a dropdown button but NOT split, the whole button should toggle the menu
    if (!this.split() && (this.menu() || this.items().length > 0)) {
      this.isOpen.update(v => !v);
    }
  }

  private createRipple(event: MouseEvent) {
    const container = this.rippleContainer()?.nativeElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    container.appendChild(ripple);

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }
}
