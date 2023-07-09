import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {notificationProvider,RefineSnackbarProvider} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {DocumentTitleHandler,UnsavedChangesNotifier,} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { useTranslation } from "react-i18next";
import { BrowserRouter} from "react-router-dom";
import authProvider from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { supabaseClient } from "./utility";
import { AllRoutes } from "./pages";
import { reposDataProvider } from "@/state/providers/repos/dataProvider";


function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={{
                default: dataProvider(supabaseClient),
                repos: reposDataProvider(),
              }}
              liveProvider={liveProvider(supabaseClient)}
              authProvider={authProvider}
              routerProvider={routerBindings}
              notificationProvider={notificationProvider}
              i18nProvider={i18nProvider}
              resources={[
              {
                  name: "repos",
                  list: "/repos",
                  create: "/repos/create",
                  edit: "/repos/edit/:id",
                  show: "/repos/show/:id",
                  meta: {
                    canDelete: true,
                    dataProviderName: "repos",
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}>
              <AllRoutes />

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
