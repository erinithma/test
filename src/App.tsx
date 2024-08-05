import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Step1, Step2, Step3 } from "./pages/steps";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/test/",
    element: <Step1 />,
  },
  {
    path: "/test/2",
    element: <Step2 />,
  },
  {
    path: "/test/3",
    element: <Step3 />,
  },
  {
    path: "*",
    element: <div>Страница не найдена</div>,
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
