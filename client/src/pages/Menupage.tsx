import { useRef } from "react";
import { Advertisementbanner, CategoryChip, ItemCard } from "../components";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Menupage = () => {
  const categories = [
    { id: 1, name: "Default" },
    { id: 1, name: "Pizza" },
    { id: 2, name: "Burgers" },
    { id: 3, name: "Sushi" },
    { id: 4, name: "Pasta" },
    { id: 5, name: "Salads" },
    { id: 6, name: "Desserts" },
    { id: 7, name: "Drinks" },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo =
        direction === "left" ? scrollLeft - 200 : scrollLeft + 200;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-[#f1f1f2] min-h-screen">
      <h1 className="text-2xl text-center font-semibold px-4 pt-6 bg-primary-light pb-5 rounded-b-[50%]">
        Menu
      </h1>

      <div className="py-5 px-3">
        <h3>Today's Deal</h3>
        <Advertisementbanner />
      </div>

      <div className="flex justify-end gap-2 px-3 ">
        <button
          onClick={() => scroll("left")}
          className="font-medium active:opacity-50"
        >
          {" "}
          <ArrowLeft></ArrowLeft>
        </button>
        <button
          onClick={() => scroll("right")}
          className="font-medium active:opacity-50"
        >
          <ArrowRight></ArrowRight>
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 px-4 py-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
      >
        {categories.map((item) => (
          <div key={item.id} className="snap-center shrink-0">
            <CategoryChip name={item.name} />
          </div>
        ))}
      </div>

      <div className="px-3 py-5 flex flex-col items-center justify-between gap-4 bg-white  rounded-2xl">
        <div className="flex-1 min-w-full max-w-full">
          <input
            type="search"
            name="search"
            placeholder="Search products..."
            className="w-full px-2 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none transition-all  tracking-normal"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <label
              htmlFor="sortBy"
              className="text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              Sort By
            </label>
            <div className="relative">
              <select
                name="sortBy"
                id="sortBy"
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-black focus:border-transparent block w-full p-2.5 pr-10 outline-none transition-all cursor-pointer hover:bg-gray-100"
              >
                <option value="">Default</option>
                <option value="sale">Today's Sale</option>
                <option value="top-rated">Top Rated</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center px-4 py-2 bg-blue-50 rounded-full">
            <span className="text-sm font-medium text-blue-700">
              Showing <span className="font-bold text-blue-900">50</span> items
            </span>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 px-3 py-5">
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
        <ItemCard></ItemCard>
      </div>
      <div className="py-5 px-3">
        <h3>Advertisement</h3>
        <Advertisementbanner />
      </div>
    </div>
  );
};

export default Menupage;
