import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link, Routes
} from "react-router-dom";
import Card from "./components/Card.jsx";
import ECard from "./components/Ecard.jsx";
import Edit from './components/Edit.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Card />} />
                <Route path="/card" element={<ECard />} />
                <Route path="/edit" element={<Edit />} />
            </Routes>
        </Router>

    );
};

export default App;
