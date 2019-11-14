import React from "react";
import { Card, Button } from "react-bootstrap";

function StatusCard(props) {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Text className="cardText">{props.content}</Card.Text>
        <div className="center cardButton">
          <Button onClick={props.delete} variant="danger">
            Delete
          </Button>
          {!props.btnStatus ? (
            <Button onClick={props.boardStateHandler}>Resolve</Button>
          ) : (
            ""
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StatusCard;
