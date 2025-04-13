const app = Vue.createApp({
    data() {
        return {
            user: {//data structure for user
                name: '',
                age: '',
                photo: ''
            },
            weather: {//data structure for weather
                temperature: '',
                wind: '',
                description: '',
                city: 'London',
                province: 'Ontario',
                country: 'Canada'
            },
            dictionary: {//data structure for dictionary
                word: '',
                phonetic: '',
                definition: '',
                searchWord: ''
            }
        };
    },
    methods: {
        fetchUserProfile: function() {
            fetch('http://comp6062.liamstewart.ca/random-user-profile')// fetching data from link
            .then(response =>{ //checking responce or input from user
                if(response.ok)
                { 
                    return response.json();
                }
            else{
                console.log('An error occured.Please try again');
                }
            })
                .then(data => {
                    this.user.name = `${data.first_name} ${data.last_name}`;
                    this.user.age = data.age;
                    this.user.photo = data.profile_picture;
                })
                .catch(error => console.error("Error fetching user profile:", error));
        },
        fetchWeather: function() {
            const url = `http://comp6062.liamstewart.ca/weather-information?city=${this.weather.city}&province=${this.weather.province}&country=${this.weather.country}`;// fetching data from link
            fetch(url)
            .then(response =>{ // checking responce conditions
                if(response.ok)
                    { return response.json();

                    }
                else{
                    console.log('An error occured.Please try again');
                }
            })
                .then(data => {
                    this.weather.temperature = data.temperature;
                    this.weather.wind = data.wind_speed;
                    this.weather.description = data.weather_description;
                })
                .catch(error => console.error("Error fetching weather data:", error));
        },
        fetchDefinition: function() {
            if (!this.dictionary.searchWord) return;
            const url = `https://comp6062.liamstewart.ca/define?word=${this.dictionary.searchWord}`;// fetching data from link
            fetch(url)
            .then(response =>{ // checking responce conditions
                if(response.ok)
                { 
                    return response.json();
                }
            else{
                console.log('An error occured.Please try again');
                }
            })
            .then(data => {
                console.log("API Responce:",data);
                    if(Array.isArray(data)&& data.length>0)//checking array length
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
