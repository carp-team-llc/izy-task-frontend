import { Outlet } from "react-router-dom";
import Header from "./component/header/Header";
import Menu from "./component/menu/Menu";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#13172b]">
      <Header />
      <div className="flex flex-grow">
        <Menu className="w-64 fixed left-0 top-20  h-full bg-[#20263d]" />
        <main className="ml-64 flex-grow p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
