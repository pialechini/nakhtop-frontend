import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center flex-1">
      <div className="text-center py-20">
        <h1 className="text-8xl font-black text-gray-200">404</h1>
        <p className="mt-4 text-lg text-gray-600 font-medium">
          صفحه‌ای که دنبالش بودید پیدا نشد
        </p>
        <Link
          to="/"
          className="mt-8 inline-block bg-black text-white px-8 py-3 rounded-full text-sm"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
