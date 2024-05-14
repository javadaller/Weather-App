import { details } from "./details.js";
import { getWeather } from "./getWeather.js";
import { getLocation } from "./getLocation.js";

//INIT
export function init() {
    document.querySelector('#details').style.display = 'none'
    document.querySelector('#weekView').style.display = 'none'
    document.querySelector('#locationID').style.display = 'none'

    //LOCAL STORAGE
    const units = localStorage.getItem('units')
    if (units==null) {
        localStorage.setItem('units','metric')
    }

    const location = localStorage.getItem('city')
    if (location==null) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                getWeather(position.coords.latitude, position.coords.longitude);
                localStorage.setItem('lat',position.coords.latitude)
                localStorage.setItem('long',position.coords.longitude)
            });
          } else {
            getWeather(0,0)
            localStorage.setItem('lat',0)
            localStorage.setItem('long',0)
          }          
    }

    //INTERFACE

    //location
    let isOpen = false
    const selectLocationButton = document.querySelector('#locationSelectButton')
    const inputContainer = document.querySelector('#locationID')
    const inputText = document.querySelector('#locationInputID')
    const submitButton = document.querySelector('#locationOkButton')

    selectLocationButton.addEventListener('click', () => {
        isOpen = true
        inputContainer.style.display = 'block';
        selectLocationButton.style.display = 'none';
    });

    submitButton.addEventListener('click', () => {
        isOpen = false
        inputText.value=''
        inputContainer.style.display = 'none';
        selectLocationButton.style.display = 'block';
        getWeather()
    });

    document.addEventListener('keyup', (event) => {
        if(event.key=='Enter') {
            if(isOpen) {
                isOpen = false
                inputText.value=''
                inputContainer.style.display = 'none';
                selectLocationButton.style.display = 'block';
                getWeather()
            }
        }
    })

    //temp format
    document.querySelector('#celciusSelect').addEventListener('click', () => {
        localStorage.setItem('units','metric')
        getWeather(localStorage.getItem('lat'),localStorage.getItem('long'))
    })

    document.querySelector('#fahrenheitSelect').addEventListener('click', () => {
        localStorage.setItem('units','imperial')
        getWeather(localStorage.getItem('lat'),localStorage.getItem('long'))
    })

    //details
    document.querySelector('#detailsSelect').addEventListener('click', () => {
        details()
    })

}
