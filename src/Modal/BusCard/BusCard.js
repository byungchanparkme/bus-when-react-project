import React from "react"
import "./BusCard.css"

function BusCard({ currentBus }) {
  return (
    <div className="busCard">
      <div className="busCard__left">
        <p>
          <span className="teal">{currentBus.routetp.slice(0, 2)}</span>
          {currentBus.routeno}
        </p>
      </div>
      <div className="busCard__right">
        <p>
          {Math.floor(currentBus.arrtime / 60)}분 {currentBus.arrtime % 60}초 <span>({currentBus.arrprevstationcnt}번째 전)</span>
        </p>
      </div>
    </div>
  )
}

export default BusCard
