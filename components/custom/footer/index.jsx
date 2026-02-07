import React from "react";
import Link from "next/link";
import { Instagram, Send, MessageCircle, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="max-w-[1440px] mx-auto px-[6%] md:px-[4%]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="max-w-sm">
            <h2 className="text-xl font-black tracking-tighter text-[#343A40] mb-4">
              TECHNO<span className="text-[#0056B3]">.</span>
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium digital store providing the latest innovation in
              smartphones and laptops. Elevate your digital lifestyle with
              Techno.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Connect
            </h3>
            <div className="flex gap-5 text-[#343A40]">
              <Link href="#" className="hover:text-[#0056B3] transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="hover:text-[#0056B3] transition-colors">
                <Send size={20} />
              </Link>
              <Link href="#" className="hover:text-[#0056B3] transition-colors">
                <MessageCircle size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            © 2025 TECHNO. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[11px] text-gray-400 flex items-center gap-2">
            DESIGNED & DEVELOPED BY{" "}
            <span className="text-[#343A40] font-bold">HADI</span>
            <Link
              href="https://github.com/hadikarimi2008"
              target="_blank"
              className="hover:opacity-70 transition-opacity ml-3"
            >
              <Github size={20} color="black" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
