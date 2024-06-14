import { List, Movies } from 'src/types/get.movies.service';
import { GroupByCategoryMovie } from 'src/types/groupeByCategoryMovie.utils';

export default async function groupByCategoryMovie(
  movies: GroupByCategoryMovie[],
) {
  const groupedMovies: { [key: string]: List[] } = {};

  movies.forEach((movie) => {
    if (Array.isArray(movie.category)) {
      movie.category.forEach((cat) => {
        if (!groupedMovies[cat]) {
          groupedMovies[cat] = [];
        }
        groupedMovies[cat].push({
          id: movie.id,
          image: movie.image,
          title: movie.title,
          customer: movie.customer,
        });
      });
    } else {
      const category = movie.category;
      if (!groupedMovies[category]) {
        groupedMovies[category] = [];
      }
      groupedMovies[category].push({
        id: movie.id,
        image: movie.image,
        title: movie.title,
        customer: movie.customer,
      });
    }
  });

  // Filtra categorias com mais de um filme
  const filteredGroupedMovies = Object.keys(groupedMovies).reduce(
    (acc, category) => {
      if (groupedMovies[category].length > 1) {
        acc[category] = groupedMovies[category];
      }
      return acc;
    },
    {},
  );

  const moviesArray: Movies[] = Object.keys(filteredGroupedMovies).map(
    (category) => ({
      category,
      movies: filteredGroupedMovies[category],
    }),
  );

  return moviesArray;
}
