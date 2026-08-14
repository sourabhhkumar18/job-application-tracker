import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
      <Link to="/" className="flex items-center gap-2 text-indigo-400 font-bold text-xl tracking-wide">
        <Briefcase className="w-6 h-6 text-indigo-500" />
        <span>JobTracker</span>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="flex items-center gap-2 text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg text-sm border border-slate-700">
              <User className="w-4 h-4 text-indigo-400" />
              <span>{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-lg text-sm font-medium transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-slate-300 hover:text-white px-3 py-1.5 text-sm font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;