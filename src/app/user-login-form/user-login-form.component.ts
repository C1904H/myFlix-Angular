// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// Import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component for handling user login.
 *
 * @class UserLoginFormComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * User data containing username and password.
   *
   * @type {{ Username: string; Password: string; }}
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   *
   * @param {FetchApiDataService} fetchApiData - Service for API calls.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog.
   * @param {MatSnackBar} snackBar - Service for displaying notifications.
   * @param {Router} router - Service for navigation.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after the component has been initialized.
   */
  ngOnInit(): void {}

  /**
   * Logs in the user by sending username and password to the backend.
   * This function calls the userLogin method from the FetchApiDataService,
   * and handles the response to either navigate to the movies page or show an error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('Login successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (data) => {
        this.snackBar.open('Login failed', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
