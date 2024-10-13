import React, { Fragment, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
        <Button
          onClick={scrollToTop}
          className={cn("bottom-4 right-4 rounded-full w-12 h-12 text-center text-xl font-bold",
            isVisible ? "fixed" : "hidden"
          )}
        >
          ↑
        </Button>
  );
};

export default ScrollToTopButton;