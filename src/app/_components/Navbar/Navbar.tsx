"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../../assets/a.shrink-0.svg";
import { IoSearch, IoGift, IoMail, IoClose } from "react-icons/io5";
import {
  FaHeadphones,
  FaRegHeart,
  FaShoppingCart,
  FaUser,
  FaTruck,
  FaPhoneAlt,
  FaSignOutAlt,
  FaBars,
  FaCog,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { getAllCategories } from "@/services/Category.service";
import { Category } from "@/types/Products";
import { NumOfItems } from "@/Context/NumCartItemProvider";
import { NumOfWish } from "@/Context/NumWishItemProvider";

function UserDropdown({
  nameUser,
  onLogout,
}: {
  nameUser?: string | null;
  onLogout: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button onClick={() => setOpen((p) => !p)} className="focus:outline-none">
        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="h-10 w-10 rounded-full bg-homeGreen flex items-center justify-center cursor-pointer shadow-md shadow-homeGreen/30"
        >
          {nameUser ? (
            <span className="text-white text-sm font-bold uppercase select-none">
              {nameUser.charAt(0)}
            </span>
          ) : (
            <FaUser className="text-white text-xs" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 0.2,
                ease: [0.34, 1.2, 0.64, 1] as const,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: -8,
              transition: { duration: 0.15, ease: "easeIn" as const },
            }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-0 mt-2.5 w-52 rounded-2xl bg-white border border-[#E5E7EB] shadow-xl shadow-black/8 overflow-hidden z-50"
          >
            <div className="px-4 pt-4 pb-3 bg-linear-to-br from-homeGreen/6 to-transparent border-b border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-homeGreen flex items-center justify-center shrink-0 shadow shadow-homeGreen/30">
                  <span className="text-white text-sm font-bold uppercase select-none">
                    {nameUser?.charAt(0) ?? "U"}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-sm font-semibold text-secondary truncate">
                    {nameUser}
                  </p>
                  <p className="text-xs text-[#99A1AF]">My Account</p>
                </div>
              </div>
            </div>

            <div className="p-1.5 flex flex-col gap-0.5">
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary text-sm font-medium hover:bg-gray-50 hover:text-homeGreen transition-all duration-150 group"
                >
                  <div className="h-7 w-7 rounded-lg bg-gray-100 group-hover:bg-homeGreen/10 flex items-center justify-center transition-colors duration-150">
                    <FaUser className="text-[11px] text-[#99A1AF] group-hover:text-homeGreen transition-colors duration-150" />
                  </div>
                  Profile
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="/allorders"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary text-sm font-medium hover:bg-gray-50 hover:text-homeGreen transition-all duration-150 group"
                >
                  <div className="h-7 w-7 rounded-lg bg-gray-100 group-hover:bg-homeGreen/10 flex items-center justify-center transition-colors duration-150">
                    <FaTruck className="text-[11px] text-[#99A1AF] group-hover:text-homeGreen transition-colors duration-150" />
                  </div>
                  My Orders
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="/profile/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-secondary text-sm font-medium hover:bg-gray-50 hover:text-homeGreen transition-all duration-150 group"
                >
                  <div className="h-7 w-7 rounded-lg bg-gray-100 group-hover:bg-homeGreen/10 flex items-center justify-center transition-colors duration-150">
                    <FaCog className="text-[11px] text-[#99A1AF] group-hover:text-homeGreen transition-colors duration-150" />
                  </div>
                  Settings
                </Link>
              </motion.div>

              <div className="h-px bg-[#F3F4F6] mx-1 my-0.5" />

              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <button
                  onClick={() => {
                    setOpen(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-secondary hover:bg-red-50 hover:text-red-500 transition-all duration-150 group"
                >
                  <div className="h-7 w-7 rounded-lg bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors duration-150">
                    <FaSignOutAlt className="text-[11px] text-[#99A1AF] group-hover:text-red-400 transition-colors duration-150" />
                  </div>
                  Logout
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ALLOWED_SLUGS = [
  "men's-fashion",
  "women's-fashion",
  "beauty-and-health",
  "electronics",
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: Mydata, status } = useSession();
  const nameUser = Mydata?.user?.name;
  const isAuthenticated = status === "authenticated";
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [searchValue, setSearchValue] = React.useState("");
  const router = useRouter();

  const { itemsOfCart, setItemOfCart } = React.useContext(NumOfItems);
  const { itemsOfWish, setItemOfWish } = React.useContext(NumOfWish);

  React.useEffect(() => {
    getAllCategories().then((data) => {
      if (data) setCategories(data);
    });
  }, []);

  const filteredCategories = categories.filter((cat) =>
    ALLOWED_SLUGS.includes(cat.slug),
  );

  function handleSearch() {
    if (searchValue.trim() === "") return;
    router.push(`/search?keyword=${searchValue.trim()}`);
  }

  function Logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <NavigationMenu className="max-w-full mx-auto flex flex-col justify-center items-start sticky top-0 z-50 bg-white shadow-sm">
      <NavigationMenuList className="hidden lg:flex px-6 justify-between py-2.5 items-center border-b w-full">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <FaTruck className="text-homeGreen text-xs" />
            <p className="text-secondary font-medium text-[14px]">
              Free Shipping on Orders 500 EGP
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <IoGift className="text-homeGreen text-xs" />
            <p className="text-secondary font-medium text-[14px]">
              New Arrivals Daily
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 group/phone cursor-pointer">
              <FaPhoneAlt className="text-xs group-hover/phone:text-homeGreen duration-200 text-secondary" />
              <p className="text-[14px] group-hover/phone:text-homeGreen duration-200 font-medium text-secondary">
                +1 (800) 123-4567
              </p>
            </div>
            <div className="flex items-center group/mail cursor-pointer gap-1.5">
              <IoMail className="text-xs group-hover/mail:text-homeGreen duration-200 text-secondary" />
              <p className="text-[14px] group-hover/mail:text-homeGreen duration-200 font-medium text-secondary">
                support@freshcart.com
              </p>
            </div>
          </div>
          <div className="w-px bg-[#E5E7EB] h-4" />

          {isAuthenticated ? (
            <div className="flex gap-4 items-center">
              <div className="flex gap-1.5 items-center">
                <FaUser className="text-homeGreen text-xs" />
                <p className="text-secondary font-medium text-[14px]">
                  {nameUser}
                </p>
              </div>
              <div
                onClick={Logout}
                className="flex gap-1.5 cursor-pointer items-center group/signup"
              >
                <FaSignOutAlt className="text-secondary font-medium group-hover/signup:text-homeGreen duration-200 text-xs" />
                <p className="text-secondary font-medium group-hover/signup:text-homeGreen duration-200 text-[14px]">
                  Sign out
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link
                href="/login"
                className="flex gap-1.5 cursor-pointer items-center group/signin"
              >
                <FaUser className="text-secondary font-medium group-hover/signin:text-homeGreen duration-200 text-xs" />
                <p className="text-secondary font-medium group-hover/signin:text-homeGreen duration-200 text-[14px]">
                  Sign in
                </p>
              </Link>
            </div>
          )}
        </div>
      </NavigationMenuList>

      <NavigationMenuList className="flex px-4 lg:px-6 justify-between items-center py-3 w-full gap-3">
        <div className="shrink-0">
          <Image src={logo} alt="logo-design" />
        </div>

        <div className="relative w-full max-w-xl hidden lg:block">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for products, brands and more..."
            className="w-full h-11.5 rounded-full border-2 border-[#E5E7EB] bg-[#F9FAFB80] pt-3.25 pb-3.5 pl-5.25 pr-14 outline-none focus:border-homeGreen/60 transition-all duration-200"
          />
          <div
            onClick={handleSearch}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-homeGreen text-white flex items-center justify-center hover:bg-[#15803D] transition-all duration-200 cursor-pointer"
          >
            <IoSearch className="text-[14]" />
          </div>
        </div>

        <NavigationMenuLink
          render={
            <Link
              href="/"
              className={`hidden lg:block text-Links text-base! font-medium hover:text-homeGreen2 transition-colors duration-200 ${pathname === "/" ? "text-homeGreen" : "text-Links"}`}
            >
              Home
            </Link>
          }
        />
        <NavigationMenuLink
          render={
            <Link
              href="/shop"
              className={`hidden lg:block text-Links text-base! font-medium hover:text-homeGreen2 transition-colors duration-200 ${pathname === "/shop" ? "text-homeGreen" : "text-Links"}`}
            >
              Shop
            </Link>
          }
        />

        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`hidden lg:flex cursor-pointer text-Links text-base hover:bg-white! hover:text-homeGreen2 ${pathname === "/categories" ? "text-homeGreen" : "text-Links"}`}
          >
            <Link href="/categories">Categories</Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-50 gap-1">
              {filteredCategories.map((cat) => (
                <li key={cat._id}>
                  <NavigationMenuLink
                    render={
                      <Link
                        href={`/subcategory/${cat._id}`}
                        className="flex text-base! hover:text-homeGreen items-center gap-2"
                      >
                        {cat.name}
                      </Link>
                    }
                  />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuLink
          render={
            <Link
              href="/brands"
              className={`hidden lg:block p-0 text-Links text-base! font-medium hover:text-homeGreen2 transition-colors duration-200 ${pathname === "/brands" ? "text-homeGreen" : "text-Links"}`}
            >
              Brands
            </Link>
          }
        />

        <div className="flex items-center gap-2 shrink-0">
          <Link href={"/contact"} className="hidden lg:flex h-10 cursor-pointer group/contact items-center gap-2 pr-3 border-r border-[#E5E7EB]">
            <div className="h-10 w-10 rounded-full group-hover/contact:bg-gray-50 transition-all duration-200 bg-gray-100 items-center flex justify-center shrink-0">
              <FaHeadphones className="text-homeGreen" />
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-[#99A1AF] font-medium">Support</p>
              <p className="text-xs text-links font-semibold">24/7 Help</p>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href={"/wishlist"}
              className="cursor-pointer group/heart hidden lg:flex hover:bg-secondary/5 duration-200 rounded-full h-10 w-10 items-center justify-center relative"
            >
              <FaRegHeart className="text-[20px] duration-200 group-hover/heart:text-homeGreen2 text-secondary" />
              {itemsOfWish !== 0 && (
                <span className="absolute -top-1 -right-1 h-[17px] min-w-[17px] px-[3px] rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center ring-[1.5px] ring-white leading-none">
                  {itemsOfWish}
                </span>
              )}
            </Link>

            <Link
              href={"/cart"}
              className="hidden lg:flex cursor-pointer h-10 w-10 items-center justify-center group/cart hover:bg-secondary/5 duration-200 rounded-full relative"
            >
              <FaShoppingCart className="text-[20px] duration-200 group-hover/cart:text-homeGreen2 text-secondary" />
              {itemsOfCart !== 0 && (
                <span className="absolute -top-1 -right-1 h-[17px] min-w-[17px] px-[3px] rounded-full bg-homeGreen text-white text-[9px] font-bold flex items-center justify-center ring-[1.5px] ring-white leading-none">
                  {itemsOfCart}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <UserDropdown nameUser={nameUser} onLogout={Logout} />
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex rounded-full hover:bg-[#15803D] transition-all duration-200 cursor-pointer px-5 py-2.5 bg-homeGreen items-center gap-2"
              >
                <FaUser className="text-white text-xs" />
                <span className="text-[14px] text-white font-semibold">
                  Sign in
                </span>
              </Link>
            )}

            <Sheet>
              <SheetTrigger
                render={
                  <div className="flex lg:hidden h-10 w-10 rounded-full bg-homeGreen items-center justify-center cursor-pointer hover:bg-[#15803D] transition-all duration-200">
                    <FaBars className="text-white text-base" />
                  </div>
                }
              />
              <SheetContent
                showCloseButton={false}
                className="flex flex-col p-0 gap-0"
              >
                <SheetHeader className="flex flex-row items-center justify-between px-4 py-3 border-b">
                  <Image src={logo} alt="logo-design" />
                  <SheetClose
                    render={
                      <button className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200 cursor-pointer">
                        <IoClose className="text-secondary text-lg" />
                      </button>
                    }
                  />
                </SheetHeader>

                <div className="overflow-y-auto px-4 py-5 flex flex-col gap-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="Search for products , brands and more..."
                      className="w-full h-11 rounded-full border-2 border-[#E5E7EB] bg-[#F9FAFB80]
                         py-3 pl-5 pr-12 outline-none focus:border-homeGreen/60 transition-all duration-200 text-sm"
                    />
                    <div
                      onClick={handleSearch}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-homeGreen text-white flex items-center justify-center hover:bg-[#15803D] transition-all duration-200 cursor-pointer"
                    >
                      <IoSearch className="text-sm" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <Link
                      href="/"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-Links font-medium text-base hover:bg-gray-50 hover:text-homeGreen2 transition-all duration-200"
                    >
                      Home
                    </Link>
                    <Link
                      href="/shop"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-Links font-medium text-base hover:bg-gray-50 hover:text-homeGreen2 transition-all duration-200"
                    >
                      Shop
                    </Link>
                    <Link
                      href="/categories"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-Links font-medium text-base hover:bg-gray-50 hover:text-homeGreen2 transition-all duration-200"
                    >
                      Categories
                    </Link>
                    <Link
                      href="/brands"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-Links font-medium text-base hover:bg-gray-50 hover:text-homeGreen2 transition-all duration-200"
                    >
                      Brands
                    </Link>

                    {isAuthenticated ? (
                      <>
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                        >
                          <div className="h-8 w-8 rounded-full bg-homeGreen flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-bold uppercase">
                              {nameUser?.charAt(0) ?? "U"}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm font-semibold text-secondary">
                              {nameUser}
                            </p>
                            <p className="text-xs text-[#99A1AF]">Profile</p>
                          </div>
                        </Link>
                        <Link
                          href="/allorders"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200"
                        >
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <FaTruck className="text-secondary text-xs" />
                          </div>
                          <p className="text-sm font-medium text-secondary">
                            My Orders
                          </p>
                        </Link>

                        <Link
                          href="/profile/settings"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-200"
                        >
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <FaCog className="text-secondary text-xs" />
                          </div>
                          <p className="text-sm font-medium text-secondary">
                            Settings
                          </p>
                        </Link>
                        <div
                          onClick={Logout}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all duration-200 cursor-pointer group/signout"
                        >
                          <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                            <FaSignOutAlt className="text-red-400 text-xs" />
                          </div>
                          <p className="text-sm font-medium text-secondary group-hover/signout:text-red-500 transition-all duration-200">
                            Sign out
                          </p>
                        </div>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-homeGreen hover:bg-[#15803D] transition-all duration-200 cursor-pointer"
                      >
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                          <FaUser className="text-white text-xs" />
                        </div>
                        <p className="text-sm font-semibold text-white">
                          Sign in
                        </p>
                      </Link>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-Links font-medium text-base hover:bg-gray-50 hover:text-homeGreen2 transition-all duration-200 border border-[#E5E7EB]"
                    >
                      <div className="relative w-[18px] h-[18px]">
                        <FaRegHeart className="text-secondary text-[18px]" />
                        {itemsOfWish !== 0 && (
                          <span className="absolute -top-1.5 -right-2 h-[15px] min-w-[15px] px-[3px] rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center ring-[1.5px] ring-white leading-none">
                            {itemsOfWish}
                          </span>
                        )}
                      </div>
                      <span>Wishlist</span>
                    </Link>

                    <Link
                      href="/cart"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-Links font-medium text-base hover:bg-gray-50 hover:text-homeGreen2 transition-all duration-200 border border-[#E5E7EB]"
                    >
                      <div className="relative w-[18px] h-[18px]">
                        <FaShoppingCart className="text-secondary text-[18px]" />
                        {itemsOfCart !== 0 && (
                          <span className="absolute -top-1.5 -right-2 h-[15px] min-w-[15px] px-[3px] rounded-full bg-homeGreen text-white text-[8px] font-bold flex items-center justify-center ring-[1.5px] ring-white leading-none">
                            {itemsOfCart}
                          </span>
                        )}
                      </div>
                      <span>Cart</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-1 text-sm">
              <div className="leading-none font-medium">{title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
