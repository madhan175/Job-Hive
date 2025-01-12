import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../components/utils/constants';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { MdMenu, MdClose } from 'react-icons/md';

// Navbar Component
const Navbar = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => setMenuOpened(!menuOpened);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    if (newTheme) {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            Job<span className="text-[#F83002]">Hive</span>
          </h1>
        </div>

        <div className="flex items-center gap-1 sm:gap-4">
          <ul className="hidden md:flex font-medium items-center gap-5 dark:text-white">
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {/* Dark Mode Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
          </button>

          {/* Mobile Menu */}
          {menuOpened
            ? <MdClose color="#000" onClick={() => toggleMenu(false)} className="visible md:invisible h-6 w-6 sm:h-8 sm:w-8 dark:text-white" />
            : <MdMenu color="#000" onClick={() => toggleMenu(true)} className="visible md:invisible h-6 w-6 sm:h-8 sm:w-8 dark:text-white" />
          }

          {menuOpened && (
            <ul className="flex flex-col items-start fixed top-16 right-8 p-12 bg-white dark:bg-gray-900 dark:text-white font-medium shadow-md w-64 transition-all duration-300 rounded-3xl gap-5">
              {user && user.role === 'recruiter' ? (
                <>
                  <li><Link to="/admin/companies">Companies</Link></li>
                  <li><Link to="/admin/jobs">Jobs</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/jobs">Jobs</Link></li>
                  <li><Link to="/browse">Browse</Link></li>
                </>
              )}
            </ul>
          )}

          {/* User authentication state */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="outline" className="h-8 w-16 sm:h-10 sm:w-20">Login</Button></Link>
              <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] h-8 w-16 sm:h-10 sm:w-20">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col items-center gap-4 p-4">
                  <h4 className="text-xl font-semibold dark:text-white">{user?.name}</h4>
                  <button onClick={logoutHandler} className="bg-red-500 text-white p-2 rounded-lg">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
