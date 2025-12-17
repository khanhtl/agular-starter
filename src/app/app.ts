import { registerConfirmPopup } from '@angular-starter/ui/dialogs';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'angular-starter';

  constructor() {
    registerConfirmPopup();
  }
}
