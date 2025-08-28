import { Component } from '@angular/core';
import { LinkComponent } from '../../../shared/components/link/link.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [LinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  constructor(public authService:AuthService){}
}
