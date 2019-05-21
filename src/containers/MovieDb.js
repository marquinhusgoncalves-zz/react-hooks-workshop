import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMovieSearch = (query) => {
  const [movies, setMovies] = useState(() => []);

  useEffect(
    () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      axios
        .get('https://api.themoviedb.org/3/search/movie', {
          cancelToken: source.token,
          params: {
            api_key: 'c5742978852b8f695a61e22a33a8196c',
            query
          },
        })
        .then(res => {
          setMovies(res.data.results);
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('Request canceled', error.message);
          } else {
            // handle error
          }
        });
    }, [query]
  )
  return movies;
}
