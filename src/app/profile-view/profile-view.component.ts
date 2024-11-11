// src/app/profile-view/profile-view.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';

/**
 * Component to display, edit and delete user profile information.
 * @class ProfileViewComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  initialInput: any = {};
  favoriteMovies: any[] = [];
  favorites: any[] = [];

  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };
  /** Opens UserUpdateFormComponenet */
  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '280px',
    });
  }

  /**
   * Creates an instance of ProfileViewComponent.
   *
   * @param {MatDialog} dialog - Service for opening modal dialog.
   * @param {MatDialogRef} dialogRef - Reference to the MatDialogRef for the component.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   * @param {FetchApiDataService} fetchApiData - Service to fetch user and movie data.
   * @param {Router} router - Service for navigation.
   */
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProfileViewComponent>,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  /** Lifecycle hook called after the component is initialized. */
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetches user information from API
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      console.log(response);
      // this.user = response.user;

      this.user = response;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.user.Birthday = formatDate(
        this.user.Birthday,
        'yyyy-MM-dd',
        'en-US',
        'UTC+0'
      );
      this.fetchApiData.getAllMovies().subscribe((response: any) => {
        this.favoriteMovies = response.filter(
          (m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0
        );
      });
    });
  }

  /**
   * Opens a confirmation dialog to continue to delete the user account.
   * If confirmed, deletes the user account and logs out.
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete account? Cannot be undone!')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Account Successfully Deleted', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }

  /**
   *  Open movie details from SynopsisComponent
   */
  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '400px',
    });
  }

  /**
   * Open genre information from GenreComponent
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  /**
   * Open director information from DirectorComponent
   */
  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      },
      width: '400px',
    });
  }

  /**
   * Fetches user's favorite movies.
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe(
      (resp: any) => {
        if (resp.user && resp.user.FavoriteMovies) {
          this.favorites = resp.user.FavoriteMovies;
        } else {
          this.favorites = []; // Set an empty array if data is not available
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
        this.favorites = []; // Set an empty array on error as well
      }
    );
  }

  /**
   * Checks if a specific movie is a favorite.
   *
   * @param {string} id - The id of the movie to check.
   * @returns {boolean} - True if the movie is a favorite; otherwise, false.
   */
  isFavorite(id: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(id) >= 0;
  }

  /**
   * Adds a movie to user's favorites.
   * @param {string} id - The id of movie to add.
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addToFavorites(id).subscribe((resp: any) => {
      const user = JSON.parse(localStorage.getItem('user') || '');

      user.FavoriteMovies.push(id); // Update local favoriteMovies array
      localStorage.setItem('user', JSON.stringify(user));
      this.favorites.push(id);
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * Removes a movie from the user's favorites.
   *
   * @param {string} id - The id of the movie to remove.
   */
  removeFromFavorites(id: string): void {
    this.fetchApiData.removeFromFavorites(id).subscribe((resp: any) => {
      // update FavoriteMovies in the local storage
      const user = JSON.parse(localStorage.getItem('user') || '');
      user.FavoriteMovies = user.FavoriteMovies.filter(
        (movieId: string) => movieId !== id
      );
      localStorage.setItem('user', JSON.stringify(user));
      this.favorites = this.favorites.filter(
        (movieId: string) => movieId !== id
      );
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
}
