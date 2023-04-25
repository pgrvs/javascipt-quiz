import {getCategories, getQuestions} from "./api.js"

let categorie
let nbrQuestions
let questionsAffiche = []

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
    }
}

const initQuestions = (result) =>{
    document.getElementById("questionnaire").style.display = ""
    let numQuestion = 0
    for (const question of result) {
        numQuestion ++
        questionsAffiche.push(question)
        let divQestionReponses = document.createElement("div")
        divQestionReponses.id = "questionEtReponse" + numQuestion
        document.getElementById("questionnaire").appendChild(divQestionReponses)

        let divQestion = document.createElement("div")
        divQestion.id = "question" + numQuestion
        document.getElementById("questionEtReponse" + numQuestion).appendChild(divQestion)

        let divReponses = document.createElement("fieldset")
        divReponses.id = "reponses" + numQuestion
        document.getElementById("questionEtReponse" + numQuestion).appendChild(divReponses)

        let pQuestion = document.createElement("p")
        pQuestion.innerText = question.libelle
        pQuestion.className = "badge rounded-pill text-bg-info"
        document.getElementById("question" + numQuestion).appendChild(pQuestion)

        let i = 0
        for (const reponse of question.reponses){
            i ++

            let pReponse = document.createElement("div")
            divReponses.appendChild(pReponse)

            let rReponse = document.createElement("input")
            rReponse.type = "radio"
            rReponse.name = "radio_question" + numQuestion
            rReponse.value = reponse.LibelleReponse
            rReponse.id = "reponse" + i + "_question" + numQuestion


            let lReponse = document.createElement("label")
            pReponse.appendChild(lReponse)

            let tReponse = document.createElement("span")
            tReponse.innerText = "   " + reponse.LibelleReponse

            lReponse.appendChild(rReponse)
            lReponse.appendChild(tReponse)

        }
    }
    console.log(questionsAffiche)
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