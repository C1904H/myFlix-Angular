// src/app/synopsis/synopsis.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component to display information about a movie's synopsis,
 * @class SynopsisComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss'],
})
export class SynopsisComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string;
      Description: string;
    }
  ) {}

  /** Lifecycle hook called after the component is initialized. */
  ngOnInIt(): void {}
}
