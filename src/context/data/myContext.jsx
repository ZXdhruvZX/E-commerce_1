import React, { useState, useEffect, createContext } from "react";
import { fireDB } from "../../firebase/FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const myContext = createContext();

export const MyProvider = ({ children }) => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
  });

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    try {
      const docRef = await addDoc(collection(fireDB, "products"), {
        ...product,
        time: new Date(),
      });
      setProducts((prevProducts) => [
        ...prevProducts,
        { ...product, id: docRef.id },
      ]);
      setProduct({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "products", id));
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const productRef = doc(fireDB, "products", id);
      await updateDoc(productRef, updatedProduct);
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <myContext.Provider
      value={{
        product,
        setProduct,
        products,
        addProduct,
        deleteProduct,
        updateProduct,
        editingProduct,
        setEditingProduct,
        loading,
        setLoading,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default myContext;
