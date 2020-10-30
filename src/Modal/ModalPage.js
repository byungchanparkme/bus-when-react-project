import React, { useState } from "react"
import BusList from "./BusList"
import BusStopInfoHeader from "./BusStopInfoHeader"
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
        <BusStopInfoHeader busStopInfo={busStopInfo} />
        <BusList busStopInfo={busStopInfo} />
      </Modal>
    </div>
  )
}

export default ModalPage
