import React, { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import myContext from "../../../context/data/myContext";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

function DashboardTab() {
  const context = useContext(myContext);
  const {
    products,
    addProduct,
    deleteProduct,
    updateProduct,
    setEditingProduct,
    editingProduct,
    setProduct,
    mode,
    order,
  } = context;
  const [tabIndex, setTabIndex] = useState(0);

  const startEdit = (product) => {
    setEditingProduct(product);
    setProduct(product);
    window.location.href = "/editproduct";
  };

  const handleEditSubmit = () => {
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        title: editingProduct.title,
        price: editingProduct.price,
        imageUrl: editingProduct.imageUrl,
        category: editingProduct.category,
        description: editingProduct.description,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="tab container mx-auto ">
        <Tabs
          defaultIndex={tabIndex}
          onSelect={(index) => setTabIndex(index)}
          className=" "
        >
          <TabList className="md:flex md:space-x-8 grid grid-cols-2 text-center gap-4 md:justify-center mb-10 ">
            <Tab>
              <button
                type="button"
                className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center bg-[#605d5d12]"
              >
                <div className="flex gap-2 items-center">
                  <MdOutlineProductionQuantityLimits />
                  Products
                </div>
              </button>
            </Tab>
            <Tab>
              <button
                type="button"
                className="font-medium border-b-2 border-pink-500 bg-[#605d5d12] text-pink-500 hover:shadow-pink-700 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center"
              >
                <div className="flex gap-2 items-center">
                  <AiFillShopping /> Order
                </div>
              </button>
            </Tab>
            <Tab>
              <button
                type="button"
                className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center"
              >
                <div className="flex gap-2 items-center">
                  <FaUser /> Users
                </div>
              </button>
            </Tab>
          </TabList>

          <TabPanel>
            {/* Product Details */}
            <div className="px-4 md:px-0 mb-16">
              <h1
                className="text-center mb-5 text-3xl font-semibold underline"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Product Details
              </h1>
              <div className="flex justify-end">
                <button
                  onClick={() => (window.location.href = "/addproduct")}
                  type="button"
                  className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="flex gap-2 items-center">
                    Add Product <FaCartPlus size={20} />
                  </div>
                </button>
              </div>
              <div className="relative overflow-x-auto ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead
                    className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(products) && products.length > 0 ? (
                      products.map((item, index) => {
                        const { id, title, price, imageUrl, category, time } =
                          item;
                        return (
                          <tr
                            key={index}
                            className="bg-gray-50 border-b dark:border-gray-700"
                            style={{
                              backgroundColor:
                                mode === "dark" ? "rgb(46 49 55)" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img
                                src={imageUrl}
                                alt={title}
                                className="h-16 w-16 object-cover"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {title}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              ${price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {new Date(time?.toDate()).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex justify-center items-center gap-4">
                                <button
                                  onClick={() => startEdit(item)}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteProduct(id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-6 py-4 whitespace-nowrap text-center"
                        >
                          No products available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="relative overflow-x-auto mb-16">
              <h1
                className=" text-center mb-5 text-3xl font-semibold underline"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Order Details
              </h1>
              {order.map((allorder, index) => {
                return (
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                      className="text-xs text-black uppercase bg-gray-200 "
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S.No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Payment Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Pincode
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                      </tr>
                    </thead>
                    {allorder.cartItems.map((item, index) => {
                      const { title, description, category, imageUrl, price } =
                        item;
                      console.log(item);
                      return (
                        <tbody>
                          <tr
                            className="bg-gray-50 border-b  dark:border-gray-700"
                            style={{
                              backgroundColor:
                                mode === "dark" ? "rgb(46 49 55)" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                          >
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {index + 1}.
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {allorder.paymentId}
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-black whitespace-nowrap"
                            >
                              <img className="w-16" src={imageUrl} alt="img" />
                            </th>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {title}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              ₹{price}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {category}
                            </td>

                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {allorder.addressInfo.name}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {allorder.addressInfo.address}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {allorder.addressInfo.pincode}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {allorder.addressInfo.phoneNumber}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {allorder.email}
                            </td>
                            <td
                              className="px-6 py-4 text-black "
                              style={{ color: mode === "dark" ? "white" : "" }}
                            >
                              {allorder.date}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                );
              })}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default DashboardTab;
