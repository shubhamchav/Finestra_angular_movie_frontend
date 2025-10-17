import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Review {
  id?: number;
  movieId: number;
  movieTitle: string;
  username?: string;
  comment: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = environment.reviewApiBaseUrl + '/reviews';

  constructor(private http: HttpClient) {}

  getReviewsByMovie(movieId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/movie/${movieId}`);
  }


  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  editReview(review: Review): Observable<Review> {
    if (!review.id) throw new Error('Review id is required for editing');
    return this.http.put<Review>(`${this.apiUrl}/${review.id}`, review);
  }

  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reviewId}`);
  }
}
