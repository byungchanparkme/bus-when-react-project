import React from "react"

function BusStopInfoHeader({ busStopInfo }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", marginBottom: "20px" }}>
      <p>버스 정류장 이름 : {busStopInfo.nodenm}</p>
      <p>버스 정류장 번호 : {busStopInfo.nodeno}</p>
    </div>
  )
}

export default BusStopInfoHeader
