import React,{useState} from 'react'
import './Question.css'
function Question({question,calculateScore}) {
  const [selected,setSelected]=useState(null);
  const [iscorrect,setIsCorrect]=useState(false);
  const [showanswer,setShowAnswer]=useState(false);

  const handleClick = (option) => {
    
    if(selected === null)
    {
      setSelected(option);
      if (option === question.Answer) {
        setIsCorrect(true);
        calculateScore();
      }
      setShowAnswer(true);
    }
  }

  return (
    <div className='que'>
      <div className='que-text'>Q.  {question.Question}</div>
      <div className='meh'>
      
      <div className='options'>
        <button onClick={()=>{handleClick('A')} } className={selected === 'A' ? ( iscorrect ? 'correct': 'incorrect') :'option'}>{question.A}</button >
        <button onClick={()=>{handleClick('B')}} className={selected  === 'B'? ( iscorrect ? 'correct': 'incorrect') :'option'}>{question.B}</button >
        <button onClick={()=>{handleClick('C')}} className={selected  === 'C'? ( iscorrect ? 'correct': 'incorrect') :'option'}>{question.C}</button >
        <button onClick={()=>{handleClick('D')}} className={selected  === 'D'? ( iscorrect ? 'correct': 'incorrect') :'option'}>{question.D}</button >
      </div>
      <div></div>
      </div>
        {showanswer ? <div> The answer is {question.Answer} </div> : ""}
    </div>
  )
}

export default Question
