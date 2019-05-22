// App.js
import React, { useState, useRef, useEffect } from 'react'
import {
  Button,
  Row,
  Col,
  Normalize,
  Grid,
  Typography
} from '@smooth-ui/core-sc'
import SearchInput from './components/SearchInput'
import { useI18n, T } from './components/I18n'
import Catch from './components/Catch'
import { MovieSearch } from './containers/MovieDb'
import Card from './components/Card'

export default function App() {
  const [query, setQuery] = useState(() => 'Lord of the Rings');
  // Récupération de la locale et de la fonction "setLocale" depuis le contexte
  const { setLocale, locale } = useI18n()
  // Si on est en français, on voudra passer en anglais et inversement
  const otherLocale = locale === 'fr' ? 'en' : 'fr'

  const searchInputRef = useRef()

  useEffect(() => {
    searchInputRef.current.focus()
  }, [searchInputRef])

  return (
    <>
      {/* The "Grid" component centers the child in the page, "py" means "padding-top" and "padding-bottom" */}
      <Grid py={200}>
        {/* Normalize the CSS output between the different browsers */}
        <Normalize />
        {/* Bouton permettant de changer de langue, "my" signifie "margin-top" et "margin-bottom" */}
        <Button my={1} onClick={() => setLocale(otherLocale)}>
          <T id={otherLocale} />
        </Button>
        {/* a "Typography" composant with ready to use variants */}
        <Typography variant="display-1">
          <T id="title" />
        </Typography>
        {/* The "SearchInput" component */}
        <SearchInput
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          ref={searchInputRef}
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
