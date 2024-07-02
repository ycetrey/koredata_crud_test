import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';

interface DashboardButtonProps {
  usuarioLogado: string;
  signOut: () => void;
}

export function DashboardButton({ usuarioLogado, signOut }: DashboardButtonProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const handleClose = () => setShow(false);
  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  return (
    <div>
      <DropdownButton
        id="dropdown-basic-button"
        title={`Bem vindo: ${usuarioLogado}`}
        show={show}
        onClick={handleClick}
        onToggle={() => setShow(!show)}
      >
        <Dropdown.Item onClick={handleSignOut}>Logout</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
