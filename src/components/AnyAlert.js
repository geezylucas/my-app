import React from "react";
import { Alert } from "react-bootstrap";

const AnyAlert = ({ variant, title, body, show, handleClose }) => {
  if (show) {
    return (
      <Alert variant={variant} onClose={handleClose} dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        {body}
      </Alert>
    );
  }

  return null;
};

export default AnyAlert;
