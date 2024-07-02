import React, { useEffect, useState } from 'react';
import { TableList } from "../../../components/TableList";
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { User, getUsers } from '../../../services/api';
import { Loading } from '../../../components/Loading';

export const PageDashUserList = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        setRows(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, []);

  if (!rows.length) {
    return <Loading />;
  }

  const handleAddProduct = () => {
    navigate('/user/add');
  }

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <h2>Listagem de usuários</h2>
        </Col>
        <Col md="auto">
          <Button onClick={handleAddProduct} variant="success" size="sm">
            Adicionar usuário
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <TableList rows={rows} />
      </Row>
    </div>
  );
};
