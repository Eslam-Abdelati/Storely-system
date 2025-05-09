import React from 'react'
import "./header.css"

export default function Header( props) {
  return (
    <div className="header-titel">
    <h2 >
       {props.text} 
       <span className='me-1'>{props.subText}</span>
     </h2>
    </div>
  )
}
