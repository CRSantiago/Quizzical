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

  function holdAnswer(id,questionIndex){
    let newData = [...quizData]
    newData[questionIndex].choices[id] = {
      ...newData[questionIndex].choices[id],
      isHeld: !newData[questionIndex].choices[id].isHeld
    }
    setQuizData(newData)
  }
  const questionElements = quizData.map((question,index) => {
    return <Question 
              key={question.id} 
              question={question} 
              questionIndex={index}
              holdAnswer={holdAnswer}
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
        {showQuiz && 
          <div>
            {questionElements}
            <div className="submit-container">
              <button className="submit">Submit</button>
            </div>
          </div>
        }
      </div>
  );
}

export default App;
