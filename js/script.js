import { listQuestions } from "./questions.js"

const buttons = document.querySelectorAll(".atualQuestion button")
const btnPlay = document.querySelector(".btn-play")
const btnStart = document.querySelector(".btn-start")
const btnBack = document.querySelector(".btn-back")

const modalStart = document.querySelector(".background")
const modalGameOver = document.querySelector(".modal-gameOver")

const atualQuestion = document.querySelector(".atualQuestion")
const header = document.querySelector(".header")
const main = document.querySelector(".main")
const rool = document.querySelector(".rool")

const numberOfQuestionElement = document.querySelector(".numberOfQuestion")
const nameInput = document.querySelector("#name")
const nameDiv = document.querySelector(".name")

const category = document.querySelector(".category")


// Databases
let categoryChoose
let gameOn = false
let responseR = ""
let counting = 1
let questions
let arrayCategoryChoose = []
let mistakesPoint = 0
let rightsPoint = 0

numberOfQuestionElement.innerHTML = `${counting}Q`


btnPlay.addEventListener("click" , ()=>{
    main.style.display = "block"
    modalStart.style.display = "flex"
    nameInput.focus()
})

btnStart.addEventListener("click" , (e)=>{
    e.preventDefault()
    if(nameInput.value.length <= 2){
        nameInput.style.outline = "1px solid red"
        return
    } else {
        putName()
    }
    myCategory()
    modalStart.style.display = "none"
    btnPlay.style.display = "none"
    header.classList.add("hide")
    
    counting = 1
    createNewQuestion()
})

function myCategory(){
    arrayCategoryChoose = []
    categoryChoose = document.querySelector("select option:checked")
    
    category.innerHTML = categoryChoose.innerHTML

    questions = listQuestions()
    
    if(categoryChoose.value === "todascategorias"){
        arrayCategoryChoose = questions
        return
    }

    questions.forEach(item=>{
        if(item.category === categoryChoose.value){
            arrayCategoryChoose.push(item)
        }
    })

}


buttons.forEach(button => {
    button.addEventListener("click" , ()=> {
        answer(button)
    })
})


function answer(btn) {
    if(gameOn === true) return
    gameOn = true
    btn.style.background = "#333"
    btn.style.color = "#eee"
    compare(btn)
}

function compare(btn) {
    
    setTimeout(()=>{
        if(btn.innerHTML === responseR){
            btn.style.background = "#2fbf84"
            rightsPoint++
        } else {
            btn.style.background = "#bf2f2f"
            mistakesPoint++
        }

        setTimeout(()=>{
            verification()
        } , 2000)

    } , 2000)
}




function verification(){
    moveRool("close")
    setTimeout(()=>{
        clear()
        if(counting >= 10){
            gameOver()
        } else {
            counting++
            numberOfQuestionElement.innerHTML = `${counting}Q`
            createNewQuestion()
            moveRool("open")
        }   
    } , 1300)
}


function createNewQuestion(){
    
    const numAle = Math.floor(Math.random()*arrayCategoryChoose.length)
    responseR = arrayCategoryChoose[numAle].answer

    const question = arrayCategoryChoose[numAle].question
    const order = []
    do {
        const num = Math.round(Math.random()*3)
        if(order.includes(num)){

        } else {
            order.push(num)
        }
    } while (order.length < 4);
    
    atualQuestion.querySelector(".question").innerHTML = question
    atualQuestion.querySelector(".alt1").innerHTML = arrayCategoryChoose[numAle].options[order[0]]
    atualQuestion.querySelector(".alt2").innerHTML = arrayCategoryChoose[numAle].options[order[1]]
    atualQuestion.querySelector(".alt3").innerHTML = arrayCategoryChoose[numAle].options[order[2]]
    atualQuestion.querySelector(".alt4").innerHTML = arrayCategoryChoose[numAle].options[order[3]]
    
    arrayCategoryChoose.splice(numAle , 1)
    

}


function clear(){
    gameOn = false
    buttons.forEach(button => {
        button.style.background = "#eee"
        button.style.color = "#333"
    })
}

function gameOver() {
    modalGameOver.parentElement.style.display = "flex"
    givePoint()
    modalGameOver.querySelector("button").addEventListener("click" , ()=>{
        modalGameOver.parentElement.style.display = "none"
        main.style.display = "none"
        category.innerHTML = "Knowledge"
        header.classList.remove("hide")
        moveRool("open")
        mistakesPoint = 0
        rightsPoint = 0
        btnPlay.style.display = "block"
    })
}

btnBack.addEventListener("click" , (e)=>{
    e.preventDefault()
    modalStart.style.display = "none"
    nameInput.style.outline = "none"
    nameInput.value = ""
    category.innerHTML = "Knowledge"
})

function moveRool(move){
    if(move === "close"){
        rool.classList.add("move")
    } else {
        rool.classList.remove("move")
    }
}

function putName(){
    
    nameDiv.innerHTML = nameInput.value

}

const mistakes = document.querySelector(".mistakes")
const right = document.querySelector(".right")
const points = document.querySelector(".points")

function givePoint(){
    mistakes.innerHTML = `Erros : ${mistakesPoint}`
    right.innerHTML = `Acertos : ${rightsPoint}`
    points.innerHTML = `Pontos : ${rightsPoint*10}`
}