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
        locationList: {}
    },
    methods: {
        handleSelect: function() {
            Promise.all([
                fetchData(`http://pokeapi.co/api/v2/pokemon/${this.species.name}/encounters`),
                fetchData(`http://pokeapi.co/api/v2/pokemon/${this.species.name}/`)
            ])
            .then(data => {

                this.locationList = data[0].reduce(function(obj,location) {
                    for (let versionDetails of location.version_details) {
                        if (!obj.hasOwnProperty(versionDetails.version.name)) {
                            obj[versionDetails.version.name] = [];
                        }
                        obj[versionDetails.version.name].push(location.location_area.name);
                    }
                    return obj;
                }, {});

                this.species.img = data[1].sprites.front_default;
            })
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