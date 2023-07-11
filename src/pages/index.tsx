import { Authenticated } from "@refinedev/core";
import { AuthPage, ErrorComponent, ThemedLayoutV2 } from "@refinedev/mui";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Routes, Route, Outlet } from "react-router-dom";
import { ReposCreate, ReposEdit, ReposList, ReposShow } from "./repos";
import { Header } from "@/components/header";

interface indexProps {}

export function AllRoutes({}: indexProps) {
  return (
    <Routes>
      <Route
        element={
          <Authenticated fallback={<CatchAllNavigate to="/login" />}>
            <ThemedLayoutV2 Header={() => <Header sticky />}>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="repos" />} />
        <Route path="/repos">
          <Route index element={<ReposList />} />
          <Route path="create" element={<ReposCreate />} />
          <Route path="edit/:id" element={<ReposEdit />} />
          <Route path="show/:id" element={<ReposShow />} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route
          path="/login"
          element={
            <AuthPage
              type="login"
              formProps={{
                defaultValues: {
                  email: "info@refine.dev",
                  password: "refine-supabase",
                },
              }}
            />
          }
        />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route
          path="/forgot-password"
          element={<AuthPage type="forgotPassword" />}
        />
      </Route>
    </Routes>
  );
}
