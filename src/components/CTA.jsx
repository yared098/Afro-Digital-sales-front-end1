const CTA = () => {
  return (
    <section className="px-10 py-16 text-center bg-indigo-600">
      <h2 className="mb-6 text-4xl font-bold text-white">Ready to Boost Your Sales?</h2>
      <p className="mb-8 text-lg text-white">Join thousands of companies who are growing their digital sales force. Start referring salespeople today!</p>
      <a
        href="/login"
        className="inline-block px-6 py-3 text-xl font-semibold text-indigo-600 transition-all duration-300 bg-white rounded-lg hover:bg-gray-200"
      >
        Get Started
      </a>
    </section>
  );
};

export default CTA;
