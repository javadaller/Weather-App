import { sleep } from "./fnc.js";

export async function details() {
    const div = document.querySelector('#detailsSelect')
    const detailsText = document.querySelector('#detailsText')
    const detailsIcon = document.querySelector('#detailsIcon')
    const goBack = document.querySelector('#goBack')
    const goBackText = document.querySelector('#goBackText')
    const celcius = document.querySelector('#celcius')
    const celciusContainer = document.querySelector('#celciusSelect')
    const fahrenheit = document.querySelector('#fahrenheitSelect')
    const preview = document.querySelector('#preview')
    const previewArray = Array.from(preview.children)
    const weekSelect = document.querySelector('#weekSelect')

    const status = div.getAttribute('status')

    if(status=='details') {
        div.setAttribute('status','goback')
        div.classList.remove('translateGoback')
        div.classList.add('translateGobackReverse')
        detailsIcon.style.display='none'
        detailsText.style.display='none'
        celcius.style.display='none'
        fahrenheit.style.display='none'
        celciusContainer.style.display='none'
        weekSelect.style.display = 'none'
        previewArray.forEach(element => {
            element.style.display='none'
        });
        previewArray[3].style.display='flex'

        await sleep(300)
        goBack.style.display='block'
        goBackText.style.display='block'
        

    } else {
        div.setAttribute('status','details')
        div.classList.remove('translateGobackReverse')
        div.classList.add('translateGoback')
        goBack.style.display='none'
        goBackText.style.display='none'
        previewArray[3].style.display='none'
        celcius.style.display='block'
        fahrenheit.style.display='flex'
        celciusContainer.style.display='flex'
        weekSelect.style.display = 'flex'
        
        previewArray.forEach(element => {
            if (element!=previewArray[3]) {
                if(element==previewArray[0] || element==previewArray[2]) {
                    element.style.display='flex'
                } else {
                    element.style.display='block'
                }
            }
        });

        await sleep(300)
        detailsIcon.style.display='block'
        detailsText.style.display='block'
    }
}