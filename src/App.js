import './App.css';
import React from 'react'

import Question from './Question'
import { createQuizData as QuizData } from './api/GetData'

function App() {

  const [quizData, setQuizData] = React.useState([])

  const [showQuiz, setShowQuiz] = React.useState(false)

  React.useEffect(() => {
    QuizData()
    .then(data => setQuizData(data))
  }, [])

  function startQuiz(){
    setShowQuiz(true)
  }

  console.log(quizData)

  const questionElements = quizData.map(question => {
    return <Question key={question.id} question={question}/>
  })

  return (
      <div className="App">
        {!showQuiz && <div>
        <h1 className="App--title">Quizzical</h1>
        <button className="App--button" onClick={startQuiz}>Start Quiz</button>
        </div>
        }
        {showQuiz && questionElements}
      </div>
  );
}

export default App;
