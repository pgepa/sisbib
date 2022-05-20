import React from "react";
import {Button} from "bootstrap";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import styledComponents from "styled-components";
import { AreaHeader } from "./styled";

function Header(){
    return(
<div>
        <AreaHeader>
            <h1>Logo</h1>
            <Navbar expand="lg" variant="dark" className="navbar">
  
                <Navbar.Brand href="#home">Inicio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
        
            </Navbar>
            <button className="btn btn-success">Entrar/Registrar</button>
        </AreaHeader>
        1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1<br></br>1
    </div>

    );
}

export default Header;