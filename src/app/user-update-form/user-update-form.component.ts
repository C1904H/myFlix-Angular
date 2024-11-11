// src/app/user-update-form/user-update-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
// import { MatDialog } from '@angular/material/dialog';

/**
 * Component to edit user profile information.
 *
 * @class UserUpdateFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss'],
})
export class UserUpdateFormComponent implements OnInit {
  user: any = {};
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  /**
   * Creates an instance of UserUpdateFormComponent.
   *
   * @param {MatDialogRef<UserUpdateFormComponent>} dialogRef - Reference to the MatDialogRef for the component.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   * @param {FetchApiDataService} fetchApiData - Service to fetch user and movie data.
   * @param {Router} router - Service for navigation.
   */
  constructor(
    public dialogRef: MatDialogRef<UserUpdateFormComponent>,
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

      this.user = response;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.user.Birthday = formatDate(
        this.user.Birthday,
        'yyyy-MM-dd',
        'en-US',
        'UTC+0'
      );
    });
  }

  /**
   * Send updated user information to API
   */
  editUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe(
      (data) => {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('Username', data.Username);
        console.log(data);
        this.snackBar.open('User has been updated', 'OK', {
          duration: 2000,
        });
        window.location.reload();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
