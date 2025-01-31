import React, { useState } from 'react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { services } from "../services/ServiceFactory";

const BusinessProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 100, discount: 10, description: 'Description A', location: 'Location A' },
    { id: 2, name: 'Product B', price: 200, discount: 20, description: 'Description B', location: 'Location B' },
    { id: 3, name: 'Product C', price: 300, discount: 30, description: 'Description C', location: 'Location C' },
    { id: 4, name: 'Product D', price: 400, discount: 40, description: 'Description D', location: 'Location D' },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    discount: '',
    location: ''
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    setIsFormOpen(true);
  };

  const addOrUpdateProduct = () => {
    if (newProduct.name && newProduct.price) {
      if (selectedProduct) {
        // Update existing product
        setProducts(products.map((product) =>
          product.id === selectedProduct.id ? { ...newProduct, id: selectedProduct.id } : product
        ));
      } else {
        // Add new product
        const newProductData = {
          id: products.length + 1,
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          description: newProduct.description || 'No description provided',
          discount: newProduct.discount || 0,
          location: newProduct.location || 'Not specified',
        };
        setProducts([...products, newProductData]);
      }
      setIsFormOpen(false);
      setSelectedProduct(null);
      setNewProduct({ name: '', price: '', description: '', discount: '', location: '' }); // Reset form
    } else {
      alert('Please fill in all required fields');
    }
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Business Products</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 border border-gray-300 rounded-lg bg-white shadow-md flex flex-col items-center justify-center"
              onClick={() => handleProductClick(product)}
            >
              <h3 className="text-md font-bold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-4">${product.price}</p>
              <p className="text-xs text-gray-500 mb-2">{product.description}</p>
              {product.discount > 0 && (
                <p className="text-sm text-green-500">Discount: {product.discount}%</p>
              )}
              <p className="text-xs text-gray-400">Location: {product.location}</p>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => {
            setIsFormOpen(true);
            setSelectedProduct(null);
            setNewProduct({ name: '', price: '', description: '', discount: '', location: '' });
          }}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          <FaPlus />
        </button>
      </div>

      {/* Slide-In Form */}
      {isFormOpen && (
        <div className="fixed top-0 right-0 w-96 bg-white shadow-lg p-6 z-10 transition-transform transform translate-x-0 overflow-y-auto rounded-lg">
          <h3 className="text-xl font-bold mb-4">{selectedProduct ? 'Update Product' : 'Add New Product'}</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addOrUpdateProduct();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Product Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Product Price</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Discount (%)</label>
              <input
                type="number"
                value={newProduct.discount}
                onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={newProduct.location}
                onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 font-medium hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {selectedProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>

          {/* Delete Button */}
          {selectedProduct && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => deleteProduct(selectedProduct.id)}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                <FaTrash /> Delete Product
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BusinessProducts;
