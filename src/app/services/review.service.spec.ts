import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReviewService, Review } from './review.service';
import { environment } from '../../environments/environment';

describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewService]
    });
    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get reviews by movie', () => {
    const dummyReviews: Review[] = [
      { id: 1, movieId: 1, movieTitle: 'Test Movie', username: 'user1', comment: 'Great!' }
    ];
    service.getReviewsByMovie(1).subscribe(reviews => {
      expect(reviews.length).toBe(1);
      expect(reviews).toEqual(dummyReviews);
    });
    const req = httpMock.expectOne(`${environment.reviewApiBaseUrl}/reviews/movie/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReviews);
  });

  it('should add a review', () => {
    const newReview: Review = { movieId: 1, movieTitle: 'Test Movie', comment: 'Nice!' };
    const createdReview: Review = { ...newReview, id: 2 };
    service.addReview(newReview).subscribe(review => {
      expect(review).toEqual(createdReview);
    });
    const req = httpMock.expectOne(`${environment.reviewApiBaseUrl}/reviews`);
    expect(req.request.method).toBe('POST');
    req.flush(createdReview);
  });

  it('should edit a review', () => {
    const review: Review = { id: 1, movieId: 1, movieTitle: 'Test Movie', comment: 'Updated!' };
    service.editReview(review).subscribe(updated => {
      expect(updated).toEqual(review);
    });
    const req = httpMock.expectOne(`${environment.reviewApiBaseUrl}/reviews/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(review);
  });

  it('should throw error if editing review without id', () => {
    const review: Review = { movieId: 1, movieTitle: 'Test Movie', comment: 'No id!' };
    expect(() => service.editReview(review)).toThrowError('Review id is required for editing');
  });

  it('should delete a review', () => {
    service.deleteReview(1).subscribe(response => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${environment.reviewApiBaseUrl}/reviews/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
