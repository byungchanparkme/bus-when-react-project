// 현재 위치의 위도, 경도 값이 담긴 객체 데이터를 제공해준다.
export const getCurrentPosition = () => {
  if (navigator.geolocation) {
    const options = {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: Infinity,
    }
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }
    function success(pos) {
      let currentLat = pos.coords.latitude
      let currentLng = pos.coords.longitude
      localStorage.setItem("currentPos", JSON.stringify({ lat: currentLat, lng: currentLng }))
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  } else {
    alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
  }
}