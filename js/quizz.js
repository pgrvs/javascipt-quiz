import {getCategories, getQuestions} from "./api.js"

getCategories()
    .then( result => {
        console.log(result)
    })
    .catch(error => console.log(error))

getQuestions()
    .then( result => {
        console.log(result)
    })
    .catch(error => console.log(error))