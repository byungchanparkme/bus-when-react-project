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

  // 마커들의 아이콘 생성
  const currentPosIcon = new kakao.maps.MarkerImage("https://i1.daumcdn.net/dmaps/apis/n_local_blit_04.png", new kakao.maps.Size(31, 35))
  const busStopIcon = new kakao.maps.MarkerImage("https://icon-icons.com/icons2/567/PNG/32/bus_icon-icons.com_54412.png", new kakao.maps.Size(25, 25))

  // 현재 위치를 표시해주는 마커 생성
  const currentPosMarker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(currentPos.lat, currentPos.lng),
    image: currentPosIcon,
  })
  currentPosMarker.setMap(map)

  // 현재 위치 텍스트를 띄워주는 인포 윈도우 생성
  const currentPosInfoWindow = new kakao.maps.InfoWindow({
    position: new kakao.maps.LatLng(currentPos.lat, currentPos.lng),
    content: "현재 위치",
  })
  // 마커에 마우스 커서를 올리면
  kakao.maps.event.addListener(currentPosMarker, "mouseover", function () {
    // 인포 윈도우 표시
    currentPosInfoWindow.open(map, currentPosMarker)
  })
  // 마우스 커서가 마커에서 벗어나면
  kakao.maps.event.addListener(currentPosMarker, "mouseout", function () {
    // 인포 윈도우 사라진다.
    currentPosInfoWindow.close()
  })

  // 주변 버스 정류장을 표시해주는 마커 생성
  nearbyBusStopInfo.forEach((el) => {
    // 마커 생성
    const marker = new kakao.maps.Marker({
      //마커가 표시 될 위치
      position: new kakao.maps.LatLng(el.gpslati, el.gpslong),
      //마커에 hover시 나타날 title
      title: el.title,
      image: busStopIcon,
      clickable: true, // 지도 클릭 이벤트 발생 방지
    })

    // 마커를 지도에 표시
    marker.setMap(map)

    // 인포 윈도우 생성
    // 버스 정류장 이름 : el.nodenm
    // 현재 위치로부터 떨어진 거리 : el.distance
    const iwContent = `
      <div style="padding:5px; text-align:center;">
        <strong style="display:block;">
          ${el.nodenm}
        </strong>
        <span style="color:red;">
          ${el.distance}
        </span>
      </div>`
    let iwRemovable = true

    const infoWindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemovable,
    })

    // 마커에 클릭이벤트 등록
    kakao.maps.event.addListener(marker, "click", function () {
      // 마커 위에 인포윈도우 표시
      infoWindow.open(map, marker)
    })
  })
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
