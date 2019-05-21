// App.js
import React, { useState } from 'react'
import { Row, Col, Normalize, Grid, Typography } from '@smooth-ui/core-sc'
import SearchInput from './components/SearchInput'
import Catch from './components/Catch'
import { MovieSearch } from './containers/MovieDb'
import Card from './components/Card'

export default function App() {
  /* TODO: With the help of "useState", you should connect the "SearchInput" field */
  const [query, setQuery] = useState(() => 'Lord of the Rings');

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
        <Catch>
          {/* Affichage de la liste de films */}
          <Row>
            <MovieSearch query={query}>
              {movies =>
                movies && movies.map(movie => (
                  <Col my={1} xs={12} md={6} key={movie.id}>
                    <Card
                      key={movie.id}
                      style={{
                        height: 200,
                        backgroundImage: movie.backdrop_path
                          ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
                          : null,
                      }}
                    >
                      <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Subtitle>
                          {movie.vote_average} ({movie.vote_count} votes)
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              }
            </MovieSearch>
          </Row>
        </Catch>
      </Grid>
    </>
  )
}
