// model-film.js

const ServerFields = {
  ID: `id`,
  COMMENTS: `comments`,
  FILM_INFO: `film_info`,
  ACTORS: `actors`,
  AGE_RATING: `age_rating`,
  ALTERNATIVE_TITLE: `alternative_title`,
  DESCRIPTION: `description`,
  DIRECTOR: `director`,
  GENRE: `genre`,
  POSTER: `poster`,
  RELEASE: `release`,
  DATE: `date`,
  RELEASE_COUNTRY: `release_country`,
  RUNTIME: `runtime`,
  TITLE: `title`,
  TOTAL_RATING: `total_rating`,
  WRITERS: `writers`,
  USER_DETAILS: `user_details`,
  ALREADY_WATCHED: `already_watched`,
  FAVORITE: `favorite`,
  PERSONAL_RATING: `personal_rating`,
  WATCHING_DATE: `watching_date`,
  WATCHLIST: `watchlist`
};

class ModelFilm {
  constructor(data) {
    this.id = parseInt(data.id, 10);
    this.title = data.film_info.title;
    this.altTitle = data.film_info.alternative_title;
    this.description = data.film_info.description;
    this.director = data.film_info.director;
    this.writers = data.film_info.writers;
    this.actors = data.film_info.actors;
    this.rating = {
      total: data.film_info.total_rating,
      user: data.user_details.personal_rating,
      age: data.film_info.age_rating
    };
    this.date = data.film_info.release.date;
    this.country = data.film_info.release.release_country;
    this.duration = data.film_info.runtime;
    this.genres = data.film_info.genre;
    this.isOnWatchList = data.user_details.watchlist;
    this.isWatched = data.user_details.already_watched;
    this.watchingDate = data.user_details.watching_date;
    this.isFavorite = data.user_details.favorite;
    this.poster = data.film_info.poster;
    this.comments = data.comments;
    this.newComment = {
      emotion: null,
      author: null,
      comment: ``,
      date: null
    };
  }

  toRAW() {
    return {
      [ServerFields.ID]: String(this.id),
      [ServerFields.COMMENTS]: this.comments,

      [ServerFields.FILM_INFO]: {

        [ServerFields.ACTORS]: this.actors,
        [ServerFields.AGE_RATING]: this.rating.age,
        [ServerFields.ALTERNATIVE_TITLE]: this.altTitle,
        [ServerFields.DESCRIPTION]: this.description,
        [ServerFields.DIRECTOR]: this.director,
        [ServerFields.GENRE]: this.genres,
        [ServerFields.POSTER]: this.poster,

        [ServerFields.RELEASE]: {
          [ServerFields.DATE]: this.date,
          [ServerFields.RELEASE_COUNTRY]: this.country
        },

        [ServerFields.RUNTIME]: this.duration,
        [ServerFields.TITLE]: this.title,
        [ServerFields.TOTAL_RATING]: this.rating.total,
        [ServerFields.WRITERS]: this.writers
      },

      [ServerFields.USER_DETAILS]: {
        [ServerFields.ALREADY_WATCHED]: this.isWatched,
        [ServerFields.FAVORITE]: this.isFavorite,
        [ServerFields.PERSONAL_RATING]: this.rating.user,
        [ServerFields.WATCHING_DATE]: this.watchingDate,
        [ServerFields.WATCHLIST]: this.isOnWatchList
      }
    };
  }

  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(films) {
    return films.map(ModelFilm.parseFilm);
  }
}

export default ModelFilm;
