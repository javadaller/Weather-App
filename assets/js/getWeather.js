import { getImage } from "./getImage.js"
import { loadWeather } from "./loadWeather.js"



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


