// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// Import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
     console.log(result);
    localStorage.setItem('user', JSON.stringify(result.user));
     localStorage.setItem('token', result.token);
     this.dialogRef.close(); 
     this.snackBar.open('Login successful', 'OK', {
        duration: 2000
     });
     this.router.navigate(['movies']);
    }, (data) => {
      this.snackBar.open('Login failed', 'OK', {
        duration: 2000
      });
    });
  }

  }
