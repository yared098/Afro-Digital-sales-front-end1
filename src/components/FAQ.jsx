import { useEffect } from "react";
import Accordion from "./Accordion";
import AOS from "aos";
import "aos/dist/aos.css";

const FAQ = () => {
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  return (
    <div className="px-5 overflow-hidden">
      <h1 className="px-2 mb-10 text-4xl text-center sm:text-5xl md:text-6xl">
        Frequently Asked Questions
      </h1>
      <div className="items-center block max-w-screen-xl p-3 mx-auto bg-[#001F3F] rounded-lg md:flex mb-28 ">
        <img
          src="/FAQ.png"
          alt="FAQ"
          className="w-full md:w-[40%] z-10 animation"
          data-aos="fade-right"
        />

        <div
          className="sm:px-8 px-3 text-sm sm:text-[14px] py-5 rounded-lg animation"
          data-aos="fade-left"
        >
          <Accordion
            title="How long does it take to set up an online sales platform?"
            answer="The setup time varies based on your requirements but typically ranges from 1 to 3 weeks for a fully functional platform."
          />
          <Accordion
            title="Do you provide support for managing digital sales platforms?"
            answer="Yes, we offer ongoing support and maintenance to ensure your digital sales platform runs smoothly and efficiently."
          />
          <Accordion
            title="Can you integrate payment gateways into my platform?"
            answer="Absolutely! We integrate secure and reliable payment gateways to streamline transactions and improve the customer experience."
          />
          <Accordion
            title="Do you offer analytics tools to track sales performance?"
            answer="Yes, we provide advanced analytics tools to help you monitor sales, track customer behavior, and make data-driven decisions."
          />
        </div>

      </div>
    </div>
  );
};

export default FAQ;