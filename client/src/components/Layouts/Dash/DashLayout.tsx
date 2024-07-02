import { Outlet } from "react-router-dom";
import { Grid, Content } from "./styles.ts";
import { MenuProvider } from "../../../hooks/useMenu.tsx";
import { Header } from "../../Header";
import { Menu } from "../../Menu";

export function DashLayout() {
  return (
    <Grid className="m-0 p-0 w-max">
      <MenuProvider>
        <Header />
        <Menu />
      </MenuProvider>
      <Content>
        <Outlet />
      </Content>
    </Grid>
  );
}
