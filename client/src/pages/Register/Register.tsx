import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { object, string, TypeOf } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { empty } from '../../helpers';

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

export function PageRegister() {
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
    getValues,
    setValue,
    reset,
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const { auth, error: authError, signUp } = useAuth();

  if (auth.usuario) return <Navigate to="/user" />;

  const onSubmitHandler = async (data: IRegister) => {
    await signUp(data);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Registro de usuário</h2>
          <Form onSubmit={handleSubmit(onSubmitHandler)} className="p-4 border rounded shadow-sm bg-light">
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

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Registrar-se
              </Button>
            </div>
            <div className="d-grid mt-1">
              <Button variant="info" href="/login">
                Voltar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}