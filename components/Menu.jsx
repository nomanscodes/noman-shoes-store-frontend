import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const Menu = ({ showCatMenu, setShowCatMenu, category }) => {
  return (
    <ul className=" hidden md:flex items-center gap-8 font-medium text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item.subMenu ? (
              <>
                <li
                  className="flex items-center gap-2 cursor-pointer relative"
                  onMouseEnter={() => setShowCatMenu(true)}
                >
                  {item.name}
                  <BsChevronDown />
                </li>

                {showCatMenu && (
                  <ul
                    className="bg-white absolute top-14 min-w-[250px] px-1 text-black shadow-2xl ml-6"
                    onMouseLeave={() => setShowCatMenu(false)}
                  >
                    {category.map(({ attributes: c, id }) => (
                      <Link key={id} href={`/category/${c?.slug}`}>
                        <li className="h-12 flex items-center justify-between px-3 hover:bg-black/[0] rounded-md">
                          {c?.name}
                          <span className=" opacity-50 text-sm">
                            {c?.products?.data?.length}
                          </span>
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <>
                <Link href={item.url}>
                  <li className=" cursor-pointer">{item.name}</li>
                </Link>
              </>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default Menu;
