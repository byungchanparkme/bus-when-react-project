import React, { useEffect } from "react"

const loadMap = (currentPos, nearbyBusStopInfo) => {
  const { kakao } = window
  // container에는 컴포넌트가 마운트될 때 만들어 두었던 myMap이라는 아이디를 가진 DOM의 레퍼런스가 담겨 있음.
  const mapContainer = document.getElementById("myMap"),
    mapOptions = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(currentPos.lat, currentPos.lng), // 지도의 중심좌표
      level: 1, // 지도의 레벨(확대, 축소 정도)
    }

  // 지도 생성
  const map = new kakao.maps.Map(mapContainer, mapOptions)
}

function MapContent({ currentPos, nearbyBusStopInfo }) {
  // 컴포넌트가 마운트된 직후에 외부에서 지도에 관한 데이터를 받아온다.
  useEffect(() => {
    const { kakao } = window
    // kakao.maps.laod 함수 호출
    kakao.maps.load(() => loadMap(currentPos, nearbyBusStopInfo))
  }, [currentPos, nearbyBusStopInfo])
  return (
    <>
      <div id="myMap" style={{ width: "500px", height: "1024px", margin: "0 auto" }}></div>
    </>
  )
}

export default MapContent
