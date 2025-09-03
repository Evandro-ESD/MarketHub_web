import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/home/header/header.component';
import { AlertContainerComponent } from './shared/components/alert-container/alert-container.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AlertContainerComponent, ConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'markethub_web';
}
