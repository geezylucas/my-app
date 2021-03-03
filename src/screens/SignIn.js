import React, { useState } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import AnyAlert from "../components/AnyAlert";

const SignIn = (props) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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
      await axios.post(
        "http://192.168.100.6:5000/api/user/authentication",
        {
          email: form.email,
          password: form.password,
        },
        {
          header: {
            "Content-Type": "application/json",
          },
        }
      );

      const { cookies } = props;
      cookies.set("user", form.email, { path: "/" }); // setting the cookie
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
            <h1>Iniciar Sesión</h1>
          </Card.Header>
          <Card.Body>
            <AnyAlert {...alertProps} handleClose={handleCloseAlert} />
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresar email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresar contraseña"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Ingresar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default withCookies(SignIn);
