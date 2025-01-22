import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61562675561558",
    icon: <FaFacebookF />,
  },
  {
    href: "https://x.com/ShegerInovation?t=_jzUvTszmgDMfPHds4RrYQ&s=09",
    icon: <FaTwitter />,
  },
  {
    href: "https://www.instagram.com/sheger_innovations?igsh=MWZnenJ3eHdnYjJoNA==",
    icon: <FaInstagram />,
  },
  {
    href: "https://www.linkedin.com/in/sheger-innovations-222430317",
    icon: <FaLinkedinIn />,
  },
  {
    href: "https://www.tiktok.com/@sheger.innovation?_t=8o5fW76whwT&_r=1",
    icon: <FaTiktok />,
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-center bg-cover"
      style={{
        backgroundImage: 'url("/footer.png")',
        backgroundPosition: "center",
      }}
    >
      <div className="content">
        <div className="flex flex-col items-center top sm:flex-row">
          <div className="logo-details">
            <img src="./Logo.png" alt="footer logo" className="rounded-full max-w-14" />
          </div>
          <div className="flex space-x-2 media-icons">
            {socialLinks.map(({ href, icon }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {React.cloneElement(icon, {
                  className: "relative top-[10px] left-2.5",
                })}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center link-boxes">
          <div className="max-w-[300px] font-light mb-6 md:mb-0 footer-desc">
            <p
              className="text-gray-300 text-balance"
              style={{ wordSpacing: "0.15rem" }}
            >
              <b className="text-4xl text-[#ff932f] font-mono">A</b>fro Digital Sales is a digital sales firm specializing in
              referral based sales and SaaS solutions. We collaborate with
              medium-sized enterprises and are always open to new partnerships.
            </p>
            <hr className="py-2 mt-2" />
            <p className="text-gray-300">
              Based in{" "}
              <i className="text-lg text-white">Addis Ababa, Ethiopia</i>
            </p>
          </div>
          <ul className="box">
            <li className="link_name">Links</li>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
         
        </div>
      </div>
      <div className="bottom-details">
        <div className="bottom_text">
          <span className="copyright_text">
            Copyright © 2025 <a href="#">Afro Digital Sales.</a> All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;