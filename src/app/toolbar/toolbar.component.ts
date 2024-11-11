// src/app/toolbar/toolbar.component.ts
import { Component, OnInit, Injectable} from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component for the toolbar of the application.
 * Provides navigation options to movies, profile and welcome page (logout).
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {
  /**
   * Constructs the ToolbarComponent.
   * @param router - Angular Router service for navigation.
   */
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


