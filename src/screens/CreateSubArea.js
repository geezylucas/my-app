import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import AnyAlert from "../components/AnyAlert";

const CreateSubArea = () => {
  const [form, setForm] = useState({ name: "", areaId: "" });
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
        const result = await axios.get("http://192.168.100.6:5000/api/area");

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
        "http://192.168.100.6:5000/api/subarea",
        {
          name: form.name,
          areaId: form.areaId,
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

      setForm({ name: "", areaId: "" });
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
            <h1>Agregar Subárea</h1>
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
                  placeholder="Ingresar nombre de subárea"
                  required
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Seleccione una área</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      areaId: parseInt(e.target.value, 10),
                    })
                  }
                  value={form.areaId}
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

export default CreateSubArea;
