window.addEventListener('load', init);

const apiUrl = 'https://www.googleapis.com/books/v1/volumes?q=HarryPotter'


function init() {


    loadBooks()

}

function loadBooks() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then(addBooksToDom)
        .catch(error => console.log(error))
}

function addBooksToDom(data) {
    console.log(data)
}