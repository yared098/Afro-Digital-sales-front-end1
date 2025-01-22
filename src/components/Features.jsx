import { motion } from 'framer-motion';

const featuresData = [
  {
    title: "Referral Marketing",
    description: "Empower your sales team by letting them refer customers and earn commissions.",
    image: "/features/referral-marketing.png",
  },
  {
    title: "Easy to Use",
    description: "A user-friendly dashboard to manage your sales team and track performance.",
    image: "/features/easy-to-use.png",
  },
  {
    title: "Real-Time Analytics",
    description: "Get detailed reports and analytics to make data-driven decisions for your business.",
    image: "/features/real-time-analytics.png",
  },
];

const Features = () => {
  return (
    <section className="px-10 py-16 bg-gradient-to-r from-gray-900 via-indigo-900 to-gray-900">
      <div className="text-center">
        <h2 className="mb-6 text-4xl font-bold text-white">Features</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-opacity-50 border rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-white/10 border-white/20"
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-32 mx-auto mb-4 h-28"
              />
              <h3 className="mb-3 text-2xl font-semibold text-white">{feature.title}</h3>
              <p className="text-lg text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
