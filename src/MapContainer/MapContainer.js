import React, { useEffect } from "react"
import { getNearbyBusStop } from "../helper"
import MapContent from "../MapContent/MapContent"

const MapContainer = ({ currentPos, setNearbyBusStopInfo, nearbyBusStopInfo }) => {
  useEffect(() => {
    getNearbyBusStop(Number(currentPos.lat), Number(currentPos.lng))
      .then((response) => response.response.body.items.item)
      .then((response) => {
        setNearbyBusStopInfo(response)
      })
      .catch((err) => console.log(err))
  }, [currentPos, setNearbyBusStopInfo])
  return <MapContent currentPos={currentPos} nearbyBusStopInfo={nearbyBusStopInfo} />
}

export default MapContainer
