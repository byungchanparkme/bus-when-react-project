import React from "react"
import "./BusStopInfoHeader.css"

function BusStopInfoHeader({ busStopInfo }) {
  return (
    <div className="busStop__header">
      <p className="busStop__name">{busStopInfo.nodenm}</p>
      <p className="busStop__num">{busStopInfo.nodeno}</p>
    </div>
  )
}

export default BusStopInfoHeader
