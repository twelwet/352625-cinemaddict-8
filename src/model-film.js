// model-film.js

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
      id: String(this.id),
      comments: this.comments,
      film_info: {
        actors: this.actors,
        age_rating: this.rating.age,
        alternative_title: this.altTitle,
        description: this.description,
        director: this.director,
        genre: this.genres,
        poster: this.poster,
        release: {
          date: this.date,
          release_country: this.country
        },
        runtime: this.duration,
        title: this.title,
        total_rating: this.rating.total,
        writers: this.writers
      },
      user_details: {
        already_watched: this.isWatched,
        favorite: this.isFavorite,
        personal_rating: this.rating.user,
        watching_date: ``,
        watchlist: this.isOnWatchList
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
