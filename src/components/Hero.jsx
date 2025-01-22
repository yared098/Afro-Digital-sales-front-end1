import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-between p-10 mx-auto bg-white max-w-7xl">
      {/* Left Side - Text */}
      <motion.div
        className="flex-1 text-gray-900"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-4 text-5xl font-bold leading-tight">
          Supercharge Your <span className="text-indigo-600">Online Sales</span>
        </h1>
        <p className="mb-6 text-lg text-gray-600">
          Transform your business with our innovative platform. Empower your team to sell smarter and grow your network effortlessly.
        </p>
        <motion.a
          href="/login"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 text-xl font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700"
        >
          Get Started Now
        </motion.a>
      </motion.div>

      {/* Right Side - Image */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          src="hero.png"
          alt="Sales"
          className="object-cover w-full h-auto "
        />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute w-40 h-40 bg-indigo-500 rounded-full top-10 right-10 opacity-30 blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      ></motion.div>
      <motion.div
        className="absolute w-40 h-40 bg-pink-500 rounded-full bottom-10 left-10 opacity-30 blur-3xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      ></motion.div>
    </section>
  );
};

export default Hero;
