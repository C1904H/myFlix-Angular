# MyFlixAngularClient

MyFlixAngularClient is a single-page, responsive movie app built using Angular.  This project builds the client-side using Angular, based on an existing server-side code, movie_api -  a REST API and database.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## User stories

* As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Key features

* App displays a welcome view where users are able to either log in or register an account.
* Once authenticated, users can view all movies.
* Upon clicking on a particular movie, additional movie details are displayed:
    * A button that when clicked takes user to the director view, where details about the director of that particular movie is displayed.
    * A button that when clicked takes user to the genre view, where details about that particular genre of the movie is displayed.

## Technologies

- **Frontend Framework**: [Angular](https://angular.io/)
- **UI Components**: [Angular Material](https://material.angular.io/)
- **CSS Styling**: SCSS
- **Backend API**: movie_api (see separate repository)
- **Deployment**: GitHub Pages

## Installation

- Clone the repository
- Install the project dependencies:
  `npm install` 
- Run `ng serve` for a dev server. 
- Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Deployment

- Deploy your application to GitHub Pages 

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
