import { Spinner } from 'react-bootstrap';

export function Loading() {
  return (
    <div className="d-flex justify-content-center mt-3">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Carregando...</span>
      </Spinner>
    </div>
  );
}
