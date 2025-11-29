export function OrderSkeleton() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 rtl border border-border rounded-lg" dir="rtl">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-24 h-6 bg-muted rounded animate-pulse" />
          <div className="w-16 h-8 bg-blue-500 rounded animate-pulse" />
        </div>
        <div className="w-8 h-8 bg-muted rounded animate-pulse" />
      </div>

      {/* Stats Section Skeleton */}
      <div className="grid grid-cols-4 gap-4 mb-8 pb-6 border-b border-border">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-5 h-5 bg-muted rounded animate-pulse" />
              <div className="w-6 h-6 bg-muted rounded animate-pulse" />
            </div>
            <div className="w-12 h-8 bg-muted rounded mx-auto mb-2 animate-pulse" />
            <div className="w-16 h-4 bg-muted rounded mx-auto animate-pulse" />
          </div>
        ))}
      </div>

      {/* Products Title Skeleton */}
      <div className="mb-4">
        <div className="w-40 h-6 bg-muted rounded animate-pulse" />
      </div>

      {/* Product Items Skeleton */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-border"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
              <div className="flex-1">
                <div className="w-32 h-5 bg-muted rounded mb-2 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center gap-4 gap-x-reverse">
              <div className="flex gap-2">
                <div className="w-12 h-6 bg-blue-500 rounded animate-pulse" />
                <div className="w-12 h-6 bg-green-500 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
