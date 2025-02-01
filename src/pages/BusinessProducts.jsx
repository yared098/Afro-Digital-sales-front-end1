import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
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
            setNewProduct({ p_name: '', p_price: '', p_description: '', discount: '' });
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
    <div className="flex min-h-screen bg-green-200 rounded-lg">
  <div className="flex-1 p-4">
    <h2 className="mb-4 text-2xl font-bold text-green-800">Business Products</h2>

    {/* Product Grid */}
    <div className="grid grid-cols-4 gap-6 mb-6">
      
      {product.map((product) => (
        <div
            key={product.id}
            className="relative flex flex-col items-center p-4 transition-transform transform bg-white shadow-lg rounded-xl hover:scale-105 hover:shadow-2xl"
          onClick={() => handleProductClick(product)}

        >
            <img 
                src={product.p_image || 'https://via.placeholder.com/150'} 
                alt={product.p_name} 
                className="object-cover w-32 h-32 mb-3 rounded-md"
            />
            <h3 className="mb-1 text-lg font-bold text-green-800">{product.p_name}</h3>
            <p className="mb-2 text-sm text-green-700">${product.p_price}</p>
            {product.discount > 0 && (
                <p className="text-sm text-red-500">Discount: {product.discount}%</p>
            )}
        </div>
    ))}
    </div>

    {/* Floating Action Button */}
    <button
      onClick={() => {
        setIsFormOpen(true);
        setSelectedProduct(null);
        setNewProduct({ p_name: '', p_price: '', p_description: '', discount: '' });
      }}
      className="fixed p-4 text-white bg-green-500 rounded-full shadow-lg bottom-6 right-6 hover:bg-green-700"
    >
      <FaPlus />
    </button>
  </div>

  {/* Slide-In Form */}
  {isFormOpen && (
    <div className="fixed top-0 right-0 z-50 flex flex-col h-screen p-6 overflow-hidden transition-transform transform translate-x-0 shadow-2xl bg-green-50 w-96 rounded-l-xl">
      
      {/* Scrollable Content */}
      <div className="flex-grow p-2 overflow-y-auto">
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
          <div>
            <label className="block mb-2 text-sm font-medium text-green-800">Product Name</label>
            <input
              type="text"
              value={newProduct.p_name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="font-medium text-green-600 hover:text-green-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-700"
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
              className="flex items-center px-6 py-2 space-x-2 text-white transition bg-red-500 rounded-lg hover:bg-red-700"
            >
              <FaTrash /> <span>Delete Product</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )}
</div>

  );
};

export default BusinessProducts;
