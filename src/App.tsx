import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Step1, Step2, Step3 } from "./pages";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Page } from "./common/const";
import { i18n } from "./locale/i18n";

const router = createBrowserRouter([
  {
    path: Page.Step1,
    element: <Step1 />,
  },
  {
    path: Page.Step2,
    element: <Step2 />,
  },
  {
    path: Page.Step3,
    element: <Step3 />,
  },
  {
    path: "*",
    element: <div>{i18n.t("error.pageNotFound")}</div>,
  },
]);

function App() {
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
