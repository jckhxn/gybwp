import React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> & {
  background: string;
} = ({ children }) => {
  return (
    <>
      {/* <Navigation className="relative z-10" /> */}

      <div className="z-0 bg-white">{children}</div>
      {/* <Footer /> */}
    </>
  );
};

Layout.background = "white";

export default Layout;
