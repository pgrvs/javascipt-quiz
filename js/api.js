const url = 'http://127.0.0.1:8000'

const getCategories = () => {
    return fetch(`${url}/api/quizz/categories`)
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}

const getQuestions = (categorie, nbrQuestions) => {
    return fetch(`${url}/api/quizz/categories/${categorie}/questions/${nbrQuestions}`)
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}

// rendre disponible cette fonction dans d'autre module
export {getCategories, getQuestions}