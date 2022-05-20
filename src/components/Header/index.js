import React from 'react';
import { Button } from 'react-bootstrap';
import { AreaHeader } from './styled';
import logo from './brasao.png' 


const Header = () => {
  
  return (
    <AreaHeader>
      <img src={logo}/>
      <Button variant="success" >Entrar/Registrar</Button>
    </AreaHeader>
    
  );
}

export default Header;
