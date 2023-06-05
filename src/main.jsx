import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import TaskListContextProvider from "./contexts/TaskListContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { NewList } from "./routes/NewList.jsx";
import { List } from "./routes/List.jsx";
import { Home } from "./routes/home.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <TaskListContextProvider>
        <App />
      </TaskListContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new-list",
        element: <NewList />,
      },
      {
        path: "list/:listId",
        element: <List />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
