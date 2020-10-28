import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./Header/Header"
import Home from "./Home/Home"
import NearbyBusStop from "./NearbyBusStop/NearbyBusStop"

import "./App.css"
import { getCurrentPosition } from "./helper"

function App() {
  const [currentPos, setCurrentPos] = useState({})

  useEffect(() => {
    getCurrentPosition()
    const currentPosition = localStorage.getItem("currentPos")
    setCurrentPos(JSON.parse(currentPosition))
  }, [])
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/nearbyBusStop">
            <NearbyBusStop currentPos={currentPos} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
