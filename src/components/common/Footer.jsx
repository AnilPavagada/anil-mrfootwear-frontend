
const Footer = () => {
  return (
    <footer className="w-full bg-[#111111] text-gray-400">
      <div className="w-full max-w-7xl mx-auto px-4 py-6">

        <div className="flex flex-col items-center justify-center text-center gap-2">

          {/* Brand Name */}
          <h2 className="text-white text-lg font-bold tracking-[3px]">
            MR FOOTWEAR
          </h2>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-400 font-normal tracking-wide">
            © {new Date().getFullYear()} MR FOOTWEAR. All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
