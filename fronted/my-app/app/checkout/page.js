"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "../../servies/api";
import toast from "react-hot-toast";

export default function Checkout() {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  // Get Cart
  const getCart = async () => {
    try {
      const res = await api.get("/api/card");

      setCart(res.data.data?.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  // Get Default Address
  const getAddress = async () => {
    try {
      const res = await api.get("/api/address");

      const list = res.data.data || [];

      if (list.length > 0) {
        const defaultAddress =
          list.find((item) => item.isDefault) || list[0];

        setAddress(defaultAddress);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCart();
    getAddress();
  }, []);

  // Total Price
  const totalPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // Place Order
const placeOrder = async () => {
  if (!address) {
    alert("Please select an address");
    return;
  }

  try {
    setLoading(true);

    // STEP 1: Create Order in DB
    const orderRes = await api.post("/api/order", {
      addressId: address._id,
      paymentMethod,
    });

    const orderId = orderRes.data.data._id;

    // CASE 1: COD → direct redirect
    if (paymentMethod === "COD") {
     router.push(`/dashboard`);
        toast.success("Payment SuccessFully")

      return;
    }

    // CASE 2: ONLINE → Razorpay flow

    const razorRes = await api.post("/api/payment/create-order", {
      orderId,
    });

    const razorpayOrder = razorRes.data.order;

    const options = {
      key: "rzp_test_T6wYInHK1KBwur",
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "My Store",
      description: "Order Payment",
      order_id: razorpayOrder.id,

      handler: async function (response) {
        // STEP 4: Verify payment
        const verifyRes = await api.post("/api/payment/verify", {
          orderId,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

      toast.success("Payment SuccessFully")
router.push(`/dashboard`);
        
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
  <div className="max-w-7xl mx-auto p-6 flex flex-col lg:flex-row gap-8">

    {/* Left Section */}
    <div className="lg:w-2/3 w-full">

      {/* Shipping Address */}
      <div className="bg-white border rounded-lg shadow-sm p-5 mb-6">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-bold">
            Shipping Address
          </h2>

          <button
            onClick={() => router.push("/address")}
            className="text-pink-600 font-semibold"
          >
            Change
          </button>

        </div>

        {!address ? (
          <div className="mt-5">
            <p className="text-gray-500">
              No address found.
            </p>

            <button
              onClick={() => router.push("/address")}
              className="mt-4 bg-pink-600 text-white px-5 py-2 rounded-lg"
            >
              Add Address
            </button>
          </div>
        ) : (
          <div className="mt-4 leading-7">

            <h3 className="font-semibold text-lg">
              {address.fullName}
            </h3>

            <p>{address.phone}</p>

            <p>{address.addressLine1}</p>

            {address.addressLine2 && (
              <p>{address.addressLine2}</p>
            )}

            <p>
              {address.city}, {address.state}
            </p>

            <p>
              {address.country} - {address.pincode}
            </p>

          </div>
        )}

      </div>

      {/* Order Summary */}

      <div className="bg-white border rounded-lg shadow-sm p-5">

        <h2 className="text-xl font-bold mb-5">
          Order Summary
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Your cart is empty.
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.product._id}
              className="flex gap-5 border-b pb-5 mb-5"
            >
              <div className="relative w-[120px] h-[120px]">

                <Image
                  src={item.product.image}
                  alt={item.product.title}
                  fill
                  className="object-cover rounded-lg"
                />

              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-lg">
                  {item.product.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  {item.product.description}
                </p>

                <p className="mt-3">
                  Quantity :
                  <span className="font-semibold ml-2">
                    {item.quantity}
                  </span>
                </p>

                <h2 className="text-xl font-bold mt-2">
                  ₹{item.product.price}
                </h2>

              </div>
            </div>
          ))
        )}

      </div>

    </div>

    {/* Right Section */}
    <div className="lg:w-1/3 w-full">

      <div className="bg-white border rounded-lg shadow-sm p-5 sticky top-5">

        <h2 className="text-xl font-bold mb-5">
          Payment Method
        </h2>

        <div className="space-y-4">

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Cash On Delivery</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              value="ONLINE"
              checked={paymentMethod === "ONLINE"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Online Payment</span>
          </label>

        </div>

        <hr className="my-6" />

        <h2 className="text-xl font-bold mb-4">
          Price Details
        </h2>

        <div className="flex justify-between mb-3">
          <span>Items</span>
          <span>{cart.length}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Delivery Charges</span>
          <span className="text-green-600">FREE</span>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <button
          onClick={placeOrder}
          disabled={loading || cart.length === 0 || !address}
          className="w-full mt-6 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 text-white py-3 rounded-lg text-lg font-semibold"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>

    </div>

  </div>
);
}