import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from '@mui/material'
import Home from './Views/Home'
import Curso from './Views/Curso'

function App() {
  return (
    <div className="App">
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" href="/">Inicio</Button>
					<Button color="inherit" href="/">Cursos</Button>
					<Button color="inherit" href="/about">Usuarios</Button>
				</Toolbar>
			</AppBar>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="about" element={<About />} />
				<Route path="curso" element={<Curso />} />
			</Routes>
    </div>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
