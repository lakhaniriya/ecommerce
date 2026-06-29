"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/servies/api";
import Image from "next/image";

export default function ProductDetails() {
  const { id } = useParams();
   const route = useRouter()
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      const res = await api.get(`/api/product/${id}`);
      setProduct(res.data.data);
    };

    getProduct();
  }, [id]);
const handleAddToCard = async() =>{
    try{
 const res = await api.post(`/api/card`,{
    productId:id,
 });
 route.push(`/card`) 
    }catch(err){
  console.log("err",err)
    }

}
  return (
    <div className="flex flex-row p-5">
        <div className="border border-gray-300 rounded-md p-3 shadow"><Image src={product?.image} alt={"ff"} width={300} height={300} /></div>
        <div className="px-6">
 <h1 className="text-bold text-xl">{product?.title}</h1>
      <p className="text-semibold text-xl">{product?.description}</p>
      <p >₹{product?.price}</p>
      <button  onClick={handleAddToCard} className="bg-blue-600 text-white p-2 cursor-pointer rounded">Add to Card</button>
        </div>
     
    </div>
  );
}