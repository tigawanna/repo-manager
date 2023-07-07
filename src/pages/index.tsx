import { Authenticated } from "@refinedev/core";
import {
  AuthPage,
  ErrorComponent,
    ThemedLayoutV2,
} from "@refinedev/mui";
import { CatchAllNavigate, NavigateToResource } from "@refinedev/react-router-v6";
import { Routes, Route, Outlet } from "react-router-dom";
import { BlogPostList, BlogPostCreate, BlogPostEdit, BlogPostShow } from "@/pages/blog-posts";
import { CategoryList, CategoryCreate, CategoryEdit, CategoryShow } from "@/pages/categories";
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
        }>
        <Route index element={<NavigateToResource resource="blog_posts" />} />
        <Route path="/blog-posts">
          <Route index element={<BlogPostList />} />
          <Route path="create" element={<BlogPostCreate />} />
          <Route path="edit/:id" element={<BlogPostEdit />} />
          <Route path="show/:id" element={<BlogPostShow />} />
        </Route>
        <Route path="/categories">
          <Route index element={<CategoryList />} />
          <Route path="create" element={<CategoryCreate/>} />
          <Route path="edit/:id" element={<CategoryEdit />} />
          <Route path="show/:id" element={<CategoryShow/>} />
        </Route>
        <Route path="*" element={<ErrorComponent />} />
      </Route>
      <Route
        element={
          <Authenticated fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }>
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
        <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
      </Route>
    </Routes>
  );
}
