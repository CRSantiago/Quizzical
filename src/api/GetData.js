import axios from 'axios'

const getData = async () => {
    try{
      const response = await axios.get("https://opentdb.com/api.php?amount=5") 
      const questionsData = response.data.results
      return questionsData
    } catch(e){
      console.log(e)
    }
  }
  
  const decodeHTML = (html) => {
      var txt = document.createElement("textarea")
      txt.innerHTML = html
      return txt.value
  }
  
  const formatChoices = choices => {
      return choices.map((choice, index) => {
          return { id: index, text: decodeHTML(choice.trim()) , isHeld:false}
      })
  }
  const combineAllChoices = question => question.correct_answer.split(',').concat(question.incorrect_answers)
  
  const formatQuestion = (question, index) => {
      return {
          id: index,
          category: question.category,
          type: question.type,
          difficulty: question.difficulty,
          text: decodeHTML(question.question.trim()),
          choices: formatChoices(combineAllChoices(question)),
          correct: decodeHTML(question.correct_answer.trim()),
          incorrect: question.incorrect_answers
      }
  }
  
  const formatAPIQuizData = questions => {
      return questions.map((question, index) => {
          return formatQuestion(question, index)
      })
  }
  
  const createQuizData = async () => {
    try{
    const questions = await getData()
    const formattedQuestions = await formatAPIQuizData(questions)
    return formattedQuestions
    }catch(e){
      console.log(e)
    }
  }
  
  export { createQuizData }
  