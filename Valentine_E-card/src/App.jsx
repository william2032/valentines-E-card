import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link, Routes
} from "react-router-dom";
import Card from "./components/Card.jsx";
import ECard from "./components/Ecard.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Card />} />
                <Route path="/card" element={<ECard />} />
            </Routes>
        </Router>

    );
};

export default App;
