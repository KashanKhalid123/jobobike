"use client";

import React from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaPinterest,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-3 text-base">Motta våre nyhetsbrev</h3>
            <p className="text-sm text-gray-600 mb-4">
              Få nyheter, tips og eksklusive tilbud rett i innboksen.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="E-post"
                className="w-full border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b190]"
              />
              <button className="bg-[#12b190] text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-[#0f9a7a] transition">
                Meld inn
              </button>
            </div>
            <div className="flex gap-4 mt-5">
              <FaInstagram className="w-5 h-5 cursor-pointer text-gray-600 hover:text-[#12b190]" />
              <FaTiktok className="w-5 h-5 cursor-pointer text-gray-600 hover:text-[#12b190]" />
              <FaFacebook className="w-5 h-5 cursor-pointer text-gray-600 hover:text-[#12b190]" />
              <FaPinterest className="w-5 h-5 cursor-pointer text-gray-600 hover:text-[#12b190]" />
              <FaYoutube className="w-5 h-5 cursor-pointer text-gray-600 hover:text-[#12b190]" />
              <FaXTwitter className="w-5 h-5 cursor-pointer text-gray-600 hover:text-[#12b190]" />
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-3 text-base">Support</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="/cycle" className="hover:text-[#12b190]">El-sykler</Link></li>
              <li><Link href="/accessorie" className="hover:text-[#12b190]">Sykkelutstyr</Link></li>
              <li><Link href="/bli-forhandler" className="hover:text-[#12b190]">Bli forhandler</Link></li>
              <li><Link href="/about" className="hover:text-[#12b190]">Om oss</Link></li>
              <li><Link href="/contact" className="hover:text-[#12b190]">Kontakt oss</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 text-base">Juridisk</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><Link href="/privacy" className="hover:text-[#12b190]">Personvernerklæring</Link></li>
              <li><Link href="/returns" className="hover:text-[#12b190]">Kjøpsvilkår & Garanti</Link></li>
            </ul>
          </div>

          {/* Contact Info */}  
          <div>
            <h3 className="font-semibold mb-3 text-base">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <HiOutlineEnvelope className="w-4 h-4 text-[#12b190]" />
                support@jobobike.no
              </li>
              <li className="flex items-center gap-2">
                <HiOutlinePhone className="w-4 h-4 text-[#12b190]" />
                +47 40 55 63 33
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineBuildingOffice2 className="w-4 h-4 text-[#12b190]" />
                Niels Juels Gate 70, Oslo, Norge
              </li>
            </ul>
          </div>
        </div>


      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 text-xs text-gray-500">
          <div className="text-center">
            © 2025 <span className="text-[#12b190] font-semibold">JALUT AI INNOSCRIBE</span>. Org nr: 932806517. Alle rettigheter forbeholdt.
          </div>
          <div className="flex gap-3 justify-center">
            <img src="/images/vipps.png" alt="Vipps" className="h-5 sm:h-6 object-contain" />
            <img src="/images/visa.png" alt="Visa" className="h-5 sm:h-6 object-contain" />
            <img src="/images/mastercard.png" alt="Mastercard" className="h-5 sm:h-6 object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;