import React from 'react';
import Spinner from '../components/Spinner';
import Banner from '../components/Banner';
import LatestBooks from '../components/LatestBooks';
import AboutSection from '../components/AboutSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
            <AboutSection></AboutSection>
        </div>
    );
};

export default Home;