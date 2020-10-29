import React, { useEffect, useMemo } from "react"
import ReactDOM from "react-dom"

// 자식 요소를 부모 요소에 집어넣어주는 컴포넌트이다.
const Portal = ({ children, parent, className }) => {
  const el = useMemo(() => document.createElement("div"), [])
  useEffect(() => {
    const target = parent && parent.appendChild ? parent : document.body
    // 기본 클래스 이름
    const classList = ["portal-container"]
    // props로 받은 클래스 이름들 추가
    if (className) className.split(" ").forEach((item) => classList.push(item))
    classList.forEach((item) => el.classList.add(item))
    // componentDidMount, componentDidUpdate 단계에서 자식 요소가 부모 요소에 추가된다.
    target.appendChild(el)
    // unmount 단계에서 자식 요소가 부모 요소에서 제거된다.
    return () => {
      target.removeChild(el)
    }
  }, [el, parent, className])
  return ReactDOM.createPortal(children, el)
}

export default Portal
