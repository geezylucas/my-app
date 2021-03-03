import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import AnyAlert from "../components/AnyAlert";

const CreateUser = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
    secondLastname: "",
    subAreaId: "",
  });
  const [select, setSelect] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://192.168.100.6:5000/api/subarea");

        setSelect(result.data);
      } catch (error) {
        setAlertProps({
          variant: "danger",
          title: "¡Ups! Algo salió mal",
          body: error.response.data,
          show: true,
        });
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.100.6:5000/api/user",
        {
          email: form.email,
          password: form.password,
          name: form.name,
          lastname: form.lastname,
          secondLastname: form.secondLastname,
          subAreaId: form.subAreaId,
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
        body: `Se agregó ${response.data.email} correctamente.`,
        show: true,
      });

      setForm({
        email: "",
        password: "",
        name: "",
        lastname: "",
        secondLastname: "",
        subAreaId: "",
      });
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
            <h1>Agregar Usuario</h1>
          </Card.Header>
          <Card.Body>
            <AnyAlert {...alertProps} handleClose={handleCloseAlert} />
            <Card.Title>Llene todos los campos requeridos</Card.Title>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Ingresar email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Ingresar contraseña"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ingresar nombre"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicLastname">
                <Form.Label>Apellido paterno</Form.Label>
                <Form.Control
                  type="text"
                  value={form.lastname}
                  onChange={(e) =>
                    setForm({ ...form, lastname: e.target.value })
                  }
                  placeholder="Ingresar apellido paterno"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicSecondLastname">
                <Form.Label>Apellido materno</Form.Label>
                <Form.Control
                  type="text"
                  value={form.secondLastname}
                  onChange={(e) =>
                    setForm({ ...form, secondLastname: e.target.value })
                  }
                  placeholder="Ingresar apellido materno"
                  required
                />
              </Form.Group>
              <Form.Group controlId="ControlSelect1">
                <Form.Label>Seleccione una subárea</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subAreaId: parseInt(e.target.value, 10),
                    })
                  }
                  value={form.subAreaId}
                  required
                >
                  <option value="" disabled>
                    ---
                  </option>
                  {select.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </Form.Control>
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

export default CreateUser;
