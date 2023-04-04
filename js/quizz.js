import {getCategories, getQuestions} from "./api.js"

let categorie
let nbrQuestions

// Chargement des catégories
getCategories()
    .then( result => {
        initListeCategories(result)
    })
    .catch(error => console.log(error))


const initListeCategories = (categories) => {
    for (const categorie of categories) {
        let option = document.createElement("option")
        option.value = categorie.slug
        option.innerText = categorie.libelle
        document.getElementById("listeCategories").appendChild(option)
        console.log(categorie)
    }
}

const initQuestions = (result) =>{
    console.log(result)
}

document.querySelector("#lancer").addEventListener("click", () => {
    document.getElementById("form").style.display = "none"
    categorie = document.getElementById("listeCategories").value
    nbrQuestions = document.getElementById("nbrQuestions").value
    getQuestions(categorie, nbrQuestions)
        .then( result => {
           initQuestions(result)
        })
        .catch(error => console.log(error))
})