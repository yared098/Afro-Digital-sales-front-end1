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
        <h2 className="mb-4 text-2xl font-bold">Business Products</h2>

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-md"
            >
              <h3 className="mb-2 font-bold text-md">{product.name}</h3>
              <p className="mb-4 text-sm text-gray-600">${product.price}</p>
              <p className="mb-2 text-xs text-gray-500">{product.description}</p>
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
          className="fixed p-4 text-white bg-blue-500 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-700"
        >
          <FaPlus />
        </button>
      </div>

      {/* Slide-In Form */}
      {isFormOpen && (
        <div className="fixed top-0 right-0 z-10 max-h-screen p-6 overflow-y-auto transition-transform transform translate-x-0 bg-white rounded-lg shadow-lg w-96">
          <h3 className="mb-4 text-xl font-bold">Add New Product</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addProduct();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block mb-2 text-sm font-medium">Product Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Product Price</label>
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
                  <label className="block mb-2 text-sm font-medium">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="0"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Discount (%)</label>
                  <input
                    type="number"
                    value={newProduct.discount}
                    onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">Location</label>
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
                className="font-medium text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-700"
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
