import Button from '@/components/ui/button';
import { InputGroup, TextInput } from '@/components/ui/text-input';
import type { ProducerRegisterViewProps } from './producer-register.m';
import profileIcon from '@/assets/svgs/profile.svg';
import scanIcon from '@/assets/svgs/scan.svg';
import messageIcon from '@/assets/svgs/message.svg';
import categoryIcon from '@/assets/svgs/category.svg';
import { CustomSelect } from '@/components/ui/select/select.v';

export default function ProducerRegisterView({
  formik,
}: ProducerRegisterViewProps) {
  const errorEntries = Object.entries(formik.errors) as Array<[string, string]>;
  const visibleErrors =
    formik.submitCount > 0
      ? errorEntries
      : errorEntries.filter(([fieldName]) =>
          Boolean(formik.touched[fieldName as keyof typeof formik.touched])
        );
  const showFormErrors = visibleErrors.length > 0;

  return (
    <div className="flex items-center justify-center">
      <div
        className=" bg-white rounded-2xl shadow-lg w-full max-w-141.5 py-16 px-20 text-center"
        dir="rtl"
      >
        {/* Logo */}
        <div className="mx-auto w-32 h-32 rounded-full bg-black flex items-center justify-center">
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

        <h1 className="mt-6 text-[64px] font-bold font-morabba">مدیر تولیدی</h1>
        <p className="text-xl text-gray-700 font-iran mt-4">
          لطفا اطلاعات مربوط به مدیر تولیدی را وارد کنید
        </p>

        <form onSubmit={formik.handleSubmit} className="mt-8">
          <InputGroup>
            {/* First, Last Name */}
            <div className="flex">
              <TextInput
                containerClassName="flex-1/2"
                icon={profileIcon}
                placeholder="*نام"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoFocus
              />

              <div className="border-r border-border" />

              <TextInput
                containerClassName="flex-1/2"
                placeholder="نام خانوادگی"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            {/* National Code */}
            <TextInput
              className="text-left"
              placeholder="کد ملی*"
              name="national_code"
              dir="ltr"
              value={formik.values.national_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={10}
              icon={scanIcon}
            />

            {/* Birth */}
            <div className="flex">
              <span className="flex items-center justify-center px-4 text-[#333333] whitespace-nowrap">
                *تاریخ تولد:
              </span>
              <div className="border-border border-r"></div>
              <TextInput
                containerClassName="flex-1/3"
                name="birth_day"
                placeholder="روز"
                value={formik.values.birth_day}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                inputMode="numeric"
                maxLength={2}
              />
              <div className="border-border border-r"></div>
              <TextInput
                name="birth_month"
                placeholder="ماه"
                value={formik.values.birth_month}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                inputMode="numeric"
                maxLength={2}
                containerClassName="flex-1/3"
              />
              <div className="border-border border-r"></div>

              <TextInput
                name="birth_year"
                placeholder="سال"
                value={formik.values.birth_year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                inputMode="numeric"
                maxLength={4}
                containerClassName="flex-1/3"
              />
            </div>

            {/* Email */}
            <TextInput
              className="text-left"
              placeholder="ایمیل"
              name="email"
              dir="ltr"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              icon={messageIcon}
            />

            {/* Telehpone */}
            <TextInput
              className="text-left"
              placeholder="تلفن ثابت محل سکونت"
              name="landline_phone"
              dir="ltr"
              value={formik.values.landline_phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </InputGroup>

          <InputGroup className="mt-4">
            <CustomSelect
              placeholder="دسته تولیدی"
              disabled={false}
              name="parcel_code"
              value={formik.values.parcel_code}
              onChange={(value) => {
                // Handle both string and event
                if (typeof value === 'string') {
                  formik.setFieldValue('parcel_code', value);
                }
              }}
              onBlur={formik.handleBlur}
              icon={categoryIcon}
              options={[
                { label: 'تولیدی پوشاک', value: 'تولیدی پوشاک' },
                {
                  label: 'تولیدی تجهیزات صنعتی',
                  value: 'تولیدی تجهیزات صنعتی',
                },
                { label: 'تولیدی نساجی', value: 'تولیدی نساجی' },
                {
                  label: 'تولیدی خدماتی (برش، دوخت)',
                  value: 'تولیدی خدماتی (برش، دوخت)',
                },
                {
                  label: 'خیاطی و تعمیرات لباس شخصی',
                  value: 'خیاطی و تعمیرات لباس شخصی',
                },
              ]}
            />
          </InputGroup>

          {/* Errors */}
          <div
            className={[
              'overflow-hidden transition-all duration-300 ease-out',
              showFormErrors
                ? 'max-h-80 opacity-100 translate-y-0 mt-3'
                : 'max-h-0 opacity-0 -translate-y-1 mt-0',
            ].join(' ')}
            aria-live="polite"
          >
            <ul className="bg-red-50 border border-red-200 rounded-xl p-3 text-right text-red-600 text-xs space-y-1">
              {visibleErrors.map(([fieldName, message]) => (
                <li
                  key={fieldName}
                  className="transition-all duration-300 ease-out opacity-100 translate-y-0"
                >
                  ⚠ {message}
                </li>
              ))}
            </ul>
          </div>
          {/* Submit */}
          <Button
            type="submit"
            className="w-full mt-8"
            loading={formik.isSubmitting}
            disabled={!formik.dirty || errorEntries.length > 0}
          >
            تایید و ادامه
          </Button>
        </form>
      </div>
    </div>
  );
}
