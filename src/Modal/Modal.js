import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import Portal from "../Portal/Portal"

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(51, 51, 51, 0.3);
  backdrop-filter: blur(1px);
  opacity: 0;
  transition: all 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 200ms;
  display: flex;
  align-items: center;
  justify-content: center;

  & .modal-content {
    transform: translateY(500px);
    transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  &.active {
    transition-duration: 250ms;
    transition-delay: 0ms;
    opacity: 1;

    & .modal-content {
      transform: translateY(80px);
      opacity: 1;
      transition-delay: 150ms;
      transition-duration: 350ms;
    }
  }
`

const Content = styled.div`
  position: relative;
  padding: 20px;
  box-sizing: border-box;
  width: 500px;
  height: auto;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 2px;
`

export default function Modal({ open, onClose, children }) {
  const [active, setActive] = useState(false)
  const dimmer = useRef(null)

  useEffect(() => {
    const { current } = dimmer

    const transitionEnd = () => setActive(open)
    const keyHandler = (e) => open && active && [27].indexOf(e.which) >= 0 && onClose()
    const clickHandler = (e) => open && active && e.target === current && onClose()

    if (current) {
      current.addEventListener("transitionend", transitionEnd)
      current.addEventListener("click", clickHandler)
      window.addEventListener("keyup", keyHandler)
    }

    // 모달창이 열리면
    if (open) {
      setTimeout(() => {
        document.activeElement.blur()
        setActive(open)
      }, 10)

      // 모달창이 열렸을 때 스크린 리더로 모달창을 제외한 컨텐츠를 가상 커서로 선택할 수 없다.
      document.getElementById("root").setAttribute("aria-hidden", "true")
      // 모달창이 닫히면
    } else {
      document.getElementById("root").setAttribute("aria-hidden", "false")
    }

    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`

    return () => {
      if (current) {
        current.removeEventListener("transitionend", transitionEnd)
        current.removeEventListener("click", clickHandler)
      }

      const scrollY = document.body.style.top
      document.body.style.cssText = `position: ""; top: "";`
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
      window.removeEventListener("keyup", keyHandler)
    }
  }, [open, onClose])

  return (
    <React.Fragment>
      {(open || active) && (
        <Portal className="modal-portal" parent={document.getElementById("modal-root")}>
          <Dimmer ref={dimmer} className={active && open && "active"} onClick={onClose}>
            <Content className="modal-content" role="modal" aria-labelledby="busInfoModal">
              {children}
            </Content>
          </Dimmer>
        </Portal>
      )}
    </React.Fragment>
  )
}
