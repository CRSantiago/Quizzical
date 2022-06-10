import './App.css';
import React from 'react'

import Question from './Question'
import { createQuizData as QuizData } from './api/GetData'

function App() {

  const [quizData, setQuizData] = React.useState([])
  const [showQuiz, setShowQuiz] = React.useState(false) // boolean value to conditionally render show questions
  const [showResults, setShowResults] = React.useState(false) // boolean value to conditional render results


  React.useEffect(() => {
    QuizData()
    .then(data => setQuizData(data))
  }, [])

  function startQuiz(){
    setShowQuiz(true)
  }

  // set user selected choice. Used to grading in Question.js
  function holdAnswer(id,questionIndex){
    let newData = [...quizData]
    newData[questionIndex].choices[id] = {
      ...newData[questionIndex].choices[id],
      isHeld: !newData[questionIndex].choices[id].isHeld
    }
    setQuizData(newData)
  }

  function handlePlayAgain(){
    QuizData()
    .then(data => setQuizData(data))
    setShowQuiz(false)
    setShowResults(false)
  }

  const questionElements = quizData.map((question,index) => {
    return <Question 
              key={question.id} 
              question={question} 
              questionIndex={index}
              holdAnswer={holdAnswer}
              showResults={showResults}
            />
  })
  
  return (
      <div className="App">
        {!showQuiz && 
          <div>
            <h1 className="App--title">Quizzical</h1>
            <button className="App--button" onClick={startQuiz}>Start Quiz</button>
          </div>
        }
        {(showQuiz && !showResults) && 
          <div>
            {questionElements}
            <div className="button-container">
              <button 
                className="App--button" 
                onClick={() => setShowResults(true)}
              >
                Submit
              </button>
            </div>
          </div>
        }
        {showResults && 
          <div>
            {questionElements}
            <div className="button-container">
              <button className="App--button" onClick={handlePlayAgain}>Play Again</button>
            </div>
          </div>
        }
      </div>
  );
}

export default App;
