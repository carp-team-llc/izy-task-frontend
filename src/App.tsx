import { Outlet } from "react-router-dom";
import Header from "./component/header/Header";
import Menu from "./component/menu/Menu";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#13172b]">
      <Header /> 
      <div className="flex flex-grow ">
        <Menu className="w-64 fixed  left-0 h-full bg-[#20263d ]" /> {/* Cố định menu */}
        <main className="ml-64 flex-grow p-4">  {/* Thêm margin-left để bù khoảng menu */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
