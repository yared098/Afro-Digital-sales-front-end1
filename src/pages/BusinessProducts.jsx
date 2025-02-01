import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import { services } from "../services/ServiceFactory";

const BusinessProducts = () => {
  const [product, setProduct] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    p_name: '',
    p_price: '',
    p_description: '',
    discount: '',
    category: '',
    p_image: '',  // Product Image URL
    quantity: '',
    vendor_id: '',
    featured: false,
    is_new: true,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productList = await services.product.getAllProducts();
        setProduct(productList);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    setIsFormOpen(true);
  };

  const addOrUpdateProduct = async () => {
    try {
      if (selectedProduct) {
        await services.product.updateProduct(selectedProduct.id, newProduct);
      } else {
        await services.product.addProduct(newProduct);
      }
      const updatedProducts = await services.product.getAllProducts();
      setProduct(updatedProducts);
      setIsFormOpen(false);
      setSelectedProduct(null);
      setNewProduct({
        p_name: '',
        p_price: '',
        vendor_id: '',
        p_description: '',
        discount: '',
        category: '',
        p_image: '',
        quantity: '',
        featured: false,
        is_new: true,
      });
    } catch (error) {
      console.error("Error adding/updating product:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await services.product.deleteProduct(productId);
      const updatedProducts = await services.product.getAllProducts();
      setProduct(updatedProducts);
      setIsFormOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="flex min-h-screen rounded-lg">
      <div className="flex-1 p-4">
        <h2 className="mb-4 text-2xl font-bold text-green-800">Business Products</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
          {product.map((product) => {
            // Calculate discount price
            const discountedPrice = product.discount > 0 ? product.p_price * (1 - product.discount / 100) : product.p_price;

            return (
              <div
                key={product.id}
                className="relative flex flex-col items-start p-4 bg-white shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-green-500 border border-transparent"
                onClick={() => handleProductClick(product)}
              >
                {/* Product Image */}
                <img
                  src={product.p_image || 'https://via.placeholder.com/150'}
                  alt={product.p_name}
                  className="object-cover w-full h-32 mb-4 rounded-lg transition-all duration-300 transform hover:scale-110"
                />

                {/* Product Info */}
                <div className="text-left w-full flex-grow">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">{product.p_name}</h3>

                  {/* Price Display */}
                  <div className="mb-2 flex items-center">
                    {/* Old Price (crossed out) */}
                    {product.discount > 0 && (
                      <p className="text-sm text-gray-500 line-through mr-2">{product.p_price} ETB</p>
                    )}
                    {/* New Price (discounted) */}
                    <p className="text-xl font-bold text-green-700">{discountedPrice.toFixed(2)} ETB</p>
                  </div>

                  {/* Discount Label */}
                  {product.discount > 0 && (
                    <p className="text-sm font-medium text-yellow-600">Discount: {product.discount}%</p>
                  )}
                </div>

                {/* Hover effect for better user interaction */}
                <div className="absolute top-2 right-2 p-2 bg-green-500 text-white rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <FaPlus />
                </div>
              </div>
            );
          })}
        </div>




        {/* Floating Action Button */}
        <button
          onClick={() => {
            setIsFormOpen(true);
            setSelectedProduct(null);
            setNewProduct({
              p_name: '',
              p_price: '',
              p_description: '',
              discount: '',
              category: '',
              p_image: '',
              quantity: '',
              featured: false,
              is_new: true,
            });
          }}
          className="fixed p-4 text-white bg-green-500 rounded-full shadow-lg bottom-6 right-6 hover:bg-green-700"
        >
          <FaPlus />
        </button>
      </div>

      {/* Slide-In Form */}
      {isFormOpen && (
        <div className="fixed overflow-scroll  top-1 right-0 h-full w-96 bg-white shadow-2xl shadow-black p-6 transform transition-transform duration-300">
          {/* Close Icon */}
          <div className="absolute top-4 right-4 text-2xl cursor-pointer text-green-800 hover:text-green-600" onClick={() => setIsFormOpen(false)}>
            <FaTimes />
          </div>

          <div className="flex-grow p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-green-500">
            <h3 className="mb-4 text-xl font-bold text-green-800">
              {selectedProduct ? 'Update Product' : 'Add New Product'}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                addOrUpdateProduct();
              }}
              className="space-y-4"
            >
              {/* Display Image if Updating Product */}
              {selectedProduct && newProduct.p_image && (
                <div className="mt-4">
                  <h4 className="text-sm text-gray-700 font-medium">Current Image:</h4>
                  <img src={newProduct.p_image} alt="Product" className="w-full h-auto rounded-lg mt-2" />
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-green-800">Product Name</label>
                <input
                  type="text"
                  value={newProduct.p_name}
                  onChange={(e) => setNewProduct({ ...newProduct, p_name: e.target.value })}
                  className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-green-800">Product Price</label>
                <input
                  type="number"
                  value={newProduct.p_price}
                  onChange={(e) => setNewProduct({ ...newProduct, p_price: e.target.value })}
                  className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-green-800">Description</label>
                <textarea
                  value={newProduct.p_description}
                  onChange={(e) => setNewProduct({ ...newProduct, p_description: e.target.value })}
                  className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-green-800">Discount (%)</label>
                <input
                  type="number"
                  value={newProduct.discount}
                  onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                  className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Conditionally Rendered Fields */}
              {!selectedProduct && (
                <>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-green-800">Category</label>
                    <input
                      type="text"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-green-800">Product Image (URL)</label>
                    <input
                      type="text"
                      value={newProduct.p_image}
                      onChange={(e) => setNewProduct({ ...newProduct, p_image: e.target.value })}
                      className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block mb-2 text-sm font-medium text-green-800">Quantity</label>
                <input
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                  className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-green-800">Featured Product?</label>
                <input
                  type="checkbox"
                  checked={newProduct.featured}
                  onChange={(e) => setNewProduct({ ...newProduct, featured: e.target.checked })}
                  className="p-4 border border-green-300 rounded-lg"
                />
              </div>

              <div className="mt-4 flex justify-between space-x-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                >
                  <FaTrash className="mr-2" /> Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                >
                  {selectedProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default BusinessProducts;
