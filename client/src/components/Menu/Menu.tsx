import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../hooks/useMenu';
import { Image } from '../Image/';
import { MenuContainer } from './styles';

export function Menu() {
  const navigate = useNavigate();
  const { toggleState } = useMenu();

  return (
    <MenuContainer className={toggleState ? 'active' : ''}>
      <div className="m-2">
        <Image src="koredata.jpg" alt="Koredata" width={100} />
      </div>
      <Button onClick={() => navigate('/user')}>Usuários</Button>
    </MenuContainer>
  );
}

export default Menu;
