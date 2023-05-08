import Link from "next/link";
import React from "react";
import { BsChevronDown } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";

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

const MobileMenu = ({
  showCatMenu,
  setShowCatMenu,
  setMobileMenu,
  category,
}) => {
  return (
    <ul className="flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-[calc(100vh-50px)] bg-white border-t text-black">
      {data.map((item) => {
        return (
          <React.Fragment key={item.id}>
            {!!item.subMenu ? (
              <>
                <li
                  className="flex flex-col py-3  p-3 border-b cursor-pointer relative"
                  onClick={() => setShowCatMenu(!showCatMenu)}
                >
                  <div className=" flex justify-between items-center">
                    {item.name}
                    <BsChevronDown />
                  </div>
                </li>

                {showCatMenu && (
                  <ul className="bg-black/[0.05]">
                    {category.map(({ attributes: c, id }) => (
                      <Link
                        key={id}
                        href={`/category/${c.slug}`}
                        onClick={() => {
                          setMobileMenu(false);
                          setShowCatMenu(false);
                        }}
                      >
                        <li className="py-4 px-8 border-t flex justify-between">
                          {c.name}
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
                  <li
                    className="py-2  p-3 border-b  cursor-pointer"
                    onClick={() => setMobileMenu(false)}
                  >
                    {item.name}
                  </li>
                </Link>
              </>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
};

export default MobileMenu;
