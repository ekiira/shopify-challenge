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
  const result = "ddd";

  const list = [
    "Lorem ipsum is placeholder text commonly used in the graphic, print",
    "two",
    "three",
    "Lorem ipsum is placeholdeublishing industries for previewing layouts and visual mockups.",

    "four",
    "Lorem ipsum is placeholdeublishing industries for previewing layouts and visual mockups.",
  ];

  const nom = [
    "Lorem ipsum is placeholder text commonly used in the graphic, print",
    "two",
    "three",
    "Lorem ipsum is placeholdeublishing industries for previewing layouts and visual mockups.",
    "four",
  ];
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
                  <FormControl />
                </InputGroup>
              </div>
            </form>
          </Card.Body>
        </Card>
        <Row className="mt-5 pb-5">
          <Col xs={12} md={6}>
            <Card>
              <Card.Title className="my-3 mx-4">
                {`Results from  "${result}"`}
              </Card.Title>

              <ListGroup variant="flush" className="">
                {list.map((li, i) => (
                  <ListGroup.Item key={i} className="list-item">
                    <Row>
                      <Col xs={12} lg={9}>
                        <p> {li}</p>
                      </Col>
                      <Col xs={12} lg={3}>
                        <button className="nom-btn">Nominate</button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col xs={12} md={6} className="pt-5 pt-md-0">
            <Card>
              <Card.Title className="my-3 mx-4">Nominations</Card.Title>

              <ListGroup variant="flush" className="">
                {nom.map((li, i) => (
                  <ListGroup.Item key={i} className="list-item">
                    <Row>
                      <Col xs={12} lg={9}>
                        <p> {li}</p>
                      </Col>
                      <Col xs={12} lg={3}>
                        <button className="rem-btn">Remove</button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
