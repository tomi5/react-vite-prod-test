import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  return (
    <li>
      <Link to={to} className="text-gray-600 hover:text-blue-600 font-medium">
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
