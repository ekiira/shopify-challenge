import React, { useEffect, useState } from "react";
import "./App.css";

import search from "./assets/search.svg";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

const App = () => {
  const key = "26a7e327";
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);
  const [nominations, setNominations] = useState([]);
  const [check, setCheck] = useState({
    isNominated: false,
    buttons: [],
  });

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

    getMovies();
  }, [title]);

  const onNominate = (movie, id) => {
    setNominations([...nominations, movie]);
    setCheck({
      ...check,
      isNominated: true,
      buttons: [...check.buttons, movie.imdbID],
    });
  };

  return (
    <div className="appWrapper">
      <Container className="">
        <div className="logo py-5">
          <h1 className="text-center logo-text">
            The Shoppies<span className="logo-img">.</span>
          </h1>
        </div>
        <Card>
          <Card.Body>
            <form>
              <div>
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
              </div>
            </form>
          </Card.Body>
        </Card>
        <Row className="mt-5 pb-5">
          <Col xs={12} md={6}>
            <Card>
              <Card.Title className="my-3 mx-4">
                {error ? `No results found for  "${title}"` : `Top Results`}
              </Card.Title>

              <ListGroup variant="flush" className="">
                {movies
                  ? movies.map((movie, i) => (
                      <ListGroup.Item key={movie.imdbID} className="list-item">
                        <Row>
                          <Col xs={12} lg={9}>
                            <p> {movie.Title}</p>
                          </Col>
                          <Col xs={12} lg={3}>
                            {check.isNominated ? (
                              check.buttons.filter(
                                (btn) => btn === movie.imdbID
                              ).length === 1 ? (
                                <button className="nom-btn-disabled">
                                  Nominated
                                </button>
                              ) : (
                                <button
                                  className="nom-btn"
                                  onClick={() =>
                                    onNominate(movie, movie.imdbID)
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
                  : null}
              </ListGroup>
            </Card>
          </Col>
          <Col xs={12} md={6} className="pt-5 pt-md-0">
            <Card>
              <Card.Title className="my-3 mx-4">Nominations</Card.Title>

              <ListGroup variant="flush" className="">
                {nominations.length > 0
                  ? nominations.map((movie) => (
                      <ListGroup.Item key={movie.imdbID} className="list-item">
                        <Row>
                          <Col xs={12} lg={9}>
                            <p> {movie.Title}</p>
                          </Col>
                          <Col xs={12} lg={3}>
                            <button className="rem-btn">Remove</button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))
                  : null}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
