import { details } from "./details.js";
import { getWeather } from "./getWeather.js";
import { handleInputChange } from "./inputChange.js";
import { getLocation } from "./getLocation.js";
import { week } from "./week.js";

//INIT
export function init() {
    document.querySelector('#details').style.display = 'none'
    document.querySelector('#weekView').style.display = 'none'
    document.querySelector('#locationID').style.display = 'none'
    document.querySelector('#goBack').style.display = 'none'
    document.querySelector('#goBackText').style.display = 'none'

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
        inputText.focus()
    });

    submitButton.addEventListener('click', () => {
        getWeather(null,null,inputText.value)
        isOpen = false
        inputText.value=''
        inputContainer.style.display = 'none';
        selectLocationButton.style.display = 'block';
    });

    document.addEventListener('keyup', (event) => {
        if(event.key=='Enter') {
            if(isOpen) {
                getWeather(null,null,inputText.value)
                isOpen = false
                inputText.value=''
                inputContainer.style.display = 'none';
                selectLocationButton.style.display = 'block';
            }
        }
    })

    //test suggestion
    // inputText.addEventListener('change', (event) => {
    //     handleInputChange(event)
    // });

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
    document.querySelector('#detailsSelect').setAttribute('status','details')

    //week
    document.querySelector('#weekSelect').addEventListener('click', () => {
        week()
    })
}
