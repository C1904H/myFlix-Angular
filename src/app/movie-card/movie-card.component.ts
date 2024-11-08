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
  // users: any[] = [];
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

ngOnInit(): void {
  this.getMovies();
  this.getFavorites();
}

// Returns all movies 
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // console.log(this.movies);
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

isFavorite(movieID: string): boolean {
  const localStorageUser = localStorage.getItem('user');
  const user = localStorageUser ? JSON.parse(localStorageUser): undefined;
  return user.FavoriteMovies.indexOf(movieID) >= 0;
}

addToFavorites(ID: string): void {
    console.log(ID);
    this.fetchApiData.addToFavorites(ID).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
 
  // Removes a movie from a user's favorites
  removeFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.removeFromFavorites(id).subscribe(() => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
 
}
