// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
             .then(checkStatus)  
             .then(res => res.json())
             .catch(error => console.log('Error:', error))
}

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

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
        species: '',
        locationList: []
    },
    methods: {
        getLocations: function() {
            fetchData(`http://pokeapi.co/api/v2/pokemon/${this.species}/encounters`)
                .then(data => this.locationList = data)
        }
    },
    mounted() {
        fetchData('http://pokeapi.co/api/v2/pokemon-species/')
            .then(data => fetchData(`http://pokeapi.co/api/v2/pokemon-species/?limit=${data.count}`))
            .then(data => this.speciesList = data.results.sort((a,b) => a.name > b.name ? 1 : -1))
    }
  });