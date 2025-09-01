import { Component } from '@angular/core';
import { CarouselComponent } from "../../shared/components/carousel/carousel.component";
import { FooterComponent } from "../home/footer/footer.component";
import { HeaderComponent } from "../home/header/header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from "../../shared/components/card/card.component";




@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, CarouselComponent, HeaderComponent, FooterComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
