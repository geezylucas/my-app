import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";
import AnyAlert from "../components/AnyAlert";

const UserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({ id: 0, email: "" });
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

      const result = await axios.get("http://192.168.100.6:5000/api/user");

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

  const handleShowDelete = (id, email) => {
    setUser({ id, email });
    setShowDelete(true);
  };

  const fetchDeleteUser = async () => {
    try {
      await axios.delete(`http://192.168.100.6:5000/api/user/${user.id}`);

      setAlertProps({
        variant: "success",
        title: "¡Bien hecho!",
        body: `Se eliminó ${user.email} correctamente.`,
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
      <h1>Usuarios</h1>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <>
          <AnyAlert {...alertProps} handleClose={handleCloseAlert} />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Email</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Subárea</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <tr key={i}>
                  <td>{e.email}</td>
                  <td>{e.name}</td>
                  <td>{e.lastname}</td>
                  <td>{e.secondLastname}</td>
                  <td>{e.subAreaName}</td>
                  <td>
                    <Button
                      variant="success"
                      as={Link}
                      to={`/edituser/${e.id}`}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleShowDelete(e.id, e.email)}
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
          <Modal.Title>Eliminar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar el registro {user.email}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={fetchDeleteUser}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
