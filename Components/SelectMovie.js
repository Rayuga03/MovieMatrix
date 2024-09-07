import React, { useContext } from 'react'
import { moviesList } from '../data'
import RadioComponents from './RadioComponents'
import '../Css/SelectMovie.css'
import BsContext from '../Context/BsContext'

const SelectMovie = () => {
  const context=useContext(BsContext)
  const {movie,changeMovie}=context
  const handleChangeMovie=(val) =>{
    changeMovie(val)
    window.localStorage.setItem("movie",val)
  }
  return (
    <>
    <h1 className='SM_heading'>Select a Movie:-</h1>
    <div className='SM_main_container'>
      {moviesList.map((el,index) =>{
        return (
            <RadioComponents text={el} key={index} data={movie} changeSelection={handleChangeMovie}/>
        )
      })}
      </div>
    </>
  )
}   

export default SelectMovie
