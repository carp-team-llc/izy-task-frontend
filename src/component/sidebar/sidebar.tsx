import React from "react";
import {Menu, menuClasses, MenuItem, MenuItemStyles, Sidebar} from 'react-pro-sidebar';
import {Link, NavLink} from 'react-router-dom';
import {SidebarHeader} from "./components/sidebarHeader.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBuildingUser, faFolder,
    faGear, faPeopleGroup,
    faPhone, faSquarePollVertical,
    faSuitcase
} from "@fortawesome/free-solid-svg-icons";

type SidebarAppProps = {
    setBroken: (value: boolean) => void,
    toggled: boolean,
    setToggled: (value: boolean) => void,
}

const SidebarApp = (props: SidebarAppProps) => {
    const {setBroken, setToggled, toggled} = props;
    const [collapsed, setCollapsed] = React.useState(false);

    const menuItemStyles: MenuItemStyles = {
        root: {
            fontSize: '18px',
            fontWeight: 700,
            border: 'none',
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: 'black',
            },
            '&:hover': {
                backgroundColor: 'rgba(5, 5, 31, 1)',
                color: '#6956E5',
            },

            [`&.active`]: {
                backgroundColor: 'rgba(5, 5, 31, 1)',
                color: '#6956E5',
            },

        },
        label: ({open}) => ({
            fontWeight: open ? 600 : undefined,
        }),
    };

    return (
        <Sidebar
            collapsed={collapsed}
            toggled={toggled}
            onBackdropClick={() => setToggled(false)}
            onBreakPoint={setBroken}
            breakPoint="md"
            backgroundColor={'rgba(5, 5, 31, 1)'}
            rootStyles={{
                color: '#878787',
                border: 'none',
            }}
            className={'border-none'}
        >
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <SidebarHeader/>
                <div style={{flex: 1, marginBottom: '32px'}}>
                    <Menu menuItemStyles={menuItemStyles}>
                        <MenuItem
                            component={<NavLink to="/dashboard"/>}
                            icon={<FontAwesomeIcon icon={faSquarePollVertical}/>}
                        >
                            DashBoard
                        </MenuItem>
                        <MenuItem
                            component={<NavLink to="/teams"/>}
                            icon={<FontAwesomeIcon icon={faPeopleGroup}/>}
                        >
                            Teams
                        </MenuItem>
                        <MenuItem
                            component={<NavLink to="/employees"/>}
                            icon={<FontAwesomeIcon icon={faBuildingUser}/>}
                        >
                            Employees
                        </MenuItem>
                        <MenuItem
                            component={<NavLink to="/projects"/>}
                            icon={<FontAwesomeIcon icon={faSuitcase}/>}
                        >
                            Projects
                        </MenuItem>
                        <MenuItem
                            component={<NavLink to="/meetings"/>}
                            icon={<FontAwesomeIcon icon={faPhone}/>}
                        >
                            Meetings
                        </MenuItem>
                        <MenuItem
                            component={<NavLink to="/tasks"/>}
                            icon={<FontAwesomeIcon icon={faFolder}/>}
                        >
                            Tasks
                        </MenuItem>
                        <MenuItem
                            component={<NavLink to="/settings"/>}
                            icon={<FontAwesomeIcon icon={faGear}/>}
                        >
                            Settings
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </Sidebar>
    );
}

export default SidebarApp;
