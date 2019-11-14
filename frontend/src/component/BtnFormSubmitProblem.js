import React, { useState } from "react";
import { Modal, ButtonToolbar, Button, Form } from "react-bootstrap";
import axios from "axios";

function ModalFormSubmitProblem(props) {
  const [modalForm, setModalForm] = useState([]);
  //const [dbsent, setDBSent] = useState(true);

  const onSubmit = async event => {
    console.log("clieckeado");
    const res = await axios.post("http://localhost:4000/api/cards/", {
      ...modalForm,
      status: "Waiting"
    });
    console.log(res);
  };

  const onChangeHandler = event => {
    const { name, value } = event.target;
    //setDBSent(true);
    setModalForm({
      ...modalForm,
      [name]: value
    });
    console.log(modalForm);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Submit Your Problem or Idea.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            as="textarea"
            rows="3"
            name="content"
            placeholder="content"
            onChange={onChangeHandler}
          />
          <Button onClick={onSubmit}>Submit</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

function BtnSubmitProblem() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <ButtonToolbar>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Problem
      </Button>

      <ModalFormSubmitProblem
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}

export default BtnSubmitProblem;
