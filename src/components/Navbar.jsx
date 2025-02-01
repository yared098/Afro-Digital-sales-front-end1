import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownSelection = (type) => {
    navigate(`/login?dash_type=${type}`);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="p-2 bg-[#00002eec]">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center">
          <a href="/">
            <img src="/Logo.png" alt="logo" className="rounded-full max-w-14"/>
          </a>
        </div>

        {/* Desktop Links */}
        <div className="hidden space-x-6 md:flex">
          <a href="/" className="text-white transition-all duration-300 hover:text-indigo-400">Home</a>
          <a href="/about" className="text-white transition-all duration-300 hover:text-indigo-400">About</a>
          <a href="/services" className="text-white transition-all duration-300 hover:text-indigo-400">Services</a>
          <a href="/contact" className="text-white transition-all duration-300 hover:text-indigo-400">Contact</a>
        </div>

        {/* "Get Started" Button with Dropdown */}
        <div className="relative flex items-center">
          <button
            onClick={toggleDropdown}
            className="px-6 py-2 ml-4 text-lg font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Get Started
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-2 top-12 p-5 bg-green-500 rounded-md shadow-xl z-50 
                             before:content-[''] before:absolute before:-top-3 before:left-1/2 
                            before:-translate-x-1/2 before:border-8 before:border-transparent 
                            before:border-b-green-500">
              <button
                onClick={() => handleDropdownSelection('sales_dashboard')}
                className="block w-full px-4 py-2 text-lg font-semibold text-white transition-all duration-300 border-b-4 border-transparent shadow-md hover:border-white hover:bg-green-600"
              >
                Sales
              </button>
              <button
                onClick={() => handleDropdownSelection('business_dashboard')}
                className="block w-full px-4 py-2 mt-2 text-lg font-semibold text-white transition-all duration-300 border-b-4 border-transparent shadow-md hover:border-white hover:bg-green-600"
              >
                Business
              </button>
              <button
                onClick={() => handleDropdownSelection('other_dashboard')}
                className="block w-full px-4 py-2 mt-2 text-lg font-semibold text-white transition-all duration-300 border-b-4 border-transparent shadow-md hover:border-white hover:bg-green-600"
              >
                Other
              </button>
            </div>
          )}


          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="p-4 space-y-4 text-white bg-[#00002E] md:hidden">
          <a href="/" className="block text-lg font-semibold transition-all duration-300 hover:text-indigo-400">Home</a>
          <a href="/about" className="block text-lg font-semibold transition-all duration-300 hover:text-indigo-400">About</a>
          <a href="/services" className="block text-lg font-semibold transition-all duration-300 hover:text-indigo-400">Services</a>
          <a href="/contact" className="block text-lg font-semibold transition-all duration-300 hover:text-indigo-400">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
