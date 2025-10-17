// ...existing imports and code...
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MovieService, Movie } from '../../services/movie.service';
import { Router } from '@angular/router';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  getMovieImageUrl(imageName: string): string {
    return `https://shubhammovie.s3.amazonaws.com/images/${imageName}`;
  }
  bookMovie(movie: Movie) {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    // Add your booking logic here
    alert('Booking for ' + movie.title);
  }

  onMovieClick(movie: Movie) {
    this.goToDetail(movie.id);
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
  movies: Movie[] = [];
  error = '';
  showAddForm = false;
  showEditForm: number | null = null;
  newMovie: Movie = { title: '', description: '', director: '', year: new Date().getFullYear() };
  editMovie: Movie = { title: '', description: '', director: '', year: new Date().getFullYear() };
  selectedImageFile: File | null = null;

  isAdmin = false;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadMovies();
    this.userService.getUserInfo().subscribe({
      next: (info) => {
        this.isAdmin = info.userType === 'ADMIN';
      },
      error: () => {
        this.isAdmin = false;
      }
    });
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (data) => this.movies = data,
      error: () => this.error = 'Failed to load movies.'
    });
  }

  goToDetail(id?: number) {
    if (typeof id === 'number') {
      this.router.navigate(['/movies', id]);
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.newMovie = { title: '', description: '', director: '', year: new Date().getFullYear() };
  }


  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    } else {
      this.selectedImageFile = null;
    }
  }

  addMovie() {
    if (this.selectedImageFile) {
      this.movieService.uploadImage(this.selectedImageFile).subscribe({
        next: (imageName) => {
          this.newMovie.movieImage = imageName;
          this.saveMovie();
        },
        error: () => this.error = 'Failed to upload image.'
      });
    } else {
      this.saveMovie();
    }
  }

  saveMovie() {
    this.movieService.addMovie(this.newMovie).subscribe({
      next: () => {
        this.showAddForm = false;
        this.selectedImageFile = null;
        this.loadMovies();
      },
      error: () => this.error = 'Failed to add movie.'
    });
  }

  toggleEditForm(movie: Movie) {
    this.showEditForm = movie.id || null;
    this.editMovie = { ...movie };
  }

  updateMovie() {
    if (!this.editMovie.id) return;
    this.movieService.updateMovie(this.editMovie.id, this.editMovie).subscribe({
      next: () => {
        this.showEditForm = null;
        this.loadMovies();
      },
      error: () => this.error = 'Failed to update movie.'
    });
  }

  deleteMovie(id: number) {
    if (!confirm('Are you sure you want to delete this movie?')) return;
    this.movieService.deleteMovie(id).subscribe({
      next: () => this.loadMovies(),
      error: () => this.error = 'Failed to delete movie.'
    });
  }

  // Removed duplicate onMovieClick
}
