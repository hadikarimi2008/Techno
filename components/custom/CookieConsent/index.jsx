"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 1200, opacity: 0 }}
          animate={{ x: 980, opacity: 1 }}
          exit={{ x: 1200, opacity: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed left-6 top-6 z-50 max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-xl"
        >
          <p className="text-sm text-zinc-300">
            We use cookies to improve your experience and analyze website
            traffic.
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={accept}
              className="rounded-lg bg-[#0056B3] px-4 py-2 text-white"
            >
              Accept
            </button>

            <button
              onClick={decline}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-white"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
