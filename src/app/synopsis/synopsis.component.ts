// src/app/synopsis/synopsis.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: {
      Title: string;
      Description: string;
    }
  ) {}

ngOnInIt(): void {}
}
