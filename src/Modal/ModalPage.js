import React, { useState } from "react"
import Modal from "./Modal"

function ModalPage({ isOpen, setIsOpen, busStopInfo }) {
  return (
    <div>
      <Modal
        onClose={() => {
          setIsOpen(false)
        }}
        open={isOpen}
      >
        <p>버스 정류장 이름 : {busStopInfo.nodenm}</p>
        <p>버스 정류장 번호 : {busStopInfo.nodeno}</p>
        <p style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Close
          </button>
        </p>
      </Modal>
    </div>
  )
}

export default ModalPage
