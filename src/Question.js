import React from 'react'

export default function Question({question, questionIndex, holdAnswer}) {
    const choices = question.choices.map((choice,index) => {
        return (
                <button 
                    key={index}
                    className={question.choices[index].isHeld ? "choice-selected" : "choice-button"} 
                    onClick={() => holdAnswer(question.choices[index].id, questionIndex)}>
                    {choice.text}
                </button>
                )
    })

    return (
        <div className="question-container">
            <h3>{question.text}</h3>
            <div className="choice-container">{choices}</div>
        </div>
    )
}