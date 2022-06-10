import React from 'react'

export default function Question({question, questionIndex, holdAnswer, showResults}) {
    // set initial styles
    let style = {
        height: "30px",
        borderRadius: "5px",
        backgroundColor: "white",
        marginRight: "20px",
        border:"1px solid black",
        padding: "5px 10px"
    }

    // map through choices in question prop passed in
    const choices = question.choices.map((choice,index) => {

        //show results is a boolean value to determine if to display corrected quiz
        if(!showResults){

        //conditionally style based on isHeld attribute
        if(question.choices[index].isHeld){
            style = {
                ...style,
                backgroundColor: "#D6DBF5"
            }
        }  else {
            style = {
                ...style,
                backgroundColor:"white"
            }
        }
        return (
                <button 
                    key={index}
                    style={style}
                    onClick={() => holdAnswer(question.choices[index].id, questionIndex)}>
                    {choice.text}
                </button>
                )
        } else {
            //conditionally style quiz choices based on critera
            // user choose correct answer
            if(question.choices[index].isHeld && question.choices[index].text === question.correct) {
                style = {
                    ...style,
                    backgroundColor:"#94D7A2"
                }
            // user choose wrong answer
            } else if (question.choices[index].isHeld && !(question.choices[index].text === question.correct)){
                style = {
                    ...style,
                    backgroundColor: "#F8BCBC",
                    color:"grey"
                }
            // style correct answer if user did not choose correctly
            } else if (!question.choices[index].isHeld && (question.choices[index].text === question.correct)){
                style = {
                    ...style,
                    backgroundColor:"#94D7A2"
                }
            // unchoosen incorrected choices
            } else {
                style = {
                    ...style,
                    backgroundColor:"white",
                    color:"grey"
                }
            }
            return (
                <button 
                    key={index}
                    style={style}>
                    {choice.text}
                </button>
            )
        }
    })

    return (
        <div className="question-container">
            <h3>{question.text}</h3>
            <div className="choice-container">{choices}</div>
        </div>
    )
}