import { useState, useEffect } from 'react'
import axios from 'axios'

export function useMovieSearch(query) {
  // State contenant l'erreur et les films
  const [state, setState] = useState({ results: null, error: null })

  // Appel de l’API lorsque la query est modifiée
  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key: 'c5742978852b8f695a61e22a33a8196c',
          query,
        },
      })
      .then(res => {
        setState({ results: res.data.results, error: null })
      })
      .catch(error => {
        setState({ error, results: null })
      })
  }, [query])

  // Si une erreur a été retournée par l'API, alors je throw
  if (state.error) {
    throw state.error
  }

  return state.results
}