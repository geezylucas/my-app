import React from "react";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";

const NavBar = (props) => {
  let email = props.cookies.get("user") || undefined;

  const signOut = () => {
    const { cookies } = props;
    cookies.remove("user");
  };

  return (
    <Navbar
      className="border-bottom box-shadow mb-3"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Test CRUD
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <NavDropdown title="Áreas" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/createarea">
                Crear área
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/areas">
                Lista de áreas
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Subáreas" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/createsubarea">
                Crear subárea
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/subareas">
                Lista de subáreas
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Usuarios" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/createuser">
                Crear usuario
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/users">
                Lista de usuarios
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {email && (
            <Navbar.Collapse className="justify-content-end">
              <Button variant="outline-info" onClick={signOut}>
                Cerrar sesión
              </Button>
            </Navbar.Collapse>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default withCookies(NavBar);
