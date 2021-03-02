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
            <NavDropdown title="Areas" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/createarea">
                Crear Área
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/areas">
                Lista de áreas
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Subareas" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/createsubarea">
                Crear Subárea
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/subareas">
                Lista de subáreas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
);

export default NavBar;
