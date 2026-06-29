"use client"
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import api from '../../servies/api'
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
function Product( ) {
    const [product, setProduct] = useState([])
    const route = useRouter()
    const selectedCategort = useSelector(
  (state) => state.auth.selectedCategory
);
    const getProduct = async () => {
        try {
            const res = selectedCategort !== "All" ? await api.get(`/api/product/category/${selectedCategort}`) : await api.get(`/api/product`) 

            setProduct(res.data?.data)
        } catch (err) {
            console.log("err")
        }
    }
    useEffect(() => {
        getProduct()
    }, [selectedCategort])
    return (
        <>
            {
                <div className="flex flex-wrap gap-5 p-5">
  {product?.map((val) => (
    <div
      key={val._id}
         className="
        w-full
        sm:w-[calc(50%-10px)]
        md:w-[calc(33.333%-14px)]
        lg:w-[calc(25%-15px)]
        border border-gray-300 shadow rounded-lg p-3 flex flex-col
      " >
      <div className="relative w-full h-[200px]">
        <Image
          src={val.image}
          alt={val.title}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <h2 className="mt-3 text-lg font-semibold text-gray-700 hover:text-blue-500">
        {val.title}
      </h2>

      <p className="mt-2 text-sm text-gray-500 flex-1 line-clamp-3">
        {val.description}
      </p>

      <button onClick={() =>route.push(`/dashboard/${val._id}`) } className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer">
        View Details
      </button>
    </div>
  ))}
</div>
            }
        </>
    )
}

export default Product