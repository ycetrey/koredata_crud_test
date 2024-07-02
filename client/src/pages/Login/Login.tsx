import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "../../hooks/useAuth.ts";
import { empty } from '../../helpers/object-helper.ts';
import { Navigate } from 'react-router-dom';

export function PageLogin () {
  const { auth, error: authError, signIn } = useAuth();
  
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await signIn({ usuario, senha });
  };
  if (auth.usuario) return <Navigate to="/user" />;
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={4}>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
            <Form.Group controlId="formUsuario" className="mb-3">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entre com o usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSenha" className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </Form.Group>
            {!empty(authError.error) && (
              <p
                style={{ color: "red", marginTop: "10px" }}
              >
                {authError?.error as string}
              </p>
            )}
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
            <div className="d-grid mt-1">
              <Button variant="info" href="/register">
                Registre-se
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
