import lightBg from "./assets/bg-light.png"
import darkBg from "./assets/bg-dark.png"
import sun from "./assets/sun.png"
import {FaSearch} from "react-icons/fa"
import {MdDelete} from "react-icons/md"
import React, { useState } from "react"
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [searchList, setSearchList] = useState([])

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=51fba5fa911ec6cfb357db86f9b9ffe6`

  const searchLocation = (event) => {
    if(event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)

        const id = searchList.length+1
        setSearchList((prev) => [
          ...prev,
          {
            id: id,
            location: response.data.name,
            time: new Date((response.data.sys.sunrise + response.data.timezone)*1000).toLocaleString()
          },
        ])
      })
    }  
  }

  const clickSearch = (e) => {
    axios.get(url).then((response) => {
      setData(response.data)
      // console.log(response.data)

      const id = searchList.length+1
      setSearchList((prev) => [
        ...prev,
        {
          id: id,
          location: response.data.name,
          time: new Date((response.data.sys.sunrise + response.data.timezone)*1000).toLocaleString()
        },
      ])
    })
  }

  const searchAgain = (location) => {
    console.log(location)
  }

  const deleteItem = (id) => {
    const newsearchList = searchList.filter((item) => item.id !== id)
    setSearchList(newsearchList)
  }
  
  
  return (
    <div className='app'>
      <div className="container">
        <div className="section section-search">
          <input 
            className="search-bar" 
            value={location}
            onChange={event=>setLocation(event.target.value)}
            onKeyPress={searchLocation}
            text="text"
            placeholder="Enter Location"
          />
          <button className="search-btn" onClick={clickSearch}><FaSearch/></button>
        </div>
        <div className="card">
          <div className="today">Today's Weather</div>
          {data.main ? <div className="temp">{Math.round(data.main.temp)}°c</div> : null}
          {data.main ? <div className="min_max">H:{Math.round(data.main.temp_max)}°c  L:{Math.round(data.main.temp_min)}°c</div>: null}
          <div className="description">
            <div className="place">{data.name}</div>
          </div>

          <div className="sun_cloud">
            <img src={sun} alt="sun"/>
            {data.main ? <div>{new Date((data.sys.sunrise + data.timezone)*1000).toLocaleString()}</div>: null }
            {data.main ? <div>Humidity: {data.main.humidity}%</div>: null}
            {data.weather ? <div>{data.weather[0].main}</div>: null}
          </div>

          <div className="history">
            <div className="title">Search History</div>
              {
                searchList.map((search) => {
                  return(
                    <div className="details">
                      <div>{search.location}</div>
                      <div>{search.time}</div>
                      <button className="search-btn" onClick={()=>searchAgain(search.location)}><FaSearch/></button>
                      <button className="search-btn" onClick={()=>deleteItem(search.id)}><MdDelete/></button>
                    </div>
                  )
                })
              }
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
