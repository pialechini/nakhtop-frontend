import nakhtopLogo from '@/assets/header.png';
import { Link } from 'react-router';

function ProducerHome() {
  return (
    <div className="flex items-center justify-center">
      <div className="mt-6 bg-white rounded-2xl shadow-lg w-105 p-8 text-center">
        {/* Logo */}
        <div className="mx-auto mb-6 w-32 h-32 rounded-full bg-black flex items-center justify-center">
          <img src={nakhtopLogo} alt="Nakhtop Logo" className="h-16 w-auto" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 tracking-wide">
          پنل تولیدکنندگان
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-7 mb-6 font-bold">
          تبریک می‌گوییم!
          <br />
          شما می‌توانید در ترندیا با ایجاد حساب کاربری به بازار بزرگی به وسعت
          ایران دسترسی داشته باشید و محصولات خود را به صورت عمده یا تکی با حذف
          واسطه‌ها و با شرایط ویژه به فروش برسانید.
        </p>

        <p className="text-sm text-gray-600 leading-7 mb-6 font-bold">
          یکی از گزینه های زیر را انتخاب کنید
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <Link
            to="/login"
            className="block py-3 rounded-full border border-gray-300 text-gray-700 bg-[#F4F4F4] hover:bg-[#E9E9E9] transition"
          >
            ورود
          </Link>

          <Link
            to="/login"
            className="block py-3 rounded-full bg-black text-white hover:bg-gray-900 transition"
          >
            ثبت نام
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProducerHome;
