import React from "react"

function BusCard({ currentBus }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <p>{currentBus.routeno}번 버스</p>
      <p>{currentBus.arrprevstationcnt} 정거장 남음!!!</p>
      <p>
        {Math.floor(currentBus.arrtime / 60)}분 {currentBus.arrtime % 60}초 남음!!!
      </p>
    </div>
  )
}

export default BusCard
