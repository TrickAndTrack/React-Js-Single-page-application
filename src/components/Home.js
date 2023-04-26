import { useNavigate } from "react-router-dom";

const Home = (props) => {
    const navigate = useNavigate();
    
    const logout = async () => {
        navigate('/login');
    }
  
    return (
        <section className="HomeSection">
            <div className="HomeflexGrow">
                <h1>Home</h1>
                <br />
                <p>You are logged in!</p>
                <div>{props.message}</div>
                <br />
                <br />
            </div>
            
            <div className="HomeflexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home