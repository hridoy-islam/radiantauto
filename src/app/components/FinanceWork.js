import List from "./List";

export default function FinanceWork() {
  return (
    <section className="overflow-hidden bg-white pt-20 pb-12 lg:pt-[120px] lg:pb-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center -mx-4">
          {/* Image Column */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="relative mx-auto max-w-[540px] lg:max-w-none lg:mx-0">
              <div className="relative grid grid-cols-5 gap-3 sm:gap-5">
                {/* Main large image */}
                <div className="col-span-3 relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-gray-200/80 group">
                    <img
                      src="/images/buycar.jpeg"
                      alt="Car financing process"
                      className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5">
                      <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-semibold text-gray-900">
                        Easy Financing
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side images */}
                <div className="col-span-2 space-y-3 sm:space-y-5 pt-12">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-gray-200/60 group">
                    <img
                      src="/images/buywithconfidance.jpeg"
                      alt="Buy with confidence"
                      className="w-full h-[220px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Decorative stats card */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-5 sm:p-6 shadow-xl shadow-primary/20">
                    <div className="text-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-3xl font-bold mb-1">98%</p>
                      <p className="text-sm text-white/80">Approval Rate</p>
                    </div>
                    {/* Decorative circles */}
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-white/10 rounded-full" />
                    <div className="absolute -bottom-2 -right-2 w-16 h-16 border-2 border-white/20 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Decorative floating element */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/5 rounded-3xl -z-10" />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/5 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Content Column */}
          <div className="w-full px-4 lg:w-6/12">
            <div className="lg:pl-12 xl:pl-16 mt-12 lg:mt-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Buy With Confidence
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-[44px]/[52px]">
                How does{" "}
                <span className="relative">
                  <span className="relative z-10 text-primary">financing</span>
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 -z-10"
                    viewBox="0 0 100 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 11C12 5 88 5 100 11"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="text-primary/20"
                    />
                  </svg>
                </span>{" "}
                work?
              </h2>

              {/* Description */}
              <p className="text-base leading-relaxed text-gray-600 mb-8 lg:text-lg lg:leading-relaxed">
                Financing your vehicle with Radiant Auto is straightforward,
                secure, and pressure-free. Our online application and approval
                process ensures transparency, and our dedicated Concierge team
                is always ready to assist you. After submitting your
                application, we'll contact you to discuss the next steps and
                answer any questions you may have.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Secure Application</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Transparent. No Pressure.</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-900">Best Rates</span>
                </div>
              </div>

              {/* CTA */}
              {/* <div className="flex items-center gap-4 pt-2">
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                >
                  Apply Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="tel:4377479400"
                  className="inline-flex items-center gap-2 px-4 py-3 text-gray-700 font-medium hover:text-primary transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  437-747-9400
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}