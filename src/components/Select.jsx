import React, { useId } from 'react'

function Select({
  options,
  label,
  className = "",
  ...prop
}, ref) {
  const id = useId()
  return (
    <div>
      {label && <label className={`${className}`} htmlFor={id}>{label}</label>}
      <select name={label}
        ref={ref}
        {...prop}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)