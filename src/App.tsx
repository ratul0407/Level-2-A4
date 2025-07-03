import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className=" font-montserrat ">
      <header>
        <Navbar />
      </header>
      <main className="pt-20 px-12">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
