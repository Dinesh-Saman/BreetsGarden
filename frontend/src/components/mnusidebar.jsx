import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaSignOutAlt,
  FaHome,
  FaUserPlus,
  FaClipboardList,
  FaClipboardCheck,
  FaFileAlt,
  FaCaretDown,
  FaCaretUp,
  FaPlusSquare,
  FaUtensils,
} from 'react-icons/fa';
import logo from '../Images/logo.png'; // Adjust the path if needed

// Styled components
const SidebarContainer = styled.div`
  width: 260px;
  height: 230vh;
  background: linear-gradient(135deg, #00bcd4, #ff5722); /* Gradient background */
  padding: 20px;
  flex-direction: column;
  color: #ecf0f1; /* Light text color */
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Add shadow for depth */
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 180px; 
  height: auto;
  margin-bottom: 10px;
`;

const Menu = styled.div`
  flex-grow: 1;
`;

const MenuSectionTitle = styled.h4`
  margin: 20px 0 0 0; /* Top margin only */
  color: #fff;
  cursor: pointer;
    font-size: 18px;
    margin-bottom: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 18px;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #34495e; /* Darker background on hover */
    color: #fff;
  }
`;

const Icon = styled.div`
  margin-right: 15px;
  font-size: 20px;
`;

const ExpandableMenu = styled.div`
  padding-left: 20px; 
  margin-bottom: 40px;
`;

const Sidebar = () => {
  const [isStaffMenuOpen, setStaffMenuOpen] = useState(true);
  const [isMenuManagementOpen, setMenuManagementOpen] = useState(true);

  return (
    <SidebarContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Hotel Logo" />
      </LogoContainer>

        {/* Menu Management Section */}
        <Menu>
        <MenuSectionTitle onClick={() => setMenuManagementOpen(!isMenuManagementOpen)}>
          Menu Management {isMenuManagementOpen ? <FaCaretUp /> : <FaCaretDown />}
        </MenuSectionTitle>
        {isMenuManagementOpen && (
          <ExpandableMenu>
            <Link to="/menu" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaTachometerAlt /></Icon>
                Dashboard
              </MenuItem>
            </Link>
            <Link to="/view-menu" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaUtensils /></Icon>
                View Menu
              </MenuItem>
            </Link>
            <Link to="/add-menu" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaPlusSquare /></Icon>
                Add Menu
              </MenuItem>
            </Link>
            <Link to="/menu-report" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <Icon><FaChartBar /></Icon>
                Menu Report
              </MenuItem>
            </Link>
          </ExpandableMenu>
        )}
      </Menu>


      {/* Home and Sign Out */}
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem>
          <Icon><FaHome /></Icon>
          Home
        </MenuItem>
      </Link>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <MenuItem>
          <Icon><FaSignOutAlt /></Icon>
          Sign Out
        </MenuItem>
      </Link>
    </SidebarContainer>
  );
};

export default Sidebar;
