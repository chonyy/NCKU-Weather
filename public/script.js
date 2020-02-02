const icon = new Skycons({ "color": 'white' })
icon.set('icon', 'clear-day')
icon.play()

const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)

const locationElement = document.querySelector('[data-location]')
const humidityElement = document.querySelector('[data-humidity]')
const atElement = document.querySelector('[data-at]')
const dewElement = document.querySelector('[data-dew]')
const piElement = document.querySelector('[data-pi]')
const visibilityElement = document.querySelector('[data-visibility]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')
const hourlyElement = document.querySelector('[hourly-summary]')
const dailyElement = document.querySelector('[daily-summary]')


getData(22.9988416, 120.2195148, 'NCKU')

searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    locationElement.style.fontSize = "3vw"
    getData(latitude, longitude, place.formatted_address)
})

function getData(latitude, longitude, place) {
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
        })
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            console.log(place)
            setWeatherData(data, place)
        })
}

function setWeatherData(data, address) {
    locationElement.textContent = address
    statusElement.textContent = data.currently.summary
    temperatureElement.textContent = data.currently.temperature + '°C'
    precipitationElement.textContent = `${(data.currently.precipProbability * 100).toFixed(2)}%`
    windElement.textContent = data.currently.windSpeed + ' m/s'
    humidityElement.textContent = `${(data.currently.humidity * 100).toFixed(0)}%`
    atElement.textContent = data.currently.apparentTemperature + '°C'
    dewElement.textContent = data.currently.dewPoint + '°C'
    piElement.textContent = data.currently.precipIntensity + ' mm/hr'
    visibilityElement.textContent = data.currently.visibility + ' km'

    hourlyElement.textContent = data.hourly.summary
    dailyElement.textContent = data.daily.summary

    console.log(data.hourly.summary)
    console.log(data.daily.summary)
    icon.set('icon', data.currently.icon)
    icon.play()
}