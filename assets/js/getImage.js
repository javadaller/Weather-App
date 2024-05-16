export async function getImage(city) {

    const apiKey = '-ACYigN6ETwqqDjHpy9iznV_rV7txCjhueXeKxr8J3E'

    const apiUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${apiKey}`

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch image data')
        }
        const data = await response.json();
        
        return setImage(data)
    } catch (error) {
        console.error('Error fetching image:', error)
        const container = document.querySelector('#cityImage')
        container.style.display='none'
        return null
    }

}

function setImage(data) {
    const container = document.querySelector('#cityImage')
    if(data.length==0) {
        return container.style.display='none'
    } else {
        container.style.display='block'
        const random = Math.floor(Math.random() * data.results.length)

        container.src = data.results[random].urls.thumb  
    }
}

export async function getBackground(type) {
    const apiKey = '-ACYigN6ETwqqDjHpy9iznV_rV7txCjhueXeKxr8J3E'

    const apiUrl = `https://api.unsplash.com/search/photos?query=${type}&client_id=${apiKey}`

    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error('Failed to fetch image data')
        }
        const data = await response.json();
        console.log(data)
        return setBackground(data)
    } catch (error) {
        console.error('Error fetching image:', error)
        return null;
    }
}

function setBackground(data) {
    const background = document.querySelector('#background')
    const random = Math.floor(Math.random() * data.results.length)

    background.src = data.results[random].urls.regular
}