export function interactions() {

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
        getWeather(null,null,escapeHTML(inputText.value))
        isOpen = false
        inputText.value=''
        inputContainer.style.display = 'none'
        selectLocationButton.style.display = 'block'
    });

    document.addEventListener('keyup', (event) => {
        if(event.key=='Enter') {
            if(isOpen) {
                getWeather(null,null,escapeHTML(inputText.value))
                isOpen = false
                inputText.value=''
                inputContainer.style.display = 'none'
                selectLocationButton.style.display = 'block'
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
    document.querySelector('#detailsSelect').setAttribute('status','details')

    //week
    document.querySelector('#weekSelect').addEventListener('click', () => {
        week()
    })

    //socials
    document.querySelector('#github').addEventListener('click',() => {
        open('https://github.com/javadaller','_blank')
    })

    document.querySelector('#linkedin').addEventListener('click',() => {
        open('https://www.linkedin.com/in/arnaud-van-acker-814959262/','_blank')
    })
}