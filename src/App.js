// App.js
import React, { useState } from 'react';
import { Normalize, Grid, Typography } from '@smooth-ui/core-sc';
import SearchInput from './components/SearchInput';
import { useMovieSearch } from './containers/MovieDb'

export default function App() {
  /* TODO: With the help of "useState", you should connect the "SearchInput" field */
  const [query, setQuery] = useState(() => 'Lord of the Rings');

  // The usage of the custom Hook to collect the list of movies from the API
  const movies = useMovieSearch(query)

  return (
    <>
      {/* The "Grid" component centers the child in the page, "py" means "padding-top" and "padding-bottom" */}
      <Grid py={200}>
        {/* Normalize the CSS output between the different browsers */}
        <Normalize />
        {/* a "Typography" composant with ready to use variants */}
        <Typography variant="display-1">Smooth Movie</Typography>
        {/* The "SearchInput" component */}
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        {movies.map(movie => {
          return <div key={movie.id}>{movie.title}</div>
        })}
      </Grid>
    </>
  )
}