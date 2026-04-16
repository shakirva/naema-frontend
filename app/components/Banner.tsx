import {
  FiPhone,
  FiMail,
  FiSearch,
  FiUser,
  FiShoppingCart,
} from "react-icons/fi";

const Banner = () => {
  return (
    <div className="w-full bg-sand text-black text-[12px] relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Left */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <FiPhone size={20} />
            <span>Call Us</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <FiMail size={20} />
            <span>Email us</span>
          </div>
        </div>

        {/* Center */}
        <div className="text-[16px] font-medium  tracking-tight absolute left-1/2 top-1/2 -translate-1/2">
          Free express shipping for orders above $199
        </div>

        {/* Right */}

        <div className="flex items-center gap-6">
          <FiSearch size={20} className="cursor-pointer" />
          <FiUser size={20} className="cursor-pointer" />
          <FiShoppingCart size={20} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
