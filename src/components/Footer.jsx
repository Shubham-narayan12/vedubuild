import {
  LucideGraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  X,
  Instagram,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { studentLogout } from "../api/studentApi";
import toast from "react-hot-toast";

export const Footer = () => {
  const { t } = useTranslation();
  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,hi,ta,ml,kn,te",
        layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
      },
      "google_translate_element"
    );
  }

  // Call after 3 seconds
  setTimeout(function () {
    googleTranslateElementInit();
  }, 2000);

  return (
    <footer className="bg-lime-700 text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Logo + Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <LucideGraduationCap className="h-8 w-8 text-[#FF6B00]" />
              <span className="text-2xl font-bold text-white">Vedubuild</span>
            </div>
            <p className="text-gray-100 mb-4">{t("footer.description")}</p>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61580432246083"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6B00] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com/Vedubuildindia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6B00] transition-colors"
              >
                <X size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/108708455/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6B00] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/vedubuild_india/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6B00] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="mailto:info@vedubuild.org?subject=Business%20Inquiry&body=Hello%20Vedubuild%20Team,%0D%0A%0D%0AI%20would%20like%20to%20know%20more%20about%20your%20services.%0D%0A%0D%0AThanks,"
                className="hover:text-[#FF6B00] transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t("footer.quickLinks.title")}
            </h4>
            <ul className="space-y-2 text-gray-100">
              <li>
                <a href="/" className="hover:text-amber-600 transition">
                  {t("footer.quickLinks.home")}
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-amber-600 transition">
                  {t("footer.quickLinks.about")}
                </a>
              </li>
              <li>
                <a
                  href="/scholarships"
                  className="hover:text-amber-600 transition"
                >
                  {t("footer.quickLinks.scholarships")}
                </a>
              </li>
              <li>
                <a href="/events" className="hover:text-amber-600 transition">
                  {t("footer.quickLinks.events")}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t("footer.support.title")}
            </h4>
            <ul className="space-y-2 text-gray-100">
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  {t("footer.support.faq")}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-amber-600 transition">
                  {t("footer.support.contact")}
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  {t("footer.support.help")}
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  {t("footer.support.resources")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              {t("footer.legal.title")}
            </h4>
            <ul className="space-y-2 text-gray-100">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-amber-600 transition"
                >
                  {t("footer.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  to="/refund-policy"
                  className="hover:text-amber-600 transition"
                >
                  {t("footer.legal.refund")}
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-amber-600 transition"
                >
                  {t("footer.legal.terms")}
                </Link>
              </li>
              {/*
              <li>
                <a href="#" className="hover:text-amber-600 transition">
                  {t("footer.legal.cookie")}
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-200 text-sm">
          <p>
            &copy; 2024 Vedubuild. {t("footer.rights")}{" "}
            <a
              href="https://www.aadishrisoftech.com"
              className="text-white font-semibold hover:text-amber-600 transition"
            >
              Aadishri Softech Pvt Ltd
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};
