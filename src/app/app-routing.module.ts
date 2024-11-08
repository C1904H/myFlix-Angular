import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

const routes: Routes = [
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
