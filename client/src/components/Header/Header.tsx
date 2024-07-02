import { useAuth } from '../../hooks/useAuth';
import { DashboardButton } from '../Buttons/DashboardButton';
import { HeaderContainer } from './styles';

export function Header() {
  const { auth, signOut } = useAuth();
  return (
    <HeaderContainer className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <img
        srcSet={`${auth.image}?w=20&fit=crop&auto=format&dpr=2 2x`}
        src={`${auth.image}?w=20&fit=crop&auto=format`}
        alt={auth.usuario}
        loading="lazy"
        className="rounded-circle"
      />
      <div className="text-center my-2">
        <DashboardButton signOut={signOut} usuarioLogado={auth.usuario} />
      </div>
    </HeaderContainer>
  );
}
