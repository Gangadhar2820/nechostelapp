import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate();
  return (
    <>
    <div>PageNotFound</div>
    <button onClick={()=>{navigate(-1)}}>Previous</button>
    </>
  )
}

export default PageNotFound