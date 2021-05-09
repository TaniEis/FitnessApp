import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Row,
  Col
} from 'reactstrap';

const Navheader = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  var img = '../img/logo.png';


  const toggle = () => setIsOpen(!isOpen);

  return (
    <Row>
      <Col>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src="http://cdn.onlinewebfonts.com/svg/img_533631.png"></img><h2 className="logo-brand"><b>My Fitness</b></h2></NavbarBrand>
      </Navbar>
      </Col>
    </Row>
  );
}
export default Navheader;