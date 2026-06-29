"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import api from "../../servies/api";
import { useRouter } from "next/navigation";

function AddToCard() {
  const [cart, setCart] = useState([]);
const route = useRouter()
  const getCart = async () => {
    try {
      const res = await api.get("/api/card");
      setCart(res.data.data?.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  // Increase Quantity
  const increaseQty = async (productId, quantity) => {
    try {
      await api.put(`/api/card/${productId}`, {
        quantity: quantity + 1,
      });

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Decrease Quantity
  const decreaseQty = async (productId, quantity) => {
    if (quantity <= 1) return;

    try {
      await api.put(`/api/card/${productId}`, {
        quantity: quantity - 1,
      });

      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Remove Item
  const removeItem = async (productId) => {
    try {
      await api.delete(`/api/card/${productId}`);
      getCart();
    } catch (err) {
      console.log(err);
    }
  };

  // Clear Cart
  const clearCart = async () => {
    try {
      await api.delete("/api/card");
      setCart([]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <h2 className="text-3xl font-bold">🛒 Your Cart is Empty</h2>
          <p className="text-gray-500 mt-3">
            Looks like you haven't added anything yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 flex gap-8">
      {/* Left */}
      <div className="w-2/3">
        <h1 className="text-3xl font-bold mb-5">
          My Cart ({cart.length} Items)
        </h1>

        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex gap-6 bg-white border rounded-xl shadow-sm p-5 mb-5"
          >
            <div className="relative w-[180px] h-[180px]">
              <Image
                src={item.product.image}
                alt={item.product.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {item.product.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  {item.product.description}
                </p>

                <p className="text-2xl font-bold mt-3">
                  ₹{item.product.price}
                </p>
              </div>

              <div className="flex items-center gap-4 mt-5">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={() =>
                      decreaseQty(item.product._id, item.quantity)
                    }
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>

                  <span className="px-5">{item.quantity}</span>

                  <button
                    onClick={() =>
                      increaseQty(item.product._id, item.quantity)
                    }
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.product._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right */}
      <div className="w-1/3 mt-14">
        <div className="sticky top-5 bg-white border rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-5">
            Price Details
          </h2>

          <div className="flex justify-between mb-3">
            <span>Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button onClick={() =>route.push("/address") } className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg">
            Proceed to Checkout
          </button>

          <button
            onClick={clearCart}
            className="w-full mt-3 border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-500 hover:text-white"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCard;