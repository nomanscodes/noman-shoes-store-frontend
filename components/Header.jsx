/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";
import Menu from "./Menu";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { BiMenuAltRight } from "react-icons/bi";
import MobileMenu from "./Mobilemenu";
import { VscChromeClose } from "react-icons/vsc";
import { featchDataFromApi } from "@/utils/api";
import { useSelector } from "react-redux";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [show, setShow] = useState("translate-y-0");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [category, setCetagory] = useState(null);

  const { cartItem } = useSelector((state) => state.cart);

  // console.log("cartItem", cartItem);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("-translate-y-[80px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    fetchCetagory();
  }, []);

  const fetchCetagory = async () => {
    const { data } = await featchDataFromApi("/api/cetagories?populate=*");
    setCetagory(data);
  };

  return (
    <>
      <header
        className={`w-full h-[50-px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}
      >
        <Wrapper className="h-[60px] flex items-center justify-between">
          <Link href={"/"}>
            <picture>
              <img src="/assets/logo.svg" className="w-24" alt="logo" />
            </picture>
          </Link>
          <Menu
            showCatMenu={showCatMenu}
            setShowCatMenu={setShowCatMenu}
            category={category}
          />
          {mobileMenu && (
            <MobileMenu
              setMobileMenu={setMobileMenu}
              setShowCatMenu={setShowCatMenu}
              showCatMenu={showCatMenu}
              category={category}
            />
          )}

          <div className=" flex items-center gap-2 text-black">
            <div className=" w-8 md:w-12 h-8 md:h-12 rounded-full flex items-center justify-center hover:bg-black/[0.5] duration-300 cursor-pointer relative">
              <IoMdHeartEmpty className="text-[25px]" />
              <div className=" h-[14px] md:h-[18px] min-w-[18px] rounded-full bg-black absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-1.5">
                51
              </div>
            </div>
            <Link href={"/cart"}>
              <div className=" w-8 md:w-12 h-8 md:h-12 rounded-full flex items-center justify-center hover:bg-black/[0.5] duration-300 cursor-pointer relative">
                <BsCart className="text-[20px]" />
                {cartItem.length > 0 && (
                  <div className=" h-[14px] md:h-[18px] min-w-[18px] rounded-full bg-black absolute top-1 left-5 md:left-7 text-white text-[10px] md:text-[12px] flex justify-center items-center px-[2px] md:px-1.5">
                    {cartItem?.length}
                  </div>
                )}
              </div>
            </Link>
            <div className="md:hidden w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/[0.5] duration-300 cursor-pointer relative">
              {mobileMenu ? (
                <>
                  <VscChromeClose
                    className="text-[23px]"
                    onClick={() => setMobileMenu(false)}
                  />
                </>
              ) : (
                <>
                  <BiMenuAltRight
                    className="text-[23px]"
                    onClick={() => setMobileMenu(true)}
                  />
                </>
              )}
            </div>
          </div>
        </Wrapper>
      </header>
    </>
  );
};

export default Header;
