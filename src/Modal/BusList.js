import React, { useState, useEffect } from "react"
import { getBusInfoOnCurrentBusStop } from "../helper"
import BusCard from "./BusCard/BusCard"

function BusList({ busStopInfo }) {
  const [busInfo, setBusInfo] = useState([])

  useEffect(() => {
    let response = getBusInfoOnCurrentBusStop(busStopInfo)
    response.then((response) => response.response.body.items.item).then((response) => setBusInfo(response))
  }, [busStopInfo])
  return (
    <div>
      {busInfo?.map((item) => (
        <BusCard key={item.routeid} currentBus={item} />
      ))}
    </div>
  )
}

export default BusList
