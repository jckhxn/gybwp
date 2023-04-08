import React, { useState, useEffect } from "react";

interface UseBreakpointsReturn {
  ltXs: boolean;
  ltSm: boolean;
  ltMd: boolean;
  ltLg: boolean;
  lteSm: boolean;
  lteMd: boolean;
  lteLg: boolean;
  lteXl: boolean;
  gtSm: boolean;
  gtMd: boolean;
  gtLg: boolean;
  gtXl: boolean;
  gteSm: boolean;
  gteMd: boolean;
  gteLg: boolean;
  gteXl: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

const breakpoints = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const getDeviceWidths = () => {
  const { innerWidth: width } = window;
  const { xs, sm, md, lg, xl } = breakpoints;

  const xSmall = Number(xs.replace("px", ""));
  const small = Number(sm.replace("px", ""));
  const med = Number(md.replace("px", ""));
  const large = Number(lg.replace("px", ""));
  const xLarge = Number(xl.replace("px", ""));

  return {
    ltXs: width < xSmall,
    ltSm: width < small,
    ltMd: width < med,
    ltLg: width < large,
    lteSm: width <= small,
    lteMd: width <= med,
    lteLg: width <= large,
    lteXl: width <= xLarge,
    gtSm: width > small,
    gtMd: width > med,
    gtLg: width > large,
    gtXl: width > xLarge,
    gteSm: width >= small,
    gteMd: width >= med,
    gteLg: width >= large,
    gteXl: width >= xLarge,
    isMobile: width < med,
    isTablet: width === med,
    isDesktop: width > med,
  };
};

const useBreakpoints = (): UseBreakpointsReturn => {
  const [devices, setDevices] = useState<UseBreakpointsReturn>({
    ltXs: false,
    ltSm: false,
    ltMd: false,
    ltLg: false,
    lteSm: false,
    lteMd: false,
    lteLg: false,
    lteXl: false,
    gtSm: false,
    gtMd: false,
    gtLg: false,
    gtXl: false,
    gteSm: false,
    gteMd: false,
    gteLg: false,
    gteXl: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    setDevices(getDeviceWidths());

    function handleChange() {
      setDevices(getDeviceWidths());
    }

    window.addEventListener("resize", handleChange);

    return () => {
      window.removeEventListener("resize", handleChange);
    };
  }, []);

  return devices;
};

export default useBreakpoints;
