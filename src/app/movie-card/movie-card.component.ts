// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component to display list of movies as cards.
 * @class MovieCardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /** Array to hold all movies fetched from the API. */
  movies: any[] = [];
  /** Array to store the IDs of the user's favorite movies. */
  favorites: any[] = [];

  /**
   * Creates an instance of MovieCardComponent.
   *
   * @param {FetchApiDataService} fetchApiData - Service to fetch movie data.
   * @param {MatDialog} dialog - Service to open modal dialog.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  /** Lifecycle hook called after the component is initialized. */
  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Fetches ALL movies from the API.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
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
      user.FavoriteMovies.push(id); // Update local FavoriteMovies array
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
