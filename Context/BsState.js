import React, { useEffect, useState } from "react";
import BsContext from "./BsContext";

const BsState = (props) => {
    const [errorPopup, setErrorPopup] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [movie, changeMovie] = useState('');
    const [time, changeTime] = useState('');
    const [noOfSeat, changeNoOfSeats] = useState({
        A1: "",
        A2: "",
        A3: "",
        A4: "",
        D1: "",
        D2: "",
    });

    const [lastBookingDetails, setLastBookingDetails] = useState(null);

    const handlePostBooking = async () => {
        let response; 
        let data;     

        try {
            response = await fetch('http://localhost:8080/api/booking', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ movie: movie, slot: time, seats: noOfSeat }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            data = await response.json();
            console.log("Booking successful:", data);

            const message = data.message || "Booking successful";
            setErrorPopup(true);
            setErrorMessage(message);

            if (response.status === 200) {
                changeTime("");
                changeMovie("");
                setLastBookingDetails(data.data);
                window.localStorage.clear();
            }
        } catch (error) {
            console.error("Failed to book:", error);
            const errorMessage = error instanceof SyntaxError
                ? "Response is not valid JSON."
                : error.message;
            setErrorPopup(true);
            setErrorMessage(errorMessage);
        }
    };
    
    //const handleGetBooking = async () => {
    //    try {
    //        const response = await fetch('http://localhost:8080/api/booking', {
    //            method: "GET",
    //        });

    //        if (!response.ok) {
    //            throw new Error(`Error: ${response.status}`);
    //        }

    //        const data = await response.json();
    //        setLastBookingDetails(data.data);
    //    } catch (error) {
    //        console.error("Failed to get booking:", error);
    //        setErrorPopup(true);
    //        setErrorMessage("Failed to retrieve booking details. Please try again.");
    //    }
    //}; 
    const handleGetBooking = async () => {
        let response;
        let data;
    
        try {
            response = await fetch('http://localhost:8080/api/booking', {
                method: "GET",
            });
    
            // Check if the response status is not OK
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
            }
    
            data = await response.json();
            setLastBookingDetails(data.data);
    
        } catch (error) {
            console.error("Failed to retrieve booking details:", error);
            setErrorPopup(true);
            setErrorMessage("Failed to retrieve booking details. Please try again.");
        }
    };
    

    useEffect(() => {
        const movie = window.localStorage.getItem("movie");
        const slot = window.localStorage.getItem("slot");
        const seats = JSON.parse(window.localStorage.getItem("seats"));

        if (movie) {
            changeMovie(movie);
        }
        if (slot) {
            changeTime(slot);
        }
        if (seats) {
            changeNoOfSeats(seats);
        }
    }, []);

    return (
        <BsContext.Provider value={{
            movie,
            changeMovie,
            time,
            changeTime,
            noOfSeat,
            changeNoOfSeats,
            lastBookingDetails,
            setLastBookingDetails,
            handleGetBooking,
            handlePostBooking,
            errorMessage,
            errorPopup,
            setErrorMessage,
            setErrorPopup
        }}>
            {props.children}
        </BsContext.Provider>
    );
};

export default BsState;
