// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .catch(error => console.log('Error:', error))
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

// ------------------------------------------
//  VUE
// ------------------------------------------

new Vue({
    el: '#locator-app',
    data: {
        speciesList: [],
        species: {
            name: '',
            img: ''
        },
        locationList: []
    },
    methods: {
        getLocations: function() {
            fetchData(`http://pokeapi.co/api/v2/pokemon/${this.species.name}/encounters`)
                .then(data => this.locationList = data)
        },
        getImg: function() {
            fetchData(`http://pokeapi.co/api/v2/pokemon/${this.species.name}/`)
                .then(data => this.species.img = data.sprites.front_default)
        },
        handleSelect: function() {
            this.getLocations();
            this.getImg();
        }
    },
    mounted() {
        fetchData('http://pokeapi.co/api/v2/pokemon/')
            .then(data => fetchData(`http://pokeapi.co/api/v2/pokemon/?limit=${data.count}`))
            .then(data => this.speciesList = data.results.sort((a,b) => a.name > b.name ? 1 : -1))
    }
  });