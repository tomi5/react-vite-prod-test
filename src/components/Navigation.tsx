import React from 'react';
import NavItem from './NavItem';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex space-x-8 py-4">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/articles">Artykuły</NavItem>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
