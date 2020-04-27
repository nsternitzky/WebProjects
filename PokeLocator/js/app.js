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
        speciesList: []
    },
    methods: {
      
    },
    mounted() {
        fetchData('http://pokeapi.co/api/v2/pokemon/')
            .then(data => fetchData(`http://pokeapi.co/api/v2/pokemon/?limit=${data.count}`))
            .then(data => this.speciesList = data.results.sort((a,b) => a.name > b.name ? 1 : -1))
    }
  });