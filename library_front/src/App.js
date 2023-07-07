import Navbar from './components/Navbar'
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Add from './components/Add'
import Indexpage from './components/Indexpage'
import Login from './components/Login'
import News from './components/News'
import About from './components/About'
import Search from './components/Search'
import Register from './components/Register'
import Book from './components/Book'
import Profile from './components/Profile'
import MyBooks from './components/MyBooks'


function App() {
  return (
    <div className="App">
     
        <div className="navbar">
        <Navbar/>
          <Routes> 
            <Route path="/search" element={<Search/>}/> 
            <Route path="/add" element={<Add />}/>
            <Route path="/" element={<Indexpage />}/> 
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/books/:id" element={<Book />} />
            <Route path="/mybooks" element={<MyBooks/>} />
            <Route path="/profile/:user_profile_id" element={<Profile/>}/> 
          </Routes>
       </div>

    </div>
  );
}

export default App;
