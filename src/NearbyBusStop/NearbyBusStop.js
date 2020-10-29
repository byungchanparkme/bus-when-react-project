import React, { useState } from "react"
import MapContainer from "../MapContainer/MapContainer"
import ModalPage from "../Modal/ModalPage"

const NearbyBusStop = ({ currentPos, setNearbyBusStopInfo, nearbyBusStopInfo }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLocked, setIsLocked] = React.useState(true)
  const [busStopInfo, setBusStopInfo] = useState({})
  return (
    <div>
      <MapContainer setBusStopInfo={setBusStopInfo} currentPos={currentPos} setNearbyBusStopInfo={setNearbyBusStopInfo} nearbyBusStopInfo={nearbyBusStopInfo} setIsOpen={setIsOpen} />
      <ModalPage isOpen={isOpen} setIsOpen={setIsOpen} locked={isLocked} setIsLocked={setIsLocked} busStopInfo={busStopInfo} />
    </div>
  )
}

export default NearbyBusStop
