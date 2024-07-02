import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { empty } from '../../../helpers';
import { useForm } from 'react-hook-form';
import { TypeOf, object, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../../hooks/useAuth';

const registerSchema = object({
  senha: string()
    .min(1, 'Senha é obrigatório')
    .min(4, 'Senha tem que ter mais de 4 caracteres')
    .max(32, 'Senha tem que ter menos de 32 caracteres'),
  nome: string().min(2, 'Nome é obrigatório'),
  email: string().min(1, 'Email é obrigatório').email('Email inválido'),
  data_nascimento: string(),
});

type IRegister = TypeOf<typeof registerSchema>;

export const PageDashUserForm = () => {
  const navigate = useNavigate();

  const defaultValues: IRegister = {
    nome: '',
    email: '',
    senha: '',
    data_nascimento: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const { error: authError, createUser } = useAuth();

  const onSubmitHandler = async (data: IRegister) => {
    await createUser(data);
  };
  
  const handleBack = () => {
    navigate('/user');
  }

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <h2>Registro de usuário</h2>
        </Col>
        <Col md="auto">
          <Button onClick={() => handleBack()} variant="success" size="sm">
            Voltar
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form onSubmit={handleSubmit(onSubmitHandler)} className="p-4">
          <Form.Group controlId="formNome" className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o usuário"
              {...register('nome')}
              isInvalid={!!errors.nome}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nome?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite o e-mail"
              {...register('email')}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formSenha" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite a senha"
              {...register('senha')}
              isInvalid={!!errors.senha}
            />
            <Form.Control.Feedback type="invalid">
              {errors.senha?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formDateOfBirth" className="mb-3">
            <Form.Label>Data de aniversário</Form.Label>
            <Form.Control
              type="date"
              {...register('data_nascimento')}
              isInvalid={!!errors.data_nascimento}
            />
            <Form.Control.Feedback type="invalid">
              {errors.data_nascimento?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {!empty(authError.error) && (
            <p
              style={{ color: "red", marginTop: "10px" }}
            >
              {authError?.error as string}
            </p>
          )}

          <div>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
};
