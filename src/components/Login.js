import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Home from './Home';
const LOGIN_URL = 'http://localhost:8080/api/v1/secured/login';

const Login = () => {
  const { setAuth } = useContext(AuthContext);

  const emailRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [role, setPosts] = useState('');
  const [success, setSuccess] = useState(false);	
  const data = email;

  // localStorage.username = $("#username").val().trim();
  const adminScreen = async () => {
    setAuth({});
    navigate('/admin');
  }
  const userScreen = async () => {
    navigate('/Home');
    return(
      <>
        <section>	
          <Home message={data} />	
        </section>	
        </>
    )
  }

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.get(LOGIN_URL, {
        auth: {
          username: email,
          password: pwd
        }
      }).then((response)=>{
        setPosts(response.data.authorities[0].authority);
      
      setEmail("");
      setPwd("");
      setSuccess(true);
    });
    if (role === "ADMIN") {
     
      adminScreen();
      }
      else {
        
        userScreen();
      }

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
      
    }
    // var role1=success.authority;
    
  }

  return (
    <>
    {success ? (	
        <section>	
          <Home message={data} />	
        </section>	
      ) : (
      <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </section>
        )}
    </>
  );
}

export default Login