import React, { useEffect } from "react"
import MapContent from "../MapContent/MapContent"
import { getNearbyBusStop } from "../helper"
import { getDistance } from "geolib"

const MapContainer = ({ currentPos, setNearbyBusStopInfo, nearbyBusStopInfo }) => {
  useEffect(() => {
    getNearbyBusStop(Number(currentPos.lat), Number(currentPos.lng))
      .then((response) => response.response.body.items.item)
      .then((response) => {
        // 여기서 버스 정류장이 현재 위치로부터 떨어진 거리를 계산하여 각 요소 안에 집어 넣는다.
        response = response.map((item) => {
          const distance = getDistance(currentPos, {
            latitude: item.gpslati,
            longitude: item.gpslong,
          })
          return {
            ...item,
            distance: distance + "m",
          }
        })
        setNearbyBusStopInfo(response)
      })
      .catch((err) => console.log(err))
  }, [currentPos, setNearbyBusStopInfo])
  return <MapContent currentPos={currentPos} nearbyBusStopInfo={nearbyBusStopInfo} />
}

export default MapContainer
