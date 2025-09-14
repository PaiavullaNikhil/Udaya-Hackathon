const Header = () => {
  return (
    <>
      <header className="w-full flex justify-between items-center px-6 md:px-12 lg:px-20 py-4 bg-black/30 backdrop-blur-sm border-b border-orange-500/30 shadow-lg fixed top-0 left-0 z-30">
        {/* Left: College Info */}
        <div className="flex items-center gap-3">
          <img
            src="/DSCE.png"
            alt="College Logo"
            className="h-12 w-12 rounded-full border-2 border-orange-400 shadow-lg shadow-orange-500/50"
          />
          <div className="flex flex-col">
            <h2 className="text-base md:text-lg font-bold text-orange-300">
              DAYANANDA SAGAR COLLEGE OF ENGINEERING
            </h2>
            <p className="text-sm md:text-base text-gray-300">
              Dept. of Computer Science & Design
            </p>
          </div>
        </div>

        {/* Right: Sponsors */}
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm font-semibold hidden md:block">
            Powered by:
          </span>
          <img src="/DERBI.png" alt="DERBI" className="h-8 md:h-10" />
          <img src="/SAGAR.png" alt="Sagar Hospitals" className="h-8 md:h-10" />
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-24 md:h-28 lg:h-32"></div>
    </>
  );
};

export default Header;
