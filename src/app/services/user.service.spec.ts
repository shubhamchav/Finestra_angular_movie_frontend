import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user info', (done) => {
    service.getUserInfo().subscribe(user => {
      expect(user).toBeTruthy();
      expect(user.name).toBe('Test User');
      done();
    });
  });
});
