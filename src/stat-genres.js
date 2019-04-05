// stat-genres.js

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const getStat = (films) => {
  const watchedFilms = films.filter((it) => it.isWatched === true);
  const bunch = [].concat(...watchedFilms.map((film) => Array.from(film.genres.all)));
  const names = [...new Set(bunch)];
  const quantites = names.map((genre) => bunch.filter((it) => it === genre).length);
  const youWatched = watchedFilms.length;
  const totalDuration = [].concat(...watchedFilms.map((film) => film.duration)).reduce((acc, duration) => acc + duration);
  const topGenre = names[quantites.indexOf(Math.max(...quantites))];
  return {names, quantites, youWatched, totalDuration, topGenre};
};

const getChart = (genresCtx) => {
  const BAR_HEIGHT = 50;
  genresCtx.height = BAR_HEIGHT * 5;

  return new Chart(genresCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [],
      datasets: [{
        data: [11, 8, 7, 4, 3],
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};

export {getStat, getChart};
