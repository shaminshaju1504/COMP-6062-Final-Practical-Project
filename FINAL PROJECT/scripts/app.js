const app = Vue.createApp({
    data() {
        return {
            user: {
                name: '',
                age: '',
                photo: ''
            },
            weather: {
                temperature: '',
                wind: '',
                description: '',
                city: 'London',
                province: 'Ontario',
                country: 'Canada'
            },
            dictionary: {
                word: '',
                phonetic: '',
                definition: '',
                searchWord: ''
            }
        };
    },
    methods: {
        fetchUserProfile: function() {
            fetch('http://comp6062.liamstewart.ca/random-user-profile')
                .then(response =>{  return response.json();})

                .then(data => {
                    this.user.name = `${data.first_name} ${data.last_name}`;
                    this.user.age = data.age;
                    this.user.photo = data.profile_picture;
                })
                .catch(error => console.error("Error fetching user profile:", error));
        },
        fetchWeather: function() {
            const url = `http://comp6062.liamstewart.ca/weather-information?city=${this.weather.city}&province=${this.weather.province}&country=${this.weather.country}`;
            fetch(url)
            .then(response =>{  return response.json();})
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind_speed;
                    this.weather.description = data.weather_description;
                })
                .catch(error => console.error("Error fetching weather data:", error));
        },
        fetchDefinition: function() {
            if (!this.dictionary.searchWord) return;
            const url = `https://comp6062.liamstewart.ca/define?word=${this.dictionary.searchWord}`;
            fetch(url)
            .then(response =>{  return response.json();})
            .then(data => {
                console.log("API Responce:",data);
                    if(Array.isArray(data)&& data.length>0)
                    { const definition =data[0];
                            this.dictionary.word = definition.word;
                            this.dictionary.phonetic = definition.phonetic;
                            this.dictionary.definition = definition.definition;
                    }
                })
                .catch(error => console.error("Error fetching dictionary data:", error));
        }
    },
    mounted: function() {
        this.fetchUserProfile();
        this.fetchWeather();
        this.fetchDefinition();
    }
});

app.mount("#app");
