import Button from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import type { ProducerRegisterViewProps } from './producer-register.m';

export default function ProducerRegisterView({
  formik,
}: ProducerRegisterViewProps) {
  return (
    <div className="flex items-center justify-start">
      <div
        className=" bg-white rounded-2xl shadow-lg w-full max-w-105 p-8 text-center"
        dir="rtl"
      >
        <div className="mx-auto mb-6 w-32 h-32 rounded-full bg-black flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="h-16 w-16"
            aria-hidden="true"
            fill="none"
          >
            <circle cx="12" cy="8" r="4" fill="#D5E86A" />
            <path
              d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6"
              fill="#FFFFFF"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
          </svg>
        </div>

        <h1 className="mt-2 text-5xl font-extrabold">مدیر تولیدی</h1>
        <p className="text-lg text-gray-700 mt-4 font-medium">
          لطفا اطلاعات مربوط به مدیر تولیدی را وارد کنید
        </p>

        <form onSubmit={formik.handleSubmit} className="">
          <div className="grid grid-cols-2 gap-2">
            <TextInput
              placeholder="نام"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextInput
              placeholder="نام خانوادگی"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <TextInput
            placeholder="کد ملی"
            name="national_code"
            dir="ltr"
            value={formik.values.national_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            maxLength={10}
          />

          <div className="grid grid-cols-3 gap-2">
            <select
              name="birth_year"
              value={formik.values.birth_year}
              onChange={formik.handleChange}
              className="w-full bg-gray-100 rounded-xl py-3 px-4 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">سال</option>
              {Array.from({ length: 70 }, (_, idx) => 1405 - idx).map(
                (year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                )
              )}
            </select>
            <select
              name="birth_month"
              value={formik.values.birth_month}
              onChange={formik.handleChange}
              className="w-full bg-gray-100 rounded-xl py-3 px-4 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">ماه</option>
              {Array.from({ length: 12 }, (_, idx) => idx + 1).map((month) => (
                <option key={month} value={String(month)}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="birth_day"
              value={formik.values.birth_day}
              onChange={formik.handleChange}
              className="w-full bg-gray-100 rounded-xl py-3 px-4 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">روز</option>
              {Array.from({ length: 31 }, (_, idx) => idx + 1).map((day) => (
                <option key={day} value={String(day)}>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <TextInput
            placeholder="ایمیل"
            name="email"
            dir="ltr"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextInput
            placeholder="تلفن ثابت محل سکونت"
            name="landline_phone"
            dir="ltr"
            value={formik.values.landline_phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <TextInput
            placeholder="بسته تولیدی"
            name="parcel_code"
            value={formik.values.parcel_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <Button
            type="submit"
            className="w-full "
            disabled={!formik.isValid || !formik.dirty}
          >
            تایید و ادامه
          </Button>
        </form>
      </div>
    </div>
  );
}
