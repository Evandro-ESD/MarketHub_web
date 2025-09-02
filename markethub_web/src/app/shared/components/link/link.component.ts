import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-link',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css',
})
export class LinkComponent {
  @Input() text: string = 'Link para rotas';
  @Input() fontSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() linkRotas:string =  ''
  /** Define se o match deve ser exato (útil para a rota "/") */
  @Input() exact: boolean = false;

}
