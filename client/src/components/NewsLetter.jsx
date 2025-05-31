
import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-4 px-4 sm:px-6 md:px-10 my-24 sm:my-32'>
      <h1 className='text-2xl md:text-4xl font-semibold'>
        Never Miss a Blog
      </h1>
      <p className='text-sm sm:text-base md:text-lg text-gray-500/70 pb-4 sm:pb-6 max-w-xl'>
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>

      <form className='flex flex-col sm:flex-row w-full max-w-2xl gap-3 sm:gap-0'>
        <input
          type='email'
          required
          placeholder='Enter your email address'
          className='w-full px-3 py-3 sm:py-0 sm:h-12 border border-gray-300 outline-none rounded-md sm:rounded-r-none text-gray-500'
        />
        <button
          type='submit'
          className='w-full sm:w-auto px-8 sm:px-12 h-12 text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md sm:rounded-l-none'
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewsLetter
