import React from "react"
import MapContainer from "../MapContainer/MapContainer"

const NearbyBusStop = ({ currentPos, setNearbyBusStopInfo, nearbyBusStopInfo }) => {
  return (
    <div>
      <MapContainer currentPos={currentPos} setNearbyBusStopInfo={setNearbyBusStopInfo} nearbyBusStopInfo={nearbyBusStopInfo} />
    </div>
  )
}

export default NearbyBusStop
