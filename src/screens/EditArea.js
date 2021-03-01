import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import AnyAlert from "../components/AnyAlert";

const EditArea = () => {
  let { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ id: 0, name: "" });
  const [alertProps, setAlertProps] = useState({
    variant: "",
    title: "",
    body: "",
    show: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const result = await axios.get(
          `http://192.168.100.6:5000/api/area/${id}`
        );

        setForm({ id: result.data.id, name: result.data.name });
        setIsLoading(false);
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
  }, [id]);

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
      await axios.put(
        `http://192.168.100.6:5000/api/area/${id}`,
        {
          id: form.id,
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
        body: `Se editó ${form.name} correctamente.`,
        show: true,
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
    <div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Row className="justify-content-md-center">
          <Col lg={6}>
            <Card>
              <Card.Header>
                <h1>Editar Area</h1>
              </Card.Header>
              <Card.Body>
                <AnyAlert {...alertProps} handleClose={handleCloseAlert} />
                <Card.Title>Llene todos los campos requeridos</Card.Title>
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Ingresar nombre de area"
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Editar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default EditArea;
