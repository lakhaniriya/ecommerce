"use client"
import React from 'react'
import DashboardHeader from './header'
import Category from './category'
import Product from './product'
import { useState } from 'react'

function DashboardLayout({children}) {
   
    
  return (
   <>
   <DashboardHeader/>
   <Category/>
     {children}
 
   </>
  )
}

export default DashboardLayout