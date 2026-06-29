"use client"
import React from 'react'
import { useEffect } from 'react'
import api from '../../servies/api'
import { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {setSelectedCategory} from '../../lib/authSlice.js'
function Category({  }) {
    const [catagory, setCategory] = useState([])
const selectedCategory = useSelector(
  (state) => state.auth.selectedCategory
);  

const dispatch = useDispatch();
    const getCategory = async () => {
        try {
            const res = await api.get("/api/catagory")

            setCategory(res.data?.data)
        } catch (err) {
            console.log("err")
        }
    }
    useEffect(() => {
        getCategory()
    }, [])
    return (
        <>
            <div className='flex justify-center items-center gap-5  p-2  border-t border-gray-300 border-b border-gray-300'>
                {catagory?.map((val) => {
                    return (
                        <>
                            <div key={val._id} className={`text-md  hover:underline hover:text-blue-500 cursor-pointer text ${selectedCategory === val._id ? 'text-blue-500' :'text-gray-500' }`} onClick={() => dispatch(setSelectedCategory(val._id))}>{val.name}</div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default Category