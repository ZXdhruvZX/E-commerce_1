import React, { useState, useEffect } from "react";
import { fireDB } from "../../../../firebase/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

function UpdateProduct({ productId }) {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
  });

  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDb, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      setLoading(false);
      window.location.href = "/dashboard";
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setProducts("");
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details using productId
        const productDoc = doc(fireDB, "products", productId);
        const productSnapshot = await productDoc.get();
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
          setProduct(productData);
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product details: ", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(fireDB, "products", productId);
      await updateDoc(docRef, {
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        category: product.category,
        description: product.description,
        time: new Date(),
      });
      console.log("Product updated:", product);
      // Redirect to dashboard after update (optional)
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-800 px-10 py-10 rounded-xl">
          <div>
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Update Product
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product title"
              />
            </div>
            <div>
              <input
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product price"
              />
            </div>
            <div>
              <input
                type="text"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product image URL"
              />
            </div>
            <div>
              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product category"
              />
            </div>
            <div>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product description"
                rows={4}
              ></textarea>
            </div>
            <div className="flex justify-center mb-3">
              <button
                type="submit"
                className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
