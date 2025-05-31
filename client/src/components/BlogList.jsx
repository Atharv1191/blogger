
import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from 'framer-motion'
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {
  const [menu, setMenu] = useState("All")
  const {blogs,input} = useAppContext();

  const fillteredBlogs =()=>{
    if(input === ""){
      return blogs;
    }
    return blogs.filter((blog)=>blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }
  return (
    <div className='px-4 sm:px-6 md:px-10 lg:px-16'>
      {/* Category Filter Buttons */}
      <div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 my-8 overflow-x-auto scrollbar-hide '>
        {blogCategories.map((item) => {
          const isActive = menu === item

          return (
            <div key={item} className='relative'>
              <button
                onClick={() => setMenu(item)}
                className={`px-4 py-2 cursor-pointer rounded-full transition-all duration-300 relative whitespace-nowrap
                  ${isActive ? 'text-white bg-primary' : 'text-gray-500 hover:text-primary'}
                `}
              >
                {item}
                {isActive && (
                  <motion.div
                    layoutId='underline'
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className='absolute inset-0 bg-primary rounded-full -z-10'
                  />
                )}
              </button>
            </div>
          )
        })}
      </div>

      {/* Blog Cards Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-24'>
        {fillteredBlogs()
          .filter((blog) => menu === "All" ? true : blog.category === menu)
          .map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  )
}

export default BlogList
