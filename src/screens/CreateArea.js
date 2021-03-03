import React, { useState } from "react";
import axios from "axios";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import AnyAlert from "../components/AnyAlert";

const CreateArea = () => {
  const [form, setForm] = useState({ name: "" });
  const [alertProps, setAlertProps] = useState({
    variant: "",
    title: "",
    body: "",
    show: false,
  });

  const handleCloseAlert = () =>
    setAlertProps({
      variant: "",
      title: "",
      body: "",
      show: false,
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.100.6:5000/api/area",
        {
          name: form.name,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );

      setAlertProps({
        variant: "success",
        title: "¡Bien hecho!",
        body: `Se agregó ${response.data.name} correctamente.`,
        show: true,
      });

      setForm({ name: "" });
    } catch (error) {
      setAlertProps({
        variant: "danger",
        title: "¡Ups! Algo salió mal",
        body: error.response.data,
        show: true,
      });
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col lg={6}>
        <Card>
          <Card.Header>
            <h1>Agregar Área</h1>
          </Card.Header>
          <Card.Body>
            <AnyAlert {...alertProps} handleClose={handleCloseAlert} />
            <Card.Title>Llene todos los campos requeridos</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ingresar nombre de área"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Agregar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CreateArea;
