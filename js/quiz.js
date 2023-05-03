import {getCategories, getQuestions} from "./api.js"

let categorie
let nbrQuestions
let questionsAffiche = []
let reponsesSelectionne = []

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
    console.log(result.status)

    document.getElementById("formQuestionnaire").style.display = ""
    let numQuestion = 0
    for (const question of result) {
        numQuestion ++
        questionsAffiche.push(question)
        let divQestionReponses = document.createElement("div")
        divQestionReponses.id = "questionEtReponse" + numQuestion
        divQestionReponses.className = "border border-2 border-black rounded rounded-4 my-3 mx-auto w-75 p-3"
        document.getElementById("questionnaire").appendChild(divQestionReponses)

        let divQestion = document.createElement("div")
        divQestion.id = "question" + numQuestion
        divQestion.className = "text-center"
        divQestionReponses.appendChild(divQestion)

        let divReponses = document.createElement("fieldset")
        divReponses.id = "reponses" + numQuestion
        divQestionReponses.appendChild(divReponses)

        let divErreur = document.createElement("div")
        divErreur.id = "erreur" + numQuestion
        divErreur.style.display = "none"
        divErreur.className = "badge rounded-pill text-bg-danger text-center my-2"
        divQestionReponses.appendChild(divErreur)

        let pQuestion = document.createElement("p")
        pQuestion.innerText = question.libelle
        pQuestion.className = "badge rounded-pill text-bg-info"
        divQestion.appendChild(pQuestion)

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
            tReponse.id = "lib_reponse" + i + "_question" + numQuestion

            lReponse.appendChild(rReponse)
            lReponse.appendChild(tReponse)

        }
    }
}

const recupereSelection = () => {
    reponsesSelectionne = []
    for (let i = 1; i <= questionsAffiche.length; i++) {
        let radios = document.getElementsByName(`radio_question${i}`);
        let verif = false
        for(let j = 0; j < radios.length; j++){
            if(radios[j].checked){
                verif = true
                reponsesSelectionne.push(j)
            }
        }
        if (!verif) reponsesSelectionne.push(null)
    }
}

const verifReponse = () => {
    for (const key in reponsesSelectionne) {
        document.getElementById(`erreur${parseInt(key)+1}`).style.display = "none"
        document.getElementById(`questionEtReponse${parseInt(key)+1}`).className = "border border-2 border-black rounded rounded-4 my-3 mx-auto w-75 p-3"
        if (reponsesSelectionne[key] === null) {
            document.getElementById(`erreur${parseInt(key)+1}`).innerText = "Merci de sélectionner une réponse."
            document.getElementById(`erreur${parseInt(key)+1}`).style.display = ""
            document.getElementById(`questionEtReponse${parseInt(key)+1}`).className = "border border-2 border-danger rounded rounded-4 my-3 mx-auto w-75 p-3"
            window.location.href=`#questionEtReponse${parseInt(key)+1}`
            return false
        }
    }
    return true
}

const calculScore = () => {
    let score = 0
    for (const key in reponsesSelectionne) {
        const question = questionsAffiche[key]
        const numRepSelectionne = reponsesSelectionne[key]
        const reponse = question.reponses[numRepSelectionne]
        if (reponse.isTrue) {
            score = score + 1
        }
    }
    return score
}

const correction = () => {
    for (const key in questionsAffiche) {
        const question = questionsAffiche[key]
        const numQuestion = parseInt(key) + 1
        const numReponse = parseInt(reponsesSelectionne[key]) + 1
        document.getElementById(`lib_reponse${numReponse}_question${numQuestion}`).className = "text-danger"

        for (const reponseKey in question.reponses) {
            if (question.reponses[reponseKey].isTrue) {
                const numReponse = parseInt(reponseKey) + 1
                document.getElementById(`lib_reponse${numReponse}_question${numQuestion}`).className = "text-success"
            }
        }
    }
}

document.querySelector("#lancer").addEventListener("click", () => {
    categorie = document.getElementById("listeCategories").value
    nbrQuestions = document.getElementById("nbrQuestions").value
    if (nbrQuestions <= 0 ){
        document.getElementById("erreur").style.display = ""
        document.getElementById("erreur").innerText = "Le nombre de questions ne peut pas être inférieur ou égale à 0."
    } else {
        document.getElementById("form").style.display = "none"
       getQuestions(categorie, nbrQuestions)
            .then( result => initQuestions(result))
            .catch(error => console.log(error))
    }
})

document.querySelector("#valider").addEventListener("click", () => {
    recupereSelection()
    if (!verifReponse()) return
    const score = calculScore()
    document.getElementById('score').style.display = ""
    document.getElementById('score').innerText = `${score} / ${questionsAffiche.length}`
    correction()
    window.location.href=`#score`
    document.getElementById('valider').style.display = "none"
    document.getElementById('retour').style.display = ""
})

document.querySelector("#retour").addEventListener("click", () => {
    location.reload();
})