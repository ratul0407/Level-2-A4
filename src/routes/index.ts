import App from "@/App";
import { AddBook } from "@/pages/AddBook";
import { AllBooks } from "@/pages/AllBooks";
import { Home } from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-books",
        Component: AllBooks,
      },
      {
        path: "/create-book",
        Component: AddBook,
      },
    ],
  },
]);

export default router;
