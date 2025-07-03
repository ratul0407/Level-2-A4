import App from "@/App";
import { AllBooks } from "@/pages/AllBooks";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: AllBooks,
      },
    ],
  },
]);

export default router;
