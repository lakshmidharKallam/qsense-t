import { useEffect, useState, FC } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
interface User {
  name: string;
  role: string;
}

const Navbar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const isSelected = (path: string): boolean => location.pathname.startsWith(path);

  const handleLogout = async (): Promise<void> => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const userData: User | null = loggedInUser ? JSON.parse(loggedInUser) : null;

    if (userData?.name) {
      try {
        const response = await fetch('/frontend/frontend/api/write-login-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: userData.name,
            action: 'logout' as const,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error sending logout status:', error);
      }
    }

    sessionStorage.removeItem('loggedInUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="navbar flex flex-row items-start pt-5 largescreen:pt-10 justify-between h-[150px] -mb-20 largescreen:-mb-36 text-black largescreen:h-[300px] bg-[#153d78]">
      <div className="left flex items-center mx-10 largescreen:ml-24 gap-4">
        <div className="logo">
          {/* <img className="w-14 largescreen:w-20" src={logo} alt="Qsense logo" /> */}
        </div>
        <div className="text-white heading name text-5xl largescreen:text-8xl font-semibold">
          Qsense
          <span className="text-3xl pl-2 largescreen:text-6xl largescreen:pl-5">
            Closed Loop Control
          </span>
        </div>
      </div>
      <div className="right hidden md:flex items-center mx-20 largescreen:mr-28 text-white">
        <ul className="flex items-center gap-7">
          <li
            className={`${
              isSelected('/model')
                ? 'border-white border-2 largescreen:border-4 p-2 px-4 rounded-full'
                : 'p-4'
            } largescreen:py-3`}
          >
            <Link to="/model">Model</Link>
          </li>
          <li
            className={`${
              isSelected('/savings')
                ? 'border-white border-2 largescreen:border-4 p-2 px-4 rounded-full'
                : 'p-4'
            } largescreen:py-3`}
          >
            <Link to="/savings">Savings</Link>
          </li>
          {user?.role === 'admin' && (
            <li
              className={`${
                isSelected('/admin')
                  ? 'border-white border-2 largescreen:border-4 p-2 px-4 rounded-full'
                  : 'p-4'
              } largescreen:py-3`}
            >
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <li>
            <Link onClick={handleLogout} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;