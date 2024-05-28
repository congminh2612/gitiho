import React from 'react'
import { twMerge } from 'tailwind-merge'

const BaseButton = ({ title, type, className, handleClick, disable }) => {
  return (
    <button
      disable={disable}
      onClick={handleClick}
      className={twMerge(
        'bg-primary text-white py-[6px] px-[10px] rounded-2xl',
        className
      )}
      type={type}
    >
      {title}
    </button>
  )
}

export default BaseButton
