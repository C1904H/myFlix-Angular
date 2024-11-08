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

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  Username: string = '';
  initialInput: any = {};
  favoriteMovies: any[] = [];
  favorites: any[] = [];
  
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };
  openUserUpdateDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '280px'
    });
  }

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProfileViewComponent>,
    public snackBar: MatSnackBar,
    public fetchApiData: FetchApiDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUser();

  }

  // Fetch user data via API
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
        this.favoriteMovies = response.filter((m: { _id: any }) => this.user.FavoriteMovies.indexOf(m._id) >= 0)
    })
  })
  }

  // Fetch delete user via API
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

    removeFromFavorites(id: string): void {
      console.log(id);
      this.fetchApiData.removeFromFavorites(id).subscribe(() => {
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000,
        });
        this.ngOnInit();
        // const username = localStorage.getItem('Username');
        // if (username !== null) {
        //   // Fetch the updated favorite movies data
        //   this.fetchApiData.getFavoriteMovies(username).subscribe((favorites: any) => {
        //     this.favorites = favorites;
        //   });
        // }  
      });
    }

  
}
