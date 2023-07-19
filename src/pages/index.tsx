import { Authenticated } from "@refinedev/core";
import { AuthPage, ErrorComponent, ThemedLayoutV2 } from "@refinedev/mui";
import {
  CatchAllNavigate,
  NavigateToResource,
  useDocumentTitle,
} from "@refinedev/react-router-v6";
import { Routes, Route, Outlet } from "react-router-dom";
import { ReposList, ReposShow } from "./repos";
import { Header } from "@/components/header";
import { GithubIcon } from "lucide-react";
import { HomePage } from "./home/HomePage";
import React from "react";

interface indexProps {}

export function AllRoutes({}: indexProps) {
  React.useEffect(() => {
    document.title = "Repos";
  }, []);
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
        <Route index element={<HomePage />} />

        <Route path="/repos">
          <Route index element={<ReposList />} />
          {/* <Route path="create" element={<ReposCreate />} />
          <Route path="edit/:id" element={<ReposEdit />} /> */}
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
            <div className="">
              <AuthPage
                type="login"
                // providers={[
                //   {
                //     name: "github",
                //     icon: <GithubIcon />,
                //     label: "Sign in with GitHub",
                //   },
                // ]}
                formProps={{
                  defaultValues: {
                    email: "info@refine.dev",
                    password: "info@refine.dev",
                  },
                }}
              />
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <AuthPage
              type="register"
              providers={[
                {
                  name: "github",
                  icon: <GithubIcon />,
                  label: "Sign in with GitHub",
                },
              ]}
            />
          }
        />
        <Route
          path="/forgot-password"
          element={<AuthPage type="forgotPassword" />}
        />
      </Route>
    </Routes>
  );
}
