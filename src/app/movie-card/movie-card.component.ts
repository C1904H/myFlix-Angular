// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  // Returns all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  // Open movie details from SynopsisComponent
  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '400px',
    });
  }

  // Open genre information from GenreComponent
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

  // Open director information from DirectorComponent
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

  isFavorite(id: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(id) >= 0;
  }

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

  // Removes a movie from a user's favorites
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
