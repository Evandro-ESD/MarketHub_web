import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-link',
  imports: [CommonModule, RouterLink],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css',
})
export class LinkComponent {
  @Input() text: string = 'Link para rotas';
  @Input() fontSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() linkRotas:string =  ''

}
