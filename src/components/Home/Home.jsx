import React from 'react'
import './Home.css'
import { Link } from 'react-scroll'
import { useState, useEffect } from 'react'
import { Configuration, OpenAIApi } from "openai";
import { Grid } from "react-loader-spinner"
import Question from '../Question/Question';
import wizard from '../../assets/wizard.png';
import z from '../../assets/z.png';


function Home() {
  const [input,setInput]=useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [viewscore, setViewScore] = useState(false);
  const calculateScore = () => {
    setScore(score + 1);
  }
  const handleChange = (e)=>{
    setInput(e.target.value);
  }
  const handleSubmit = async (e)=>{
    setQuestions();
    setViewScore(false);
    e.preventDefault();
    setScore(0);
    setLoading(true);
    const configuration = new Configuration({
      organization: "org-Rm0qdn9Qbh5zlQp9JpVZpTUU",
      apiKey: "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",
     });
    const key = "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";
    const openai = new OpenAIApi(configuration);
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`
        },
        body: JSON.stringify({
          model: "text-davinci-003",
          prompt: `prepare 5 MCQ questions on ${input} with options a,b,c,d the answer key is a,b,c,d in proper json format exactly like this [{"Question":"Which of the following is not a C++ keyword?","A":"class","B":"begin","C":"int","D":"String","Answer":"B"} with no \n and spaces in between. Limit to 1024 tokens`,
          max_tokens: 2048,
          temperature: 1
        })
      })

      const data = await response.json()
      setInput('');
      console.log(data.choices[0]);
      const temp=data.choices[0].text.trim().replace(/\n/g, '');
      console.log(typeof temp);
      console.log(temp);
      const tmp = JSON.parse(temp);
      console.log(tmp);
      setQuestions([...tmp]);
      console.log(typeof questions);
      console.log(questions);
  };
  
  useEffect(() => {
    if (questions) {
      console.log('questions', questions);
      setLoading(false);
    }
  }, [questions]);

  

  return (
    <div id='home' >
      <div className='z'>
      <div className='mytitle'>
        <div className='zpng'>
        <h1 className="title">QuizWhi </h1><img src={z} className='zimg' alt="z" />
        </div>
        <p className="desc">QuizWiz is a versatile quiz app that allows users to create customized quizzes on any topic or text of your choice.Try it out today and see for yourself!</p>
        <Link to="questions" spy={true} offset={-140} duration={5000} className="btn">Get Started</Link>
      </div>
      <div >
        <img className='img' src={wizard} alt="wizard"  />
      </div>
      </div>
      <div className='container'>
        <h2 className="label">Enter the text:</h2>
        <form onSubmit={handleSubmit}id='questions'className='input1'>
          <textarea type="textarea" onChange={handleChange} value={input} className="topic" placeholder="Type Here" />
          <button type="submit" className="btn1">SUBMIT</button>
        </form>
      </div>
      <div className='content'>
         <h2 className="label2">{loading ? <Grid color="#DEBC09" />: questions && (
         
         <div className='questions'>
            <h1> QUESTIONS </h1> 
            {questions && questions.map((que,index) => (
              <Question key={index} question={que} calculateScore={calculateScore}/>
            ))}
            <div className='result'>
              {!viewscore ? <button onClick={()=>{setViewScore(true)}} type="submit" className="btn2">VIEW SCORE</button>: <h1 className='myscore'>&emsp;&emsp;Score: {score}/5</h1>}
            </div>
          </div>)
          } </h2>  
      </div>  
    </div>
  );
}

export default Home;
