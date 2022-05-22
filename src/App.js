import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
// import Home from './components/Home';
// import About from './components/About';
// import Events from './components/Events';
// import AnnualReport from './components/AnnualReport';
// import Teams from './components/Teams';
// import Blogs from './components/Blogs';
// import SignUp from './components/SignUp';

const App = () => {
    return (
        <Router>
            <Navbar />
            {/* <Routes>
                <Route exact path="/" component={<Home />} />
                <Route exact path="/about" component={<About />} />
                <Route exact path="/events" component={<Events />} />
                <Route exact path="/annual" component={<AnnualReport />} />
                <Route exact path="/team" component={<Teams />} />
                <Route exact path="/blogs" component={<Blogs />} />
                <Route exact path="/sign-up" component={<SignUp />} />
            </Routes> */}
        </Router>
    );
};

export default App;
