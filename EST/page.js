import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

function App() {
    return (
        <Router>
            <nav style={{ padding: "10px", background: "#eee" }}>
                <Link to="/" style={{ margin: "10px" }}>Home</Link>
                <Link to="/about" style={{ margin: "10px" }}>About</Link>
                <Link to="/contact" style={{ margin: "10px" }}>Contact</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    );
}

export default App;

export default function Home()
{
    return <h1>Home Page</h1>;
}

export default function About()
{
    return <h1>About Page</h1>;
}

export default function Contact()
{
    return <h1>Contact</h1>;
}
