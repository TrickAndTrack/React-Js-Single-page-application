import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, useNavigate } from "react-router-dom";

const PWD_REGEX = /^[a-zA-Z0-9]{1,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
const FIRSTNAME_REGEX = /^[A-z][A-z]{1,23}$/;
const LASTNAME_REGEX = /^[A-z][A-z]{1,23}$/;
const PHONENUMBER_REGEX = /^[0-9]{10,15}$/;
const DOB_REGEX = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

const REGISTER_URL = 'http://localhost:8080/api/v1/register'

const Register = () => {
    const errRef = useRef();
    const emailRef = useRef();
    const navigate = useNavigate();

    const [firstname, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);
    
    const [lastname, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [dob, setDOB] = useState('');
    const [validDOB, setValidDOB] = useState(false);
    const [dobFocus, setDobFocus] = useState(false);

    const [addressLineOne, setAddressLineOne] = useState('');

    const [addressLineTwo, setAddressLineTwo] = useState('');

    const [pincode, setPincode] = useState('');

    const [phonenumber, setPhonenumber] = useState('');
    const [validPhonenumber, setValidPhonenumber] = useState(false);
    const [phonenumberFocus, setPhonenumberFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(FIRSTNAME_REGEX.test(firstname));
    }, [firstname])

    useEffect(() => {
        setValidLastName(LASTNAME_REGEX.test(lastname));
    }, [lastname])

    useEffect(() => {
        setValidDOB(DOB_REGEX.test(dob));
    }, [dob])

    useEffect(() => {
        setValidPhonenumber(PHONENUMBER_REGEX.test(phonenumber));
    }, [phonenumber])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd, firstname, lastname, dob, phonenumber, email])

    const login = async () => {
        navigate('/Home');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            axios.post(REGISTER_URL,
            {
                email: email,
                firstname: firstname,
                lastname: lastname,
                addressLineOne: addressLineOne,
                addressLineTwo: addressLineTwo,
                pincode: pincode,
                dob: dob,
                phonenumber: phonenumber,
                pwd: pwd
            }).then((response) => {
                setSuccess(response.data)});
    

            //clear state and controlled inputs
            //need value attrib on inputs for this
            setFirstName("");
            setLastName("");
            setAddressLineOne("");
            setAddressLineTwo("");
            setPincode("");
            setPhonenumber("");
            setDOB("");
            setEmail("");
            setPwd('');
            setMatchPwd('');

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    if(success)
        {
            login();
        }

    return (
        <>
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>

                    <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter a valid email address.<br />
                        </p>

                        {/* Setting Firstname */}

                        <label htmlFor="firstname">
                            Firstname:
                            <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstname ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            autoComplete="off"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstname}
                            required
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="fastnamenote"
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                        />
                        <p id="fastnamenote" className={firstNameFocus && firstname && !validFirstName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            2 to 24 characters.<br />
                            Accepts only characters.
                        </p>

                        {/* Setting Lastname */}

                        <label htmlFor="lastname">
                            Lastname:
                            <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validLastName || !lastname ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastname}
                            required
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="lastnamenote"
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                        />
                        <p id="lastnamenote" className={lastNameFocus && lastname && !validLastName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            2 to 24 characters.<br />
                            Accepts only characters.
                        </p>

                        {/* Setting AddressLineOne */}

                        <label htmlFor="addressLineOne">
                            AddressLineOne:
                        </label>
                        <input
                            type="text"
                            id="addressLineOne"
                            autoComplete="off"
                            onChange={(e) => setAddressLineOne(e.target.value)}
                            value={addressLineOne}
                        />

                        {/* Setting AddressLineTwo */}

                        <label htmlFor="addressLineTwo">
                            AddressLineTwo:
                        </label>
                        <input
                            type="text"
                            id="addresslineTwo"
                            autoComplete="off"
                            onChange={(e) => setAddressLineTwo(e.target.value)}
                            value={addressLineTwo}
                        />

                        {/* Setting Pincode */}
                        <label htmlFor="pincode">
                            Pincode:
                        </label>
                        <input
                            type="text"
                            id="pincode"
                            autoComplete="off"
                            onChange={(e) => setPincode(e.target.value)}
                            value={pincode}
                        />

                        {/* Setting Date Of Birth */}
                        <label htmlFor="dob">
                            Date Of Birth
                            <FontAwesomeIcon icon={faCheck} className={validDOB ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validDOB || !dob ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="dob"
                            autoComplete="off"
                            onChange={(e) => setDOB(e.target.value)}
                            value={dob}
                            required
                            aria-invalid={validDOB ? "false" : "true"}
                            aria-describedby="dobnote"
                            onFocus={() => setDobFocus(true)}
                            onBlur={() => setDobFocus(false)}
                        />
                        <p id="dobnote" className={dobFocus && dob && !validDOB ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Enter DOB in DD/MM/YYYY format.<br />
                        </p>

                        {/* Setting Phonenumber */}

                        <label htmlFor="phonenumber">
                            Phonenumber:
                            <FontAwesomeIcon icon={faCheck} className={validPhonenumber ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhonenumber || !phonenumber ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="phonenumber"
                            autoComplete="off"
                            onChange={(e) => setPhonenumber(e.target.value)}
                            value={phonenumber}
                            required
                            aria-invalid={validPhonenumber ? "false" : "true"}
                            aria-describedby="phonenumbernote"
                            onFocus={() => setPhonenumberFocus(true)}
                            onBlur={() => setPhonenumberFocus(false)}
                        />
                        <p id="phonenumbernote" className={phonenumberFocus && phonenumber && !validPhonenumber ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Maximum 10 numbers.
                        </p>

                        {/* Setting Password */}
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validEmail || !validFirstName || !validLastName || !validDOB || 
                            !validPhonenumber || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Sign In</Link>
                        </span>
                    </p>
                </section>
        </>
    )
}

export default Register