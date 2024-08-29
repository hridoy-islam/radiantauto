"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };
  const toggleFinanceMenu = () => {
    setIsFinanceOpen(!isFinanceOpen);
  };
  const toggleAboutOpen = () => {
    setIsAboutOpen(!isAboutOpen);
  };

  return (
    <header>
      <div className="bg-white z-50">
        <div className="container mx-auto">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <Link href="/" className="block w-full py-5">
                <img src="/images/logo.png" alt="logo" />
              </Link>
            </div>
            <div className="flex items-end justify-between px-4">
              <div>
                <button
                  onClick={() => setOpen(!open)}
                  id="navbarToggler"
                  className={`  ${
                    open && "navbarTogglerActive"
                  } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
                >
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                  <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                </button>
                <nav
                  id="navbarCollapse"
                  className={`absolute z-50 right-4 top-full w-full max-w-[300px] rounded-lg bg-white px-6 py-5 shadow lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none ${
                    !open && "hidden"
                  }`}
                >
                  <ul className="block lg:flex">
                    <li className="group relative px-4 lg:px-0.5 lg:py-5 xl:px-2 text-[#0F172A]">
                      <Link
                        className="flex items-center rounded-lg px-2.5 py-1.5 text-sm font-medium duration-300 group-hover:bg-primary/5 group-hover:text-primary lg:px-1.5 xl:px-2.5"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="group relative px-4 lg:px-0.5 lg:py-5 xl:px-2 text-[#0F172A]">
                      <Link
                        className="flex items-center rounded-lg px-2.5 py-1.5 text-sm font-medium duration-300 group-hover:bg-primary/5 group-hover:text-primary lg:px-1.5 xl:px-2.5"
                        href="/search"
                      >
                        Search Cars
                      </Link>
                    </li>
                    <li className="group relative px-4 lg:px-0.5 lg:py-5 xl:px-2 text-[#0F172A]">
                      <button
                        onClick={toggleSubmenu}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium duration-300 group-hover:bg-primary/5 group-hover:text-primary hover:text-primary lg:px-1.5 xl:px-2.5 "
                      >
                        Sell or Trade
                        <span
                          className={`duration-200 transform ${
                            isSubmenuOpen ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                          >
                            <path d="M12.0002 13.172L16.9502 8.22198L18.3642 9.63598L12.0002 16L5.63623 9.63598L7.05023 8.22198L12.0002 13.172Z"></path>
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`z-50 ${
                          isSubmenuOpen ? "block" : "hidden"
                        } lg:block dropdown-menu left-0 top-full rounded-bl-[10px] rounded-br-[10px] border border-transparent p-3 lg:invisible lg:absolute lg:top-[96%] lg:w-[214px] lg:space-y-1 lg:rounded-[10px] lg:bg-white lg:opacity-0 lg:shadow-3 lg:duration-300 lg:group-hover:visible lg:group-hover:top-full lg:group-hover:opacity-100`}
                      >
                        <Link
                          rel="nofollow"
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-dark-2 duration-300 hover:bg-primary/5 hover:text-primary"
                          href="/trade-in"
                        >
                          <span className="flex">
                            <span className="mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                />
                              </svg>
                            </span>
                            <span className="block text-sm font-medium">
                              Trade in Your Car
                            </span>
                          </span>
                        </Link>
                        <Link
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-dark-2 duration-300 hover:bg-primary/5 hover:text-primary"
                          href="/sell-your-car"
                        >
                          <span className="flex">
                            <span className="mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-5 w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                              </svg>
                            </span>
                            <span className="block text-sm font-medium">
                              Sell Your Car
                            </span>
                          </span>
                        </Link>
                      </div>
                    </li>
                    <li className="group relative px-4 lg:px-0.5 lg:py-5 xl:px-2 text-[#0F172A]">
                      <button
                        onClick={toggleFinanceMenu}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium duration-300 group-hover:bg-primary/5 group-hover:text-primary hover:text-primary lg:px-1.5 xl:px-2.5"
                      >
                        Finance
                        <span
                          className={`duration-200 transform ${
                            isFinanceOpen ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                          >
                            <path d="M12.0002 13.172L16.9502 8.22198L18.3642 9.63598L12.0002 16L5.63623 9.63598L7.05023 8.22198L12.0002 13.172Z"></path>
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`z-50 ${
                          isFinanceOpen ? "block" : "hidden"
                        } lg:block dropdown-menu left-0 top-full rounded-bl-[10px] rounded-br-[10px] border border-transparent p-3 lg:invisible lg:absolute lg:top-[96%] lg:w-[240px] lg:space-y-1 lg:rounded-[10px] lg:bg-white lg:opacity-0 lg:shadow-3 lg:duration-300 lg:group-hover:visible lg:group-hover:top-full lg:group-hover:opacity-100 `}
                      >
                        <Link
                          rel="nofollow"
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-dark-2 duration-300 hover:bg-primary/5 hover:text-primary "
                          href="/finance"
                        >
                          <span className="flex">
                            <span className="mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                              </svg>
                            </span>
                            <span className="block text-sm font-medium">
                              Finance Application
                            </span>
                          </span>
                        </Link>
                        <Link
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-dark-2 duration-300 hover:bg-primary/5 hover:text-primary"
                          href="/payment-calculator"
                        >
                          <span className="flex">
                            <span className="mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                                />
                              </svg>
                            </span>
                            <span className="block text-sm font-medium">
                              Payment Calculator
                            </span>
                          </span>
                        </Link>
                      </div>
                    </li>
                    {/* <li className="group relative px-4 lg:px-0.5 lg:py-5 xl:px-2 text-[#0F172A]">
                      <button
                        onClick={toggleAboutOpen}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium duration-300 group-hover:bg-primary/5 group-hover:text-primary hover:text-primary lg:px-1.5 xl:px-2.5 "
                      >
                        About Radiant Auto
                        <span
                          className={`duration-200 transform ${
                            isAboutOpen ? "rotate-180" : ""
                          }`}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                          >
                            <path d="M12.0002 13.172L16.9502 8.22198L18.3642 9.63598L12.0002 16L5.63623 9.63598L7.05023 8.22198L12.0002 13.172Z"></path>
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`z-50 ${
                          isAboutOpen ? "block" : "hidden"
                        } lg:block dropdown-menu left-0 top-full rounded-bl-[10px] rounded-br-[10px] border border-transparent p-3 lg:invisible lg:absolute lg:top-[96%] lg:w-[214px] lg:space-y-1 lg:rounded-[10px] lg:bg-white lg:opacity-0 lg:shadow-3 lg:duration-300 lg:group-hover:visible lg:group-hover:top-full lg:group-hover:opacity-100`}
                      >
                        <Link
                          rel="nofollow"
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-dark-2 duration-300 hover:bg-primary/5 hover:text-primary"
                          href="/about"
                        >
                          <span className="flex">
                            <span className="mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                                />
                              </svg>
                            </span>
                            <span className="block text-sm font-medium">
                              Why Radiant Auto?
                            </span>
                          </span>
                        </Link>
                        <Link
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-dark-2 duration-300 hover:bg-primary/5 hover:text-primary"
                          href="/guarantee"
                        >
                          <span className="flex">
                            <span className="mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                              </svg>
                            </span>
                            <span className="block text-sm font-medium">
                              Radiant Auto Gurantee
                            </span>
                          </span>
                        </Link>
                        <Link
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-dark-2 duration-300 hover:bg-primary/5 hover:text-primar"
                          href="/protection-plan"
                        >
                          <span className="flex">
                            <span className="mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                                />
                              </svg>
                            </span>
                            <span className="block text-sm font-medium">
                              Protection Plan
                            </span>
                          </span>
                        </Link>
                        <Link
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-dark-2 duration-300 hover:bg-primary/5 hover:text-primar"
                          href="/reviews"
                        >
                          <span className="flex">
                            <span className="mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                />
                              </svg>
                            </span>
                            <span className="block text-sm font-medium">
                              Customer Reviews
                            </span>
                          </span>
                        </Link>
                        <Link
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-dark-2 duration-300 hover:bg-primary/5 hover:text-primar"
                          href="/faq"
                        >
                          <span className="flex">
                            <span className="mr-3">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-6 h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                />
                              </svg>
                            </span>
                            <span className="block text-sm font-medium">
                              FAQ
                            </span>
                          </span>
                        </Link>
                      </div>
                    </li> */}
                    {/* <li className="group relative px-4 lg:px-0.5 lg:py-5 xl:px-2 text-[#0F172A]">
                      <Link
                        className="flex items-center rounded-lg px-2.5 py-1.5 text-sm font-medium duration-300 group-hover:bg-primary/5 group-hover:text-primary lg:px-1.5 xl:px-2.5"
                        href="/blog"
                      >
                        Blog
                      </Link>
                    </li> */}
                    <li className="group relative px-4 lg:px-0.5 lg:py-5 xl:px-2 text-[#0F172A]">
                      <Link
                        className="flex items-center rounded-lg px-2.5 py-1.5 text-sm font-medium duration-300 group-hover:bg-primary/5 group-hover:text-primary lg:px-1.5 xl:px-2.5"
                        href="/contact"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
