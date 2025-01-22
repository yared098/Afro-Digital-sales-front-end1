import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const BusinessProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product A', price: 100 ,discount:100},
    { id: 2, name: 'Product B', price: 200 ,discount:100},
    { id: 3, name: 'Product C', price: 300 ,discount:100},
    { id: 4, name: 'Product D', price: 400,discount:100 },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    description: '', 
    discount: '', 
    location: '' 
  });

  const [hasPermission, setHasPermission] = useState(true); // Simulating permission check

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      const newProductData = {
        id: products.length + 1,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description || 'No description provided', // Default description
        discount: newProduct.discount || 0, // Default discount
        location: newProduct.location || 'Not specified', // Default location
      };
      setProducts([...products, newProductData]);
      setNewProduct({ name: '', price: '', description: '', discount: '', location: '' }); // Reset the form
      setIsFormOpen(false); // Close the form after submitting
    } else {
      alert('Please fill in all required fields');
    }
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
          onClick={() => setIsFormOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
        >
          <FaPlus />
        </button>
      </div>

      {/* Slide-In Form */}
      {isFormOpen && (
        <div className="fixed top-0 right-0 w-96 max-h-screen bg-white shadow-lg p-6 z-10 transition-transform transform translate-x-0 overflow-y-auto rounded-lg">
          <h3 className="text-xl font-bold mb-4">Add New Product</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addProduct();
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Product Price</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Conditional Fields for Permission */}
            {hasPermission && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="0"
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
              </>
            )}

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
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BusinessProducts;
