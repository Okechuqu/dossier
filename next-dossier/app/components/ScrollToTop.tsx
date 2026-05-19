"use client";

import { useEffect, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`fixed right-4 bottom-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black shadow-lg transition-opacity duration-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <IconArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
