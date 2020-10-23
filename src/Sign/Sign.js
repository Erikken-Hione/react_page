import React, {useState, useEffect, useRef} from 'react';
import "./Sign.css";

const Sign = () => {

    //FRONTEND

    // SLIDE EFFECT
	const form = useRef('');
		
	const swapSignUp = () => {
		form.current.classList.add('show');
        arrow.current.classList.add('slide');
	}

	const swapSignIn = () => {
		form.current.classList.remove('show');
        arrow.current.classList.remove('slide');
	}	

	useEffect(() => {
		form.current = document.getElementById('form');
	}, []);
    //

  // Arrow Animation
  const arrow = useRef('');

  useEffect(() => {
      arrow.current = document.getElementById('arrow');
  }, [])

  const swapByArrow = () => {
      arrow.current.classList.toggle("slide");
      if (arrow.current.classList.value.includes('slide')) {
          swapSignUp();
      } else {
          swapSignIn();
      } 
  }        

  // Elements
  const nameChecker = useRef('');
  const emailChecker = useRef('');
  const passwordChekcer = useRef('');

  useEffect(() => {

    //GETTING ELEMENTS
    nameChecker.current = document.querySelector('.sign-up-name');
    emailChecker.current = document.querySelector('.sign-up-email');
    passwordChekcer.current = document.querySelector('.sign-up-password');

    // CHANGE FOCUS BY ENTER
      document.querySelectorAll('.input').forEach(el => {  
          const child = el.children[0]
          child.onkeydown = (e) => {
              if (e.which === 40 || e.which === 13) {
                  if (el.nextElementSibling) {
                      const nextChild = el.nextElementSibling.children[0];
                      nextChild.focus();
                  }
              }

              if (e.which === 38) {
                  if (el.previousElementSibling) {
                      const previousChild = el.previousElementSibling.children[0];
                      previousChild.focus();
                  }
              }
          }
      })
  }, [])

  // FUNCTIONAL INTERACTION

  //SIGN IN SECTION
  //Sign In email Listener
  const [loginEmail, setLoginEmail] = useState('');
  const loginEmailState = (event) => {
    setLoginEmail(event.target.value);
  }

  // Sign In Paswword listener
  const [loginPassword, setLoginPassword] = useState('');
  const loginPasswordState  = (event) => {
    setLoginPassword(event.target.value);
  } 


  //SIGN UP SECTION

  // make the check mark visible if the inputs are valid
  const validationChecker = (regex,obj,el) => {
    if (regex.test(obj) && obj) {
      el.parentElement.classList.add('correct');
      el.parentElement.classList.remove('incorrect');
      return true
    } else if (!regex.test(obj) && obj) {
      el.parentElement.classList.remove('correct');
      el.parentElement.classList.add('incorrect');
      return false
    } else {
      el.parentElement.classList.remove('incorrect');
      return false
    }
  }

  //Sing up name listener
  const [registerName, setRegisterName] = useState('');
  //NAME REGEX
  const nameValidation = /^[a-zA-Z0-9А-Яа-я()]{4,18}$/
  const registerNameState = (event) => {
    setRegisterName(event.target.value);
  }
  useEffect(() => {
    validationChecker(nameValidation, registerName, nameChecker.current);
  }, [registerName])

  // Sign up email listener
  const [registerEmail, setRegisterEmail] = useState('');

  //Email REGEX
  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  const registerEmailState = (event) => {
    setRegisterEmail(event.target.value);
  }
  useEffect(() => {
    validationChecker(emailValidation, registerEmail, emailChecker.current);
  }, [registerEmail])

  //Sign up password listener
  const [registerPassword, setRegisterPassword] = useState('');

  //Password REGEX
  const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,32}/
  const registerPasswordState = (event) => {
    setRegisterPassword(event.target.value);
  }
  useEffect(() => {
    validationChecker(passwordValidation, registerPassword, passwordChekcer.current);
  }, [registerPassword])





  // BACKEND
  const accessToFetch = (el, name) => {
    el.value = '';
    el.placeholder = 'Invalid ' + name
    el.focus();
  };

  const onSubmitSingUp = () => {
    if (!validationChecker(nameValidation, registerName, nameChecker.current)) {
      accessToFetch(nameChecker.current, 'name');
    } else if (!validationChecker(emailValidation, registerEmail, emailChecker.current)) {
      accessToFetch(emailChecker.current, 'email');
    } else if (!validationChecker(passwordValidation, registerPassword, passwordChekcer.current)) {
      accessToFetch(passwordChekcer.current, 'password');
    } else {
      console.log('success');
    }
  }

	return (
	<div className="wrapper">
      	<div className="form-container" id='form'>
            <div onClick={() => swapByArrow()}  className="arrow" id="arrow"></div>  
        	<div className="form sign-up-container">
          		<h1>Create Account</h1>
         		  <div class="social-container">
            		<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            		<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            		<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        		  </div>
          		<span className="help">or use your email</span>
          		<div className="inputs">

        		    <div className="input input_">
        			    
                  <input onChange={registerNameState} type="text" className="sign-up-name" placeholder="Name" id="sign-up-name"/>
        			    
                  <div className="image">
                    <img src={require('../img/user.png')} alt="user_icon" />
                  </div>
            			
                  <div className="info">
                    <ul className="info_list">
                      <li className="list_item">chr range [4,18]</li>
                      <li className="list_item">without a special chr</li>
                    </ul>
                  </div>
            		
                </div>
            	
            		<div className="input input_">
                  <input onChange={registerEmailState} type="email" className="sign-up-email" placeholder="Email" id="sign-up-email"/>
	                
                  <div className="image">
                    <img src={require('../img/email.png')} alt="email_icon" />
                  </div>
            			
                  <div className="info">
                    <ul className="info_list">
                      <li className="list_item">existing email</li>
                      <li className="list_item">correct format</li>
                    </ul>
                  </div>
                </div>

            		<div className="input input_">
                  <input onChange={registerPasswordState} type="password" className="sign-up-password" placeholder="Password" id="sign-up-password"/>
            			
                  <div className="image">
                    <img src={require('../img/lock.png')} alt="password_icon" />
                  </div>
            			
                  <div className="info">
                    <ul className="info_list">
                      <li className="list_item">chr range [6,32]</li>
                      <li className="list_item">at least one special chr</li>
                      <li className="list_item">at least one number</li>
                    </ul> 
                  </div>
            		</div>

          		</div>

          		<p className="help">Private Policy</p>

          		<button onClick={() => {onSubmitSingUp()}} className="submit">Sign Up</button> 
              
          		<p>
                <span onClick={() => {swapSignIn()}} className="swap toSignIn">or use an existing account</span>
              </p>

        	</div>


        	<div className="form sign-in-container">
     		    <h1>Sign In</h1>

      			<div class="social-container">
        		  <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            	<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            	<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
        		</div>

        		<span className="help">or use your account</span>

            <h2>Welcome</h2>

          	<div className="inputs">

          		<div className="input sign-in-email">
          			<input  onChange={loginEmailState} type="email" className="email" placeholder="Email"/>
                  
                <div className="image">
                    <img src={require('../img/email.png')} alt="email_icon" />
                </div>
          		</div>

          		<div className="input sign-in-password">
          			<input onChange={loginPasswordState} type="password" className="password" placeholder="Password"/>
          			
                <div className="image">
                  <img src={require('../img/lock.png')} alt="password_icon" />
                </div>
          		</div>     

        		</div>

        		<p className="help">Forgot Your Password?</p>
          
        		<button className="submit">Sign In</button>
          
        		<p>
              <span onClick={() => {swapSignUp()}} className="swap toSignIn">or create a new account</span>
            </p>
        </div>
      </div>
    </div> 
	)
}

export default Sign;