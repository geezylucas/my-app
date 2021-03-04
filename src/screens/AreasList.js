import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import AnyAlert from "../components/AnyAlert";

const AreasList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [area, setArea] = useState({ id: 0, name: "" });
  const [showDelete, setShowDelete] = useState(false);
  const [alertProps, setAlertProps] = useState({
    variant: "",
    title: "",
    body: "",
    show: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const result = await axios.get("http://192.168.100.6:5000/api/area");

      setData(result.data);
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

  const handleCloseAlert = () =>
    setAlertProps({
      variant: "",
      title: "",
      body: "",
      show: false,
    });

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (id, name) => {
    setArea({ id, name });
    setShowDelete(true);
  };

  const fetchDeleteArea = async () => {
    try {
      await axios.delete(`http://192.168.100.6:5000/api/area/${area.id}`);

      setAlertProps({
        variant: "success",
        title: "¡Bien hecho!",
        body: `Se eliminó ${area.name} correctamente.`,
        show: true,
      });

      fetchData();
    } catch (error) {
      setAlertProps({
        variant: "danger",
        title: "¡Ups! Algo salió mal",
        body: error.response.data,
        show: true,
      });
    } finally {
      handleCloseDelete();
    }
  };

  return (
    <div>
      <h1>Áreas</h1>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <AnyAlert {...alertProps} handleClose={handleCloseAlert} />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td className="actions-td">
                    <Button
                      className="actions-button"
                      variant="success"
                      as={Link}
                      to={`/editarea/${e.id}`}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowDelete(e.id, e.name)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar área</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar el registro {area.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={fetchDeleteArea}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AreasList;
