import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './features/home/header/header.component';
import { AlertContainerComponent } from './shared/components/alert-container/alert-container.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AlertContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'markethub_web';
}
