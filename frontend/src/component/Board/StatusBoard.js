import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";

import Card from "./StatusCard";

function StatusBoard() {
  const [projectData, setProjectData] = useState([]);
  const [contentArea, setContentArea] = useState([]);

  useEffect(() => {
    fetchCards();
  }, []);

  function fetchCards() {
    fetch("http://localhost:4000/api/cards/")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setProjectData(data);
      });
  }

  const onSubmit = async event => {
    console.log("clieckeado");
    event.preventDefault();
    await axios.post("http://localhost:4000/api/cards/", {
      ...contentArea,
      status: "Waiting"
    });
    fetchCards();
    setContentArea({ content: "" });
  };

  const onChangeHandler = event => {
    const { name, value } = event.target;
    //setDBSent(true);
    setContentArea({
      ...contentArea,
      [name]: value
    });
    console.log(contentArea);
  };

  const deleteCard = async id => {
    await axios.delete("http://localhost:4000/api/cards/" + id);
    fetchCards();
  };

  const putCard = async data => {
    console.log(data);
    if (data.status === "InProgress") {
      const newCard = {
        content: data.content,
        status: "Finished",
        btnStatus: true
      };
      await axios.put("http://localhost:4000/api/cards/" + data._id, newCard);
      fetchCards();
    } else {
      const newCard = {
        content: data.content,
        status: "InProgress"
      };
      console.log(newCard);
      await axios.put("http://localhost:4000/api/cards/" + data._id, newCard);
      fetchCards();
    }
  };

  let projectFilterdWait = projectData.filter(
    project => project.status === "Waiting"
  );
  let projectFilterInPro = projectData.filter(
    project => project.status === "InProgress"
  );
  let projectFilterFin = projectData.filter(
    project => project.status === "Finished"
  );
  return (
    <Fragment>
      <div>
        <Form onSubmit={onSubmit} className="contentForm">
          <Form.Control
            as="textarea"
            rows="3"
            name="content"
            placeholder="content"
            onChange={onChangeHandler}
            value={contentArea.content}
          />
          <Button type="submit" className="ml-2">
            Submit
          </Button>
        </Form>
      </div>
      <Container>
        <Row>
          <Col id="Waiting" sm={4}>
            <h3>Waiting</h3>
            {projectFilterdWait.map(project => (
              <Card
                {...project}
                key={project._id}
                boardStateHandler={() => putCard(project)}
                delete={() => deleteCard(project._id)}
              />
            ))}
          </Col>
          <Col id="InProgress" sm={4}>
            <h3>InProgress</h3>
            {projectFilterInPro.map(project => (
              <Card
                {...project}
                key={project._id}
                boardStateHandler={() => putCard(project)}
                delete={() => deleteCard(project._id)}
              />
            ))}
          </Col>
          <Col id="Finished" sm={4}>
            <h3>Finished</h3>
            {projectFilterFin.map(project => (
              <Card
                {...project}
                key={project._id}
                boardStateHandler={() => putCard(project._id)}
                delete={() => deleteCard(project._id)}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default StatusBoard;
