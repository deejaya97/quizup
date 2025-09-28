import React, { useState, useRef } from 'react'
import './Quiz.css'
import { useParams } from "react-router-dom";
import { data as chemistryQuestions} from '../../assets/chemistry'
import { data as triviaQuestions} from '../../assets/trivia'
import { data as mathQuestions} from '../../assets/math'
import { data as biologyQuestions} from '../../assets/biology'


 // pick 10 random questions from data
  let randomChemQuestions = []; 
  while (randomChemQuestions.length < 10) {
    const randomIndex = Math.floor(Math.random() * chemistryQuestions.length);
    const randomQuestion = chemistryQuestions[randomIndex];
    if (!randomChemQuestions.includes(randomQuestion)) {
      randomChemQuestions.push(randomQuestion);
    }
  }

    let randomTriviaQuestions = []; 
  while (randomTriviaQuestions.length < 10) {
    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    const randomQuestion = triviaQuestions[randomIndex];
    if (!randomTriviaQuestions.includes(randomQuestion)) {
      randomTriviaQuestions.push(randomQuestion);
    }
  }

 let randomMathQuestions = []; 
  while (randomMathQuestions.length < 10) {
    const randomIndex = Math.floor(Math.random() * mathQuestions.length);
    const randomQuestion = mathQuestions[randomIndex];
    if (!randomMathQuestions.includes(randomQuestion)) {
      randomMathQuestions.push(randomQuestion);
    }
  }

    let randomBiologyQuestions = []; 
  while (randomBiologyQuestions.length < 10) {
    const randomIndex = Math.floor(Math.random() * biologyQuestions.length);
    const randomQuestion = biologyQuestions[randomIndex];
    if (!randomBiologyQuestions.includes(randomQuestion)) {
      randomBiologyQuestions.push(randomQuestion);
    }
  }

export default function Quiz() {
  const { topic  } = useParams(); 
  console.log(topic );
  let randomQuestions = []; 

  if (topic  === 'chemistry') {
    randomQuestions = randomChemQuestions;
  }else if (topic  === 'trivia'){
    randomQuestions = randomTriviaQuestions;
   }else if (topic  === 'math'){
    randomQuestions = randomMathQuestions;
  }else if (topic  === 'biology'){
    randomQuestions = randomBiologyQuestions; 
  }

  // Initialize the topic
  const initCapTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

  let [index, setIndex] = useState(0);
  let [question, setQuestion]= useState(randomQuestions[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  
 let option_array = [Option1, Option2, Option3, Option4]; 

  const checkAns = (e, ans) => {
    if (lock === false){
       if(ans === question.ans){
      e.target.classList.add('correct');
      setLock(true);
      setScore(prev=>prev+1);
    }else{
      e.target.classList.add('wrong');
      setLock(true);
      option_array[question.ans-1].current.classList.add('correct');
    }   
    }
  }

  const nextQuestion = () => {
    if (lock === true){
      if(index === randomQuestions.length-1){
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(randomQuestions[index]);
      setLock(false);
      option_array.map((option)=>{
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
        return null;
      })
    }
  }

  const reset = () => {
    setIndex(0);
    setQuestion(randomQuestions[0]);
    setLock(false);
    setScore(0);
    setResult(false);
    option_array.map((option)=>{
      option.current.classList.remove('wrong');
      option.current.classList.remove('correct');
      return null;
    })
  }

  return (
    <div className='container'>
      <h1>{initCapTopic} </h1>
      <hr />
      {result?<></>:<>
      <h2>{question.question}</h2>
      <ul> 
        <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
         </ul>
         <button onClick={nextQuestion}>Next</button>
         <div className='index'> {index + 1} of {randomQuestions.length} questions</div></>}
    {result?<>         
    <h2>You scored {score} out of {randomQuestions.length}</h2>
    <button onClick={reset}>Try again</button> </>
    :<></>} 
    </div>
  )
}


