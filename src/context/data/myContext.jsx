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
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const addProduct = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(fireDB, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", id));
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
        user,
        setUser,
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default myContext;
