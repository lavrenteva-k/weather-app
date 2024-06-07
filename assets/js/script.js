const container = document.querySelector('main .container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
// const weatherDetails = document.querySelector('.weather-details');

search.addEventListener('click', () => {

    const APIKey = '6b2f0cd368bbf096c287ee07b5c5b5e0';
    const city = container.querySelector('.search-box input').value;


    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${APIKey}`).then(response => response.json()).then(json => {

         if (json.cod == '404') {
             container.style.height = '400px';
             weatherBox.classList.remove('active');
             weatherDetails.classList.remove('active');
             error404.classList.add('active');
             return;
         }

        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img')
        const temperature = document.querySelector('.weather-box .temperature')
        const description = document.querySelector('.weather-box .description')
        const humidity = document.querySelector('.weather-details .humidity span')
        const wind = document.querySelector('.weather-details .wind span')


        switch (json.weather[0].main) {
            case 'Clear':
                image.src = './assets/images/clear.png';
                break;
            case 'Clouds':
                image.src = './assets/images/cloud.png';
                break;
            case 'Mist':
                image.src = './assets/images/mist.png';
                break;
            case 'Haze':
                image.src = './assets/images/mist.png';
                break;
            case 'Rain':
                image.src = './assets/images/rain.png';
                break;
            case 'Snow':
                image.src = './assets/images/snow.png';
                break;
            default:
                image.src = './assets/images/cloud.png';

        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>&deg;C</span>`
        description.innerHTML = `${json.weather[0].description}`
        humidity.innerHTML = `${json.main.humidity}%`
        wind.innerHTML = `${parseInt(json.wind.speed)} м/с`



    });

})