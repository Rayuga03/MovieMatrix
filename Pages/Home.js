import React, { useContext } from 'react'
import SelectMovie from '../Components/SelectMovie'
import LastBookingDetails from '../Components/LastBookingDetails'
import TimeSchedule from '../Components/TimeSchedule'
import SelectSeats from '../Components/SelectSeats'
import Modal from "../Components/ModalComponent";
import '../Css/Home.css'
import BsContext from '../Context/BsContext'

const Home = () => {
  const context = useContext(BsContext)
    const {
      movie,
      time,
      noOfSeat,
      handlePostBooking,
      setErrorPopup,
      setErrorMessage
    }=context
  const handleBookNow = () =>{
    if(!movie) {
      setErrorPopup(true)
      setErrorMessage("Please select a movie")
    }
    else if (!time) {
      setErrorPopup(true);
      setErrorMessage("Please select a time slot!");
    } else if (!noOfSeat)
    {
      setErrorPopup(true);
      setErrorMessage("Invalid Seats!");
    }
    else {
      handlePostBooking()
    }


    }

  return (
    <>
    <Modal />
    <div className='container'>
        <div className='wrapper'>
        <div className='select_movie_component'>
        <SelectMovie/>
        </div>
        <div className='last_booking_details_container'>
            <LastBookingDetails/>
        </div>
        </div>
        <div className='time_seats_container'>
            <TimeSchedule/>
            <SelectSeats/>
            <button className='BN-btn' onClick={handleBookNow}>Book Now</button>
        </div>
      
    </div>
    </>
  )
}

export default Home