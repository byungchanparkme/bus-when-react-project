import React, { useEffect, useState } from "react"
import MapContent from "../MapContent/MapContent"
import { getNearbyBusStop } from "../helper"
import { getDistance } from "geolib"
import Loading from "../Loading/Loading"

const MapContainer = ({ currentPos, setNearbyBusStopInfo, nearbyBusStopInfo, setIsOpen, setBusStopInfo }) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
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
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }, [currentPos, setNearbyBusStopInfo])

  if (isLoading) return <Loading />
  return <MapContent currentPos={currentPos} nearbyBusStopInfo={nearbyBusStopInfo} setIsOpen={setIsOpen} setBusStopInfo={setBusStopInfo} />
}

export default MapContainer
