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
            this.getImg();
            this.getLocations();
        },
        formatSpeciesName: function(name) {
            let formatted = name.charAt(0).toUpperCase() + name.slice(1);

            const hyphenRegEx = /-(?!(o(h*$|-))|z$|jr|mime)/g;
            const hyphenIndex = formatted.search(hyphenRegEx);

            if (hyphenIndex > -1) {
                formatted = formatted.replace(hyphenRegEx,' ');
                formatted = `${formatted.slice(0, hyphenIndex)} (${formatted.slice(hyphenIndex + 1)})`;
            }

            if (name === 'mr-mime') {
                formatted = 'Mr. Mime';
            }

            if (name === 'mime-jr') {
                formatted = 'Mime Jr.';
            }

            return formatted;
        }
    },
    mounted() {
        fetchData('http://pokeapi.co/api/v2/pokemon/')
            .then(data => fetchData(`http://pokeapi.co/api/v2/pokemon/?limit=${data.count}`))
            .then(data => this.speciesList = data.results.sort((a,b) => a.name > b.name ? 1 : -1))
    }
  });