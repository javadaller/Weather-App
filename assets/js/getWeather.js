export async function getWeather(latitude, longitude, city, country) {

    if(latitude==null) {
        return weather(city,country)
    }

    const apiKey = '5e4412300bae1ac869ddb089fa529954'

    const apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }
        const data = await response.json();
        return weather(data[0].name, data[0].country)
    } catch (error) {
        console.error('Error fetching weather data:', error)
        return null;
    }
}

async function weather(city, country) {
    const unit = localStorage.getItem('units')
    const apiKey = '5e4412300bae1ac869ddb089fa529954'

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${unit}&appid=${apiKey}`

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch weather data')
        }
        const data = await response.json();
        return loadWeather(data, city, country)
    } catch (error) {
        console.error('Error fetching weather data:', error)
        return null;
    }
}


function loadWeather(data, city, country) {
    console.log(data)

    // Location
    document.querySelector('#locationCity').innerHTML = city
    document.querySelector('#locationCountry').innerHTML = country

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
    const currentHour = now.getHours()
    let temperatureIndex = 0

    // Find the index for 21h
    if (currentHour < 21) {
        temperatureIndex = 3
    } else {
        for (let i = 0; i < data.list.length; i++) {
            const time = new Date(data.list[i].dt * 1000).getHours()
            if (time === 21) {
                temperatureIndex = i
                break;
            }
        }
    }

    document.querySelector('#weatherType').innerHTML = data.list[temperatureIndex].weather[0].main

    const icon = data.list[temperatureIndex].weather[0].icon
    document.querySelector('#weatherIcon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    document.querySelector('#temperatureDay').innerHTML = Math.trunc(data.list[0].main.temp) + '°'

    document.querySelector('#temperatureNight').innerHTML = Math.trunc(data.list[temperatureIndex].main.temp) + '°'

}


