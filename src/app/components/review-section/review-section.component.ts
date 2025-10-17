import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService, Review } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-review-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-section.component.html',
  styleUrls: ['./review-section.component.scss']
})
export class ReviewSectionComponent implements OnInit {
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
  @Input() movieId!: number;
  @Input() movieTitle!: string;
  reviews: Review[] = [];
  comment = '';
  error = '';
  editingReviewId: number | null = null;
  currentUsername: string = '';

  constructor(private readonly reviewService: ReviewService, private readonly userService: UserService) {}

  ngOnInit() {
    this.loadReviews();
    if (this.isLoggedIn()) {
      this.userService.getUserInfo().subscribe({
        next: (user) => this.currentUsername = user.username,
        error: () => this.currentUsername = ''
      });
    }
  }

  loadReviews() {
    if (!this.movieId) return;
    this.reviewService.getReviewsByMovie(this.movieId).subscribe({
      next: (data) => this.reviews = data,
      error: () => this.error = 'Failed to load reviews.'
    });
  }

  addReview() {
    if (!this.movieId || !this.comment) return;
    const review: Review = {
      movieId: this.movieId,
      movieTitle: this.movieTitle,
      comment: this.comment
    };
    this.reviewService.addReview(review).subscribe({
      next: () => {
        this.comment = '';
        this.loadReviews();
      },
      error: () => this.error = 'Failed to add review.'
    });
  }

  startEdit(review: Review) {
    this.editingReviewId = review.id!;
    this.comment = review.comment;
  }

  cancelEdit() {
    this.editingReviewId = null;
    this.comment = '';
  }

  saveEdit() {
    if (!this.editingReviewId || !this.comment) return;
    const review: Review = {
      id: this.editingReviewId,
      movieId: this.movieId,
      movieTitle: this.movieTitle,
      comment: this.comment
    };
    this.reviewService.editReview(review).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadReviews();
      },
      error: () => this.error = 'Failed to update review.'
    });
  }

  deleteReview(review: Review) {
    if (!review.id) return;
    this.reviewService.deleteReview(review.id).subscribe({
      next: () => this.loadReviews(),
      error: () => this.error = 'Failed to delete review.'
    });
  }

  isReviewAuthor(review: Review): boolean {
    return !!this.currentUsername && review.username === this.currentUsername;
  }
}
