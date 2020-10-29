import React from "react"
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
      transform: translateY(210px);
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
  height: 300px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 2px;
`

export default function Modal({ open, onClose, children }) {
  const [active, setActive] = React.useState(false)
  const dimmer = React.useRef(null)

  React.useEffect(() => {
    const { current } = dimmer

    const transitionEnd = () => setActive(open)

    if (current) {
      current.addEventListener("transitionend", transitionEnd)
    }

    if (open) {
      setTimeout(() => {
        document.activeElement.blur()
        setActive(open)
      }, 10)
    }

    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
    return () => {
      if (current) {
        current.removeEventListener("transitionend", transitionEnd)
      }

      const scrollY = document.body.style.top
      document.body.style.cssText = `position: ""; top: "";`
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }, [open, onClose])

  return (
    <React.Fragment>
      {(open || active) && (
        <Portal className="modal-portal" parent={document.getElementById("modal-root")}>
          <Dimmer ref={dimmer} className={active && open && "active"} onClick={onClose}>
            <Content className="modal-content">{children}</Content>
          </Dimmer>
        </Portal>
      )}
    </React.Fragment>
  )
}
