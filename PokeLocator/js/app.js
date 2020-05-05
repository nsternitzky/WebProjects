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
        versionList: [],
        species: {
            name: '',
            img: ''
        },
        locationList: []
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
                        if (!obj.find(element => element.version === versionDetails.version.name)) {
                            obj.push({
                                version: versionDetails.version.name,
                                locations: []
                            });
                        }
                        obj.find(element => element.version === versionDetails.version.name).locations.push(location.location_area.name);
                    }
                    return obj;
                }, []);

                console.log(this.versionList);
                this.locationList.sort((a,b) => this.versionList.findIndex(item => item.name === a.version) - this.versionList.findIndex(item => item.name === b.version));

                this.species.img = data[1].sprites.front_default;
            })
        },
        formatSpeciesName: function(name) {
            let formatted = this.capitalize(name);

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
        },
        formatLocation: function(location) {
            let formatted = this.capitalize(location);
            formatted = formatted.replace(/-/g, ' ');
            return formatted;
        },
        formatVersion: function(version) {
            let formatted = this.capitalize(version);

            const hyphenIndex = formatted.search('-');
            if (hyphenIndex > -1) {
                formatted = `${formatted.slice(0, hyphenIndex)} ${formatted.charAt(hyphenIndex + 1).toUpperCase()}${formatted.slice(hyphenIndex + 2)}`;
                formatted = formatted.replace(/-/g, ' ');
            }

            if (version === 'firered') {
                formatted = 'FireRed';
            }

            if (version === 'leafgreen') {
                formatted = 'LeafGreen';
            }

            if (version === 'heartgold') {
                formatted = 'HeartGold';
            }

            if (version === 'soulsilver') {
                formatted = 'SoulSilver';
            }

            return formatted;
        },
        capitalize: function(text) {
            return text.charAt(0).toUpperCase() + text.slice(1);
        }
    },
    mounted() {
        fetchData('http://pokeapi.co/api/v2/pokemon/')
            .then(data => fetchData(`http://pokeapi.co/api/v2/pokemon/?limit=${data.count}`))
            .then(data => this.speciesList = data.results.sort((a,b) => a.name > b.name ? 1 : -1))
        fetchData('http://pokeapi.co/api/v2/version/')
            .then(data => fetchData(`http://pokeapi.co/api/v2/version/?limit=${data.count}`))
            .then(data => this.versionList = data.results)
    }
  });