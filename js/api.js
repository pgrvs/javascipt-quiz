const getCategories = () => {
    return fetch('http://127.0.0.1:8002/api/quizz/categories')
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}

// TEST !!
const getQuestions = () => {
    return fetch('http://127.0.0.1:8002/api/quizz/categories/chateau/questions/10')
        .then( response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error("Erreur : Vérifier votre endPoint")
        })
}

// rendre disponible cette fonction dans d'autre module
export {getCategories, getQuestions}