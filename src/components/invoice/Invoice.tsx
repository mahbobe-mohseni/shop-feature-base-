import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export default function Invoice({
  data,
  className,
}: {
  data: any;
  className?: string;
}) {
  const imageUrl = "/mnt/data/2034893d-1032-4a39-86c1-bb0442386ae6.png"; // local image path provided

  // Build rows to visually match the long empty table in the mock (20 rows)
  const tableRows = Array.from({ length: 20 }).map((_, i) => {
    const product = data?.products?.[i];

    return (
      <tr key={i} className="h-8">
        <td className="border px-2 text-center align-middle">{i + 1}</td>
        <td className="border px-2 align-middle">
          {product?.productId?.name ?? ""}
        </td>
        <td className="border px-2 text-center align-middle">
          {product?.quantity ?? ""}
        </td>
        <td className="border px-2 text-center align-middle">
          {product?.productId?.price?.toLocaleString() ?? ""}
        </td>
        <td className="border px-2 text-center align-middle">
          {product
            ? (product.productId?.price * product.quantity).toLocaleString()
            : ""}
        </td>
      </tr>
    );
  });

  const [factorDate, setFactorDate] = useState("");
  useEffect(() => {
    console.log(data);
    const orderData = new Date(data?.createdAt);
    const lastDate: any = dayjs(orderData)
      .calendar("jalali")
      .locale("fa")
      .format("YYYY/MM/DD");

    setFactorDate(lastDate);
  }, [data]);

  return (
    <div className="" dir="rtl">
      <div
        className={`min-w-lg max-w-6xl overflow-x-auto w-full bg-white shadow-lg print:shadow-none print:bg-white ${className}`}
      >
        {/* Header with background image on the right like the mock */}
        <div className="relative">
          <img
            src={imageUrl}
            alt="mock"
            className="w-full object-cover opacity-0 pointer-events-none select-none"
          />
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="text-sm">
                <div>
                  شماره: <span className="font-medium">65</span>
                </div>
                <div>
                  تاریخ: <span className="font-medium">{factorDate}</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-black">فاکتور خرید</div>
                <div className="text-2xl text-gray-600 mt-1"> جهان سایپا</div>
              </div>
              <div className="text-sm text-right">
                <div>
                  خریدار:
                  <span className="font-medium">
                    {data?.userId?.name ?? ""} {data?.userId?.family ?? ""}
                  </span>
                </div>

                <div>
                  تلفن:
                  <span className="font-medium">
                    {data?.userId?.phone ?? ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Table area */}
        <div className="p-4">
          <table className="w-full table-fixed border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-12 border p-2">ردیف</th>
                <th className="border w-[200px]">شرح کالا</th>
                <th className="w-24 border p-2">تعداد</th>
                <th className="w-32 border p-2">قیمت واحد</th>
                <th className="w-40 border p-2">قیمت کل</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>

          {/* Summary & payment area */}
          <div className="mt-4 flex justify-between items-start">
            <div className="w-1/2">
              <div className="border p-3">
                <div className="flex justify-between">
                  <div className="text-xs">نحوه تسویه:</div>
                  <div className="text-xs">
                    نقد ☐ &nbsp; چک ☐ &nbsp; نسیه ☐ &nbsp; کارتیخوان ☐
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                  <div className="col-span-1">تخفیف</div>
                  <div className="col-span-2">ریال</div>

                  <div>مالیات</div>
                  <div>ریال</div>

                  <div>عوارض</div>
                  <div>ریال</div>
                </div>
              </div>
            </div>

            <div className="w-1/2 text-left">
              <div className="border p-3">
                <div className="flex justify-between mb-2">
                  <div className="text-sm">
                    به حروف: {toPersianWords(data?.totalPrice ?? 0)}
                  </div>
                </div>

                <div className="text-sm">
                  به حروف: {toPersianWords(data?.totalPrice ?? 0)}
                </div>

                <div className="text-sm">
                  به حروف: {toPersianWords(data?.totalPrice)}
                </div>
              </div>
            </div>
          </div>

          {/* Footer small text */}
          <div className="mt-3 text-xs text-gray-600">
            <div>آدرس: تهران - خیابان مثال - مجتمع تجاری</div>
            <div>تلفن: 021-xxxxxxx</div>
          </div>

          {/* Print button */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded print:hidden"
            >
              چاپ فاکتور
            </button>
          </div>
        </div>
      </div>

      {/* Print styles inline so they are included when component is copied */}
      <style jsx>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}

// Helper: convert number to Persian words (very small/simple implementation)
function toPersianWords(num: any) {
  if (!num) return "صفر ریال";
  try {
    const parts = num.toString().split(":");
  } catch (e) { }
  // For this mock we'll return a placeholder in Persian
  return `${numberWithCommas(num)} ریال`;
}

function numberWithCommas(x: any) {
  if (typeof x !== "number") return x;
  return x.toLocaleString("fa-IR");
}
