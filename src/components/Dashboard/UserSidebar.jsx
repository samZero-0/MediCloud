import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, ShoppingCart, User, Settings, Package, ChevronRight, ChevronLeft, CircleUserRound } from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation links with icons
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <CircleUserRound size={20}/> },
    // { name: 'Shop', path: '/shop', icon: <ShoppingCart size={20} /> },
    // { name: 'Customers', path: '/customers', icon: <User size={20} /> },
    // { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="fixed h-screen flex overflow-hidden">
      {/* Main sidebar */}
      <div 
        className={`bg-gray-800 text-white transition-all duration-300 flex flex-col 
                    ${isCollapsed ? 'w-16' : 'w-64'} h-full shadow-lg`}
      >
        {/* Logo and burger button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && <h2 className="text-xl font-bold">MediShop</h2>}
          <button onClick={toggleSidebar} className="rounded-md p-1.5 hover:bg-gray-700">
            {isCollapsed ? <Menu size={24} /> : <X size={24} />}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-grow py-4">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center py-2 px-4 hover:bg-gray-700 rounded-md mx-2
                             ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}`}
                >
                  <span>{item.icon}</span>
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer section */}
        <div className={`p-4 border-t border-gray-700 ${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              {/* <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div> */}

             <Link to='/'> <button className='btn'>Home</button></Link>
              {/* <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-400">admin@medishop.com</p>
              </div> */}
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
          )}
        </div>
      </div>

      {/* Collapse/expand button for smaller screens (only shown when sidebar is collapsed) */}
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="bg-gray-800 text-white p-1 absolute top-20 right-0 translate-x-1/2 rounded-full shadow-md"
          aria-label="Expand sidebar"
        >
          {/* <ChevronRight size={20} /> */}
        </button>
      )}
    </div>
  );
};

export default Sidebar;