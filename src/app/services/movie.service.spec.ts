import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService, Movie } from './movie.service';
import { environment } from '../../environments/environment';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all movies', () => {
    const dummyMovies: Movie[] = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' }
    ];
    service.getMovies().subscribe(movies => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/movies`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });

  it('should fetch a movie by id', () => {
    const dummyMovie: Movie = { id: 1, title: 'Test Movie' };
    service.getMovie(1).subscribe(movie => {
      expect(movie).toEqual(dummyMovie);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/movies/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovie);
  });

  it('should create a movie', () => {
    const newMovie: Movie = { title: 'New Movie' };
    service.addMovie(newMovie).subscribe(movie => {
      expect(movie.title).toBe('New Movie');
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/movies`);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newMovie, id: 1 });
  });

  it('should update a movie', () => {
    const updatedMovie: Movie = { id: 1, title: 'Updated Movie' };
    service.updateMovie(1, updatedMovie).subscribe(movie => {
      expect(movie.title).toBe('Updated Movie');
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/movies/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedMovie);
  });

  it('should delete a movie', () => {
    service.deleteMovie(1).subscribe(response => {
      expect(response).toBeNull();
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/movies/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
