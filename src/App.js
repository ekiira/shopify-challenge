import React, { useEffect, useState } from "react";
import "./App.css";

import search from "./assets/search.svg";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import { setNominees, getNominees, debounce } from "./utlis/utils";

const App = () => {
  const key = "26a7e327";
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);
  const [checkNominated, setCheckNominated] = useState([]);
  let nominees = getNominees();

  useEffect(() => {
    const getMovies = async () => {
      if (title) {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${title.trim()}`
        );
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
          setError(false);
        } else {
          setError(true);
          setMovies([]);
        }
      }
    };

    debounce(getMovies());
  }, [title]);

  const onNominate = (movie, id) => {
    if (nominees && nominees.length > 4) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
      if (!nominees) {
        nominees = [];
      }
      nominees.push(movie);
      setNominees(nominees);
      if (movie.imdbID === id) {
        const obj = {
          isNominated: true,
          id: movie.imdbID,
        };
        setCheckNominated([...checkNominated, obj]);
      }
    }
    if (nominees && nominees.length === 5) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
    }
  };

  const onRemoveNominee = (id) => {
    const newNominations = [...nominees.filter((val) => val.imdbID !== id)];
    setNominees(newNominations);
    const newbtn = [...checkNominated.filter((val) => val.id !== id)];
    setCheckNominated(newbtn);
  };
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      {showWarning ? (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowWarning(false)}
          className="text-center font-weight-bold nominee-alert"
        >
          Yay! You have made five nominations
        </Alert>
      ) : null}

      {showError ? (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setShowError(false)}
          className="text-center font-weight-bold nominee-alert"
        >
          Sorry, You can only select five nominees
        </Alert>
      ) : null}
      <div className="appWrapper">
        <Container>
          <div className="logo pt-5 pb-3">
            <h1 className="text-center logo-text">
              The Shoppies<span className="logo-img">.</span>
            </h1>
          </div>
          <h3 className="text-center">
            Movie awards for entrepreneurs
            <span className="logo-img">.</span>
          </h3>

          <p className="mt-3">
            Search for your favourite movies and nominate them.
            <br />
            <span className="note">NOTE: You can only nominate 5 movies</span>
          </p>
          <Card>
            <Card.Body>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <img
                      src={search}
                      alt="search-icon"
                      className="searchIcon"
                    />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputGroup>
            </Card.Body>
          </Card>
          <Row className="mt-5 pb-5">
            <Col xs={12} md={6}>
              <Card>
                <Card.Title className="my-3 mx-4">
                  {error ? `No results found for  "${title}"` : `Top Results`}
                </Card.Title>

                <ListGroup variant="flush" className="movieList">
                  {movies ? (
                    movies.map((movie, i) => (
                      <ListGroup.Item key={movie.imdbID} className="list-item">
                        <Row>
                          {movie.Poster === "N/A" ? (
                            <>
                              <Col xs={12} lg={8}>
                                <p className="font-weight-bold">
                                  {" "}
                                  {movie.Title}
                                  <br />
                                  <span className="font-weight-light">
                                    {movie.Year}
                                  </span>
                                </p>
                              </Col>
                            </>
                          ) : (
                            <>
                              <Col xs={4} lg={2}>
                                <img
                                  src={movie.Poster}
                                  className="movie-poster"
                                  alt="Movie Poster"
                                />
                              </Col>
                              <Col xs={8} lg={6}>
                                <p className="font-weight-bold">
                                  {" "}
                                  {movie.Title}
                                  <br />
                                  <span className="font-weight-light">
                                    {movie.Year}
                                  </span>
                                </p>
                              </Col>
                            </>
                          )}
                          <Col xs={12} lg={4} className="pt-3 pt-lg-0">
                            {checkNominated.length > 0 ? (
                              checkNominated.filter(
                                (check) => check.id === movie.imdbID
                              ).length === 1 ? (
                                <button className="nom-btn-disabled">
                                  Nominated
                                </button>
                              ) : (
                                <button
                                  className="nom-btn"
                                  onClick={(e) =>
                                    onNominate(movie, movie.imdbID, e)
                                  }
                                >
                                  Nominate
                                </button>
                              )
                            ) : (
                              <button
                                className="nom-btn"
                                onClick={() => onNominate(movie, movie.imdbID)}
                              >
                                Nominate
                              </button>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <p className="d-flex align-items-center justify-content-center h-100">
                      No Movies Yet
                    </p>
                  )}
                </ListGroup>
              </Card>
            </Col>
            <Col xs={12} md={6} className="pt-5 pt-md-0">
              <Card>
                <Card.Title className="my-3 mx-4">Nominations</Card.Title>

                <ListGroup variant="flush" className="movieList">
                  {nominees ? (
                    nominees.length > 0 ? (
                      nominees.map((movie) => (
                        <ListGroup.Item
                          key={movie.imdbID}
                          className="list-item"
                        >
                          <Row>
                            {movie.Poster === "N/A" ? (
                              <>
                                <Col xs={12} lg={8}>
                                  <p className="font-weight-bold">
                                    {" "}
                                    {movie.Title}
                                    <br />
                                    <span className="font-weight-light">
                                      {movie.Year}
                                    </span>
                                  </p>
                                </Col>
                              </>
                            ) : (
                              <>
                                <Col xs={4} lg={2}>
                                  <img
                                    src={movie.Poster}
                                    className="movie-poster"
                                    alt="Movie Poster"
                                  />
                                </Col>
                                <Col xs={8} lg={6}>
                                  <p className="font-weight-bold">
                                    {" "}
                                    {movie.Title}
                                    <br />
                                    <span className="font-weight-light">
                                      {movie.Year}
                                    </span>
                                  </p>
                                </Col>
                              </>
                            )}
                            <Col xs={12} lg={3} className="pt-3 pt-lg-0">
                              <button
                                className="rem-btn"
                                onClick={() => onRemoveNominee(movie.imdbID)}
                              >
                                Remove
                              </button>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <p className="d-flex align-items-center justify-content-center h-100">
                        No Nominees Yet
                      </p>
                    )
                  ) : (
                    <p className="d-flex align-items-center justify-content-center h-100">
                      No Nominees Yet
                    </p>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default App;
