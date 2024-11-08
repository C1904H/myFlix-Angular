import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-flix-100-e95c2855a01d.herokuapp.com';

@Injectable({
  providedIn: 'root',
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // API call for user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get 1 movie
  getMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/${_id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get director
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get genre
  getGenre(genre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/genres/${genre}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get all users
  getUserList(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    // Get user
    getUser(): Observable<any> {
      const localStorageUser = localStorage.getItem('user')
    const { Username } = localStorageUser ? JSON.parse(localStorageUser):undefined;
      // const Username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      // console.log(Username);
      // console.log(token);
      return this.http
        .get(`${apiUrl}/users/${Username}`, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    }

    // Edit user
  updateUser(updatedUser: any): Observable<any> {
    const localStorageUser = localStorage.getItem('user')
    const { Username } = localStorageUser ? JSON.parse(localStorageUser):undefined;
    // const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}/users/${Username}`, updatedUser, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete user
  deleteUser(): Observable<any> {
    // const Username  = localStorage.getItem('user');
    const { Username } = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get user favorite movies
  getFavoriteMovies(): Observable<any> {
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${Username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), map((data) => data.FavoriteMovies), catchError(this.handleError));
  }

  // Add favorite movie
  addToFavorites(movieID: string): Observable<any> {
    const localStorageUser = localStorage.getItem('user');
    const user = localStorageUser ? JSON.parse(localStorageUser): undefined;
    const token = localStorage.getItem('token');
    console.log(`${apiUrl}/users/${user.Username}/movies/${movieID}`);
    return this.http
      .post(`${apiUrl}/users/${user.Username}/movies/${movieID}`, null, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  
  // Delete movie from favorites
  removeFromFavorites(movieID: string): Observable<any> {
    // const Username = localStorage.getItem('user');
    const localStorageUser = localStorage.getItem('user');
    const user = localStorageUser ? JSON.parse(localStorageUser): undefined;
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${user.Username}/movies/${movieID}`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`, console.log(error.error)
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
