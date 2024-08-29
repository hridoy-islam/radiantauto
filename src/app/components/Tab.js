import React, { useState } from "react";

const Tab = ({ tabs }) => {
  const [openTab, setOpenTab] = useState(tabs[0].tabCategory);

  return (
    <>
      <section className="py-10 pt-20">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div className="mb-14 w-full">
                <div className="flex justify-center gap-5 flex-wrap mb-14 w-full">
                  {tabs.map((tab) => (
                    <a
                      key={tab.tabCategory}
                      onClick={() => setOpenTab(tab.tabCategory)}
                      className={`cursor-pointer rounded-md px-4 py-3 text-sm font-medium md:text-base lg:px-6 ${
                        openTab === tab.tabCategory
                          ? "bg-primary text-white border border-primary"
                          : "text-body-color border-gray-100 border hover:bg-primary hover:text-white "
                      }`}
                    >
                      {tab.name}
                    </a>
                  ))}
                </div>
                {tabs.map((tab) => (
                  <TabContent
                    key={tab.tabCategory}
                    details={tab.details}
                    tabCategory={tab.tabCategory}
                    open={openTab}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tab;

const TabContent = ({ open, tabCategory, details }) => {
  return (
    <div
      className={`p-6 text-base leading-relaxed text-body-color  ${
        open === tabCategory ? "block" : "hidden"
      } `}
    >
      {details}
    </div>
  );
};
