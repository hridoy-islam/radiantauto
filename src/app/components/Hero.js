"use client";

const Hero = () => {
  return (
    <>
      <div className="relative bg-white pb-[80px] pt-[80px] lg:pt-[80px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-5/12">
              <div className="hero-content">
                <h1 className="mb-5 text-4xl font-bold !leading-[1.208] text-dark sm:text-[42px] lg:text-[40px] xl:text-5xl">
                  Drive Happiness Home. Buy, Trade, or Sell you car
                </h1>
                {/* <p className="mb-8 max-w-[480px] text-base text-body-color">
                  With TailGrids, business and students thrive together.
                  Business can perfectly match their staffing to changing demand
                  throughout the dayed.
                </p> */}
                <ul className="flex flex-wrap items-center">
                  <li>
                    <a href="/#" className="button">
                      Get Started
                    </a>
                  </li>
                </ul>
                {/* <div className="clients pt-16">
                  <h6 className="mb-6 flex items-center text-xs font-normal text-body-color">
                    Some Of Our Clients
                    <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                  </h6>

                  <div className="flex items-center space-x-4">
                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/ayroui.svg"
                    />

                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/graygrids.svg"
                    />

                    <SingleImage
                      href="#"
                      imgSrc="https://cdn.tailgrids.com/2.0/image/assets/images/brands/uideck.svg"
                    />
                  </div>
                </div> */}
              </div>
            </div>
            <div className="hidden px-4 lg:block lg:w-1/12"></div>
            <div className="w-full px-4 lg:w-6/12">
              <div className="lg:ml-auto lg:text-right">
                <div className="relative z-10 inline-block pt-11 lg:pt-0">
                  <img
                    src="/images/thumbnail.jpeg"
                    alt="hero"
                    className="max-w-full lg:ml-auto"
                  />
                  <span className="absolute -bottom-8 -left-8 z-[-1]">
                    <svg
                      width="93"
                      height="93"
                      viewBox="0 0 93 93"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#ff6600" />
                      <circle cx="2.5" cy="24.5" r="2.5" fill="#ff6600" />
                      <circle cx="2.5" cy="46.5" r="2.5" fill="#ff6600" />
                      <circle cx="2.5" cy="68.5" r="2.5" fill="#ff6600" />
                      <circle cx="2.5" cy="90.5" r="2.5" fill="#ff6600" />
                      <circle cx="24.5" cy="2.5" r="2.5" fill="#ff6600" />
                      <circle cx="24.5" cy="24.5" r="2.5" fill="#ff6600" />
                      <circle cx="24.5" cy="46.5" r="2.5" fill="#ff6600" />
                      <circle cx="24.5" cy="68.5" r="2.5" fill="#ff6600" />
                      <circle cx="24.5" cy="90.5" r="2.5" fill="#ff6600" />
                      <circle cx="46.5" cy="2.5" r="2.5" fill="#ff6600" />
                      <circle cx="46.5" cy="24.5" r="2.5" fill="#ff6600" />
                      <circle cx="46.5" cy="46.5" r="2.5" fill="#ff6600" />
                      <circle cx="46.5" cy="68.5" r="2.5" fill="#ff6600" />
                      <circle cx="46.5" cy="90.5" r="2.5" fill="#ff6600" />
                      <circle cx="68.5" cy="2.5" r="2.5" fill="#ff6600" />
                      <circle cx="68.5" cy="24.5" r="2.5" fill="#ff6600" />
                      <circle cx="68.5" cy="46.5" r="2.5" fill="#ff6600" />
                      <circle cx="68.5" cy="68.5" r="2.5" fill="#ff6600" />
                      <circle cx="68.5" cy="90.5" r="2.5" fill="#ff6600" />
                      <circle cx="90.5" cy="2.5" r="2.5" fill="#ff6600" />
                      <circle cx="90.5" cy="24.5" r="2.5" fill="#ff6600" />
                      <circle cx="90.5" cy="46.5" r="2.5" fill="#ff6600" />
                      <circle cx="90.5" cy="68.5" r="2.5" fill="#ff6600" />
                      <circle cx="90.5" cy="90.5" r="2.5" fill="#ff6600" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

const SingleImage = ({ href, imgSrc }) => {
  return (
    <>
      <a href={href} className="flex w-full items-center justify-center">
        <img src={imgSrc} alt="brand image" className="h-10 w-full" />
      </a>
    </>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`absolute left-0 top-0 z-20 flex w-full items-center`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo.svg"
                alt="logo"
                className="w-full"
              />
              <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                alt="logo"
                className="w-full hidden"
              />
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color"></span>
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow  lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none ${
                  !open && "hidden"
                } `}
              >
                <ul className="block lg:flex">
                  <ListItem NavLink="/#">Home</ListItem>
                  <ListItem NavLink="/#">Payment</ListItem>
                  <ListItem NavLink="/#">About</ListItem>
                  <ListItem NavLink="/#">Blog</ListItem>
                </ul>
              </nav>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              <a
                href="/#"
                className="px-7 py-3 text-base font-medium text-dark hover:text-primary "
              >
                Sign in
              </a>

              <a
                href="/#"
                className="rounded-lg bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const ListItem = ({ children, NavLink }) => {
  return (
    <>
      <li>
        <a
          href={NavLink}
          className="flex py-2 text-base font-medium text-dark hover:text-primary  lg:ml-10 lg:inline-flex"
        >
          {children}
        </a>
      </li>
    </>
  );
};
