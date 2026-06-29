"use client";

import { useEffect, useState } from "react";
import api from "../../servies/api";
import { useRouter } from "next/navigation";

export default function Address() {
  const [addresses, setAddresses] = useState([]);
const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    isDefault: false,
  });

  const getAddresses = async () => {
    try {
      const res = await api.get("/api/address");
      setAddresses(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addAddress = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/address", form);

      setForm({
        fullName: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        isDefault: false,
      });

      getAddresses();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAddress = async (id) => {
    try {
      await api.delete(`/api/address/${id}`);
      getAddresses();
    } catch (err) {
      console.log(err);
    }
  };

  const setDefault = async (id) => {
    try {
      await api.put(`/api/address/default/${id}`);
      getAddresses();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Add Address */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-5">
          Add New Address
        </h2>

        <form onSubmit={addAddress} className="space-y-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded p-3"
            required
          />

          <textarea
            name="addressLine1"
            placeholder="Address Line 1"
            value={form.addressLine1}
            onChange={handleChange}
            className="w-full border rounded p-3"
            rows={3}
            required
          />

          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2 (Optional)"
            value={form.addressLine2}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="border rounded p-3"
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="border rounded p-3"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              className="border rounded p-3"
              required
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="border rounded p-3"
              required
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={form.isDefault}
              onChange={handleChange}
            />
            Set as Default Address
          </label>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg"
          >
            Save Address
          </button>
        </form>
      </div>

      {/* Saved Addresses */}
      <div>
        <h2 className="text-2xl font-bold mb-5">
          Saved Addresses
        </h2>

        {addresses.length === 0 ? (
          <div className="border rounded-lg p-8 text-center text-gray-500">
            No Address Found
          </div>
        ) : (
          addresses.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow p-5 mb-5"
            >
              <div className="flex justify-between">
                <h3 className="font-bold text-lg">
                  {item.fullName}
                </h3>

                {item.isDefault && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                    Default
                  </span>
                )}
              </div>

              <p className="mt-2">{item.phone}</p>

              <p>{item.addressLine1}</p>

              {item.addressLine2 && (
                <p>{item.addressLine2}</p>
              )}

              <p>
                {item.city}, {item.state}, {item.country}
              </p>

              <p>{item.pincode}</p>

              <div className="flex gap-3 mt-5">
                {!item.isDefault && (
                  <button
                    onClick={() => setDefault(item._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Set Default
                  </button>
                )}

                <button
                  onClick={() => deleteAddress(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
        <button
  onClick={() => router.push("/checkout")}
  className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
>
  Continue
</button>
      </div>
      
    </div>
  );
}