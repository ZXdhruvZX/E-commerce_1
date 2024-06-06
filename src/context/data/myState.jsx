import React, { useState, useEffect } from "react";
import MyContext from "./myContext";
import { MyProvider } from "./myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

function MyState(props) {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // ********************** Add Product Section  **********************
  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("Please fill all fields");
    }
    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product Add successfully");

      getProductData();
      closeModal();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setProducts("");
  };

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductData = async () => {
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const productsArray = [];
        querySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProductList(productsArray);
      });
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  const edithandle = (item) => {
    setProducts(item);
  };

  // update product
  const updateProduct = async (item) => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
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

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    getOrderData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        edithandle,
        deleteProduct,
      }}
    >
      <MyProvider>{props.children}</MyProvider>
    </MyContext.Provider>
  );
}

export default MyState;
