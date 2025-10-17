import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService, Movie } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { ReviewSectionComponent } from '../../components/review-section/review-section.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, ReviewSectionComponent],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  error = '';

  constructor(private readonly route: ActivatedRoute, private readonly movieService: MovieService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe({
      next: (data) => this.movie = data,
      error: () => this.error = 'Movie not found.'
    });
  }

  getMovieImageUrl(imageName?: string): string {
    return imageName ? `https://shubhammovie.s3.amazonaws.com/images/${imageName}` : '/assets/offer-images/offer1.jpg';
  }
}
