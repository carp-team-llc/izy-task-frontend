import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../header/Header.tsx";
import SidebarApp from "../sidebar/sidebar.tsx";

const Layout: React.FC = () => {
    const [broken, setBroken] = React.useState(false);
    const [toggled, setToggled] = React.useState(false);

    return (
        <div className=" flex h-screen">
            {/* Sidebar */}
            <SidebarApp toggled={toggled} setBroken={setBroken} setToggled={setToggled} />

            {/* Main content */}
            <main className=" w-full overflow-auto bg-[#0F0F35]">
                <div className="text-[#44596e]">
                    <div className="sticky top-0 left-0 z-10  w-f">
                        <Header broken={broken} toggled={toggled} setToggled={setToggled} />
                    </div>
                    <div className="mb-12 p-6">
                        <Outlet/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
