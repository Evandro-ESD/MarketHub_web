import { Component } from '@angular/core';
import { CarouselComponent } from "../../shared/components/carousel/carousel.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";




@Component({
  selector: 'app-home',
  imports: [CarouselComponent, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
