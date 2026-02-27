export function MovingBorderText() {
  return (
    <div className="relative overflow-hidden border border-red-500 rounded-xl bg-white/5 py-4">
      
      <div className="flex animate-marquee">
        {/* FIRST SET */}
        <div className="flex whitespace-nowrap min-w-full">
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
        </div>

        {/* DUPLICATE SET FOR SEAMLESS LOOP */}
        <div className="flex whitespace-nowrap min-w-full">
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
          <span className="mx-12 text-xl font-bold text-red-500">
            CONI NEWS
          </span>
        </div>
      </div>

    </div>
  );
}
