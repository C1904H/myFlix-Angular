// src/app/director/director.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component to display information about a movie director,
 * including their name, bio and birthday.
 * @class DirectorComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss'],
})
export class DirectorComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string;
      Bio: string;
      Birth: string;
    }
  ) {}

  /** Lifecycle hook called after the component is initialized. */
  ngOnInit(): void {}
}
