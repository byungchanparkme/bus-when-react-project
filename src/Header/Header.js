import React from "react"
import { Link } from "react-router-dom"
import "./Header.css"

const Header = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/nearbyBusStop">근처 버스 정류장</Link>
    </header>
  )
}

export default Header
