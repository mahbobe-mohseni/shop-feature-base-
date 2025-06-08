import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 mt-12 border-t" dir="rtl">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* لوگو و توضیح */}
        <div>
          <h2 className="text-xl font-bold text-blue-600">نیسان‌یار</h2>
          <p className="mt-2 text-sm">
            همراه مطمئن شما در تهیه قطعات یدکی نیسان با بهترین کیفیت و مناسب‌ترین قیمت.
          </p>
        </div>

        {/* لینک‌های مفید */}
        <div>
          <h3 className="font-semibold mb-2">لینک‌های مفید</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/" className="hover:underline">صفحه اصلی</Link></li>
            <li><Link href="/about" className="hover:underline">درباره ما</Link></li>
            <li><Link href="/pricing" className="hover:underline">تعرفه‌ها</Link></li>
            <li><Link href="/contact" className="hover:underline">تماس با ما</Link></li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div>
          <h3 className="font-semibold mb-2">ما را دنبال کنید</h3>
          <div className="flex gap-4 justify-start">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-5 h-5 hover:text-blue-500 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 hover:text-blue-500 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 hover:text-blue-500 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* نوار پایینی */}
      <div className="text-center py-4 text-sm border-t dark:border-gray-800">
        © {new Date().getFullYear()} نیسان‌یار - تمام حقوق محفوظ است.
      </div>
    </footer>
  );
};

export default Footer;
