import { createDiv, degreesToDirection, sleep } from "./fnc.js"
import { getImage, getBackground } from "./getImage.js"



export async function getWeather(latitude, longitude, city) {

    const apiKey = '5e4412300bae1ac869ddb089fa529954'

    let apiUrl;

    if(latitude==null) {

        apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

    } else {

        apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`
    }

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }
        const data = await response.json()
        console.log(data)
        localStorage.setItem('lat',data[0].lat)
        localStorage.setItem('long',data[0].lon)
        localStorage.setItem('city',data[0].name)
        return weather(data[0].name, data[0].country)
    } catch (error) {
        console.error('Error fetching weather data:', error)
        return null;
    }
}

async function weather(city,country) {

    getImage(city)

    const unit = localStorage.getItem('units')
    const apiKey = '5e4412300bae1ac869ddb089fa529954'

    let apiUrl=''

    if(country!=null) {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${unit}&appid=${apiKey}`
    } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
    }

    

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }
        const data = await response.json()
        return loadWeather(data, city, country)
    } catch (error) {
        console.error('Error fetching weather data:', error)
        return null
    }
}


async function loadWeather(data) {
    console.log(data)

    let type = data.list[0].weather[0].main=='Clear'? 'sunny' : data.list[0].weather[0].main

    getBackground(type)

    // Location
    document.querySelector('#locationCity').innerHTML = data.city.name
    document.querySelector('#locationCountry').innerHTML = data.city.country

    // Date
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const now = new Date()
    const dayOfWeek = daysOfWeek[now.getDay()]
    const monthOfYear = monthsOfYear[now.getMonth()]
    const dayOfMonth = now.getDate()

    document.querySelector('#day').innerHTML = dayOfWeek
    document.querySelector('#date').innerHTML = monthOfYear + ' ' + dayOfMonth

    // Weather
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')

    const formattedDate = `${year}-${month}-${day}`

    let temperatureIndex = 0

    // Find the index for 21h
    for(let i=0; i<8; i++) {
        if(data.list[i].dt_txt==formattedDate+' 21:00:00') {
            temperatureIndex=i
        }
    }

    document.querySelector('#weatherType').innerHTML = data.list[0].weather[0].main

    const icon = data.list[0].weather[0].icon
    document.querySelector('#weatherIcon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    document.querySelector('#temperatureDay').innerHTML = Math.trunc(data.list[0].main.temp) + '°'

    document.querySelector('#temperatureNight').innerHTML = Math.trunc(data.list[temperatureIndex].main.temp) + '°'

    //details
    if (typeof data.list[0].rain !== 'undefined' && typeof data.list[0].rain['3h'] !== 'undefined') {
        document.querySelector('#rainfallInfo').innerHTML = data.list[0].rain['3h'] + 'mm'
    } else {
        document.querySelector('#rainfallInfo').innerHTML = 'no data'
    }

    const unit = localStorage.getItem('units')
    let speed;
    if(unit=='metric') {
        const kmh =  data.list[0].wind.speed*3.6
        speed = kmh.toFixed(2) + ' km/h'
    } else {
        const mph = data.list[0].wind.speed*2.23694
        speed = mph.toFixed(2) + ' mph'
    }
    
    document.querySelector('#windInfo').innerHTML = degreesToDirection(data.list[0].wind.deg) + ' ' + speed
    document.querySelector('#humidityInfo').innerHTML = data.list[0].main.humidity + '%'
    document.querySelector('#apInfo').innerHTML = data.list[0].main.pressure+'hpa'

    //5 days
    const weekView = document.querySelector('#weekView')
    weekView.innerHTML=''
    let index=0;
    const tempArray = []

    for(let i=0; i<5; i++) {
        
        const parent = createDiv('div',weekView,null,'weekViewContainer')

        //date
        const dateContainer = createDiv('div',parent,null,'dateContainer')
        const date = new Date()
        date.setDate(date.getDate() + i + 1)
        const dayOfWeek = daysOfWeek[date.getDay()]
        const monthOfYear = monthsOfYear[date.getMonth()]
        const dayOfMonth = date.getDate()
        createDiv('h3', dateContainer, `${dayOfWeek}`)
        createDiv('p', dateContainer, `${monthOfYear} ${dayOfMonth}`)

        //temperatures
        const tempContainer = createDiv('div',parent,null,'tempContainer')
        createDiv('div',tempContainer,Math.trunc(data.list[index].main.temp) + '°')
        createDiv('div',tempContainer,Math.trunc(data.list[index+temperatureIndex].main.temp) + '°','tempNight')

        tempArray.push(data.list[index].main.temp)

        //icon
        const icon = createDiv('img',parent)
        icon.src = `https://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`

        index+=8
    }

    //chart
    await sleep(1000)
    const ctx = document.getElementById('weekChart')

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
          datasets: [{
            label: '°',
            data: tempArray,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    });
}


