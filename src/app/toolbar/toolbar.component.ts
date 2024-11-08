// src/app/toolbar/toolbar.component.ts
import { Component, OnInit, Injectable} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
// @Injectable()
export class ToolbarComponent implements OnInit {
  constructor(public router: Router) {}
  ngOnInit(): void {}

  /**
   * Navigates to the movies page.
   */
  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * Navigates to the welcome page and clears local storage.
   */
  navigateToWelcome(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * Navigates to the profile page.
   */
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}


