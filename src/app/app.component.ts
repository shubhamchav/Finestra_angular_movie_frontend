// ...existing imports...
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from './components/slideshow/slideshow.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, SlideshowComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-frontend';

  openSignIn() {
    window.location.href = '/login';
  }

  offerImages = [
    'assets/offer-images/offer1.jpg',
    'assets/offer-images/offer2.jpg',
    'assets/offer-images/offer3.jpg'
  ];

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
}
