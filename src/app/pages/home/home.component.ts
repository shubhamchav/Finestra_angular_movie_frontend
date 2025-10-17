import { Component } from '@angular/core';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SlideshowComponent, MovieListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  offerImages = [
    'assets/offer-images/offer1.jpg',
    'assets/offer-images/offer2.jpg',
    'assets/offer-images/offer3.jpg'
  ];
}
