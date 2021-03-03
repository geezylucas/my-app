import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const NavBar = () => (
  <header>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default NavBar;
