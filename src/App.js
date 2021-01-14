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
import Alert from "react-bootstrap/Alert";
import { Fade } from "react-bootstrap";

const App = () => {
  const key = "26a7e327";
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);
  const [nominations, setNominations] = useState([]);
  const [checkNominated, setCheckNominated] = useState([]);

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
    if (nominations.length > 4) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    } else {
      setNominations([...nominations, movie]);
      if (movie.imdbID === id) {
        const obj = {
          isNominated: true,
          id: movie.imdbID,
        };
        setCheckNominated([...checkNominated, obj]);
      }
    }
    if (nominations.length === 4) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 5000);
    }
  };

  const onRemoveNominee = (id) => {
    const newNominations = [...nominations.filter((val) => val.imdbID !== id)];
    setNominations(newNominations);

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
          transition={Fade}
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
                        <ListGroup.Item
                          key={movie.imdbID}
                          className="list-item"
                        >
                          <Row>
                            <Col xs={12} lg={9}>
                              <p> {movie.Title}</p>
                            </Col>
                            <Col xs={12} lg={3}>
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
                                  onClick={() =>
                                    onNominate(movie, movie.imdbID)
                                  }
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
                        <ListGroup.Item
                          key={movie.imdbID}
                          className="list-item"
                        >
                          <Row>
                            <Col xs={12} lg={9}>
                              <p> {movie.Title}</p>
                            </Col>
                            <Col xs={12} lg={3}>
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
                    : null}
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
