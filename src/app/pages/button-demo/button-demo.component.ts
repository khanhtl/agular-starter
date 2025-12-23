import { ButtonComponent, DropdownItem } from '@angular-starter/ui/button';
import { Component, signal } from '@angular/core';

@Component({
    selector: 'app-button-demo',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './button-demo.component.html',
})
export class ButtonDemoComponent {
    isLoading = signal(false);

    toggleLoading() {
        this.isLoading.set(true);
        setTimeout(() => this.isLoading.set(false), 2000);
    }

    menuItems: DropdownItem[] = [
        { label: 'Edit Profile', icon: 'ri-pencil-line' },
        { label: 'Preferences', icon: 'ri-settings-3-line' },
        { label: 'Logout', icon: 'ri-logout-box-r-line' }
    ];

    onMenuAction(item: DropdownItem) {
        console.log('Menu Action Clicked:', item.label);
        alert(`Clicked: ${item.label}`);
    }
}
