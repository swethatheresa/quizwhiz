import React from 'react'
import './Navbar.css'
import { Link } from 'react-scroll'

function Navbar() {
  return (
    <header className='navbar'>
        <div></div>
        <div className='links'>
          <div className='item'><Link  className='i' to='home'  spy={true} smooth={true} offset={-10} duration={100}>Home</Link></div>
          <div className='item'><Link  className='i' to='questions'  spy={true} smooth={true} offset={-140} duration={100}>Quiz</Link></div>
        </div>
    </header>
  );
}

export default Navbar;
