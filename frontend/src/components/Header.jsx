const Header = () => {
  return (
    <header className="w-full flex flex-col sm:flex-row justify-between items-center px-4 md:px-12 lg:px-20 py-3 sm:py-4 bg-black/30 backdrop-blur-sm border-b border-orange-500/30 shadow-lg gap-3 sm:gap-0">
      
      {/* Left: College Info + Department Logo */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
        
        {/* College Logo */}
        <img
          src="/DSCE.png"
          alt="College Logo"
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-orange-400 shadow-lg shadow-orange-500/50"
        />

        {/* College Name + Department Text */}
        <div className="flex flex-col">
          <h2 className="text-sm sm:text-base md:text-lg font-bold text-orange-300 leading-tight">
            DAYANANDA SAGAR COLLEGE OF ENGINEERING
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-300">
            Dept. of Computer Science & Design
          </p>
        </div>

        {/* Department Logo */}
        <img
          src="/recursion.png" // replace with your department logo
          alt="Department Logo"
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-orange-400 shadow-lg shadow-orange-500/50"
        />
      </div>

      {/* Right: Sponsors */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
        <span className="text-gray-400 text-xs sm:text-sm font-semibold hidden sm:block">
          Powered by:
        </span>
        <div className="flex items-center gap-2 sm:gap-4">
          <img src="/DERBI.png" alt="DERBI" className="h-6 sm:h-8 md:h-10" />
          <img src="/SAGAR.png" alt="Sagar Hospitals" className="h-6 sm:h-8 md:h-10" />
        </div>
      </div>
    </header>
  );
};

export default Header;
