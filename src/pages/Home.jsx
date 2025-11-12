import React from 'react';
import Spinner from '../components/Spinner';
import Banner from '../components/Banner';
import LatestBooks from '../components/LatestBooks';
import AboutSection from '../components/AboutSection';
import BookOfTheWeek from '../components/BookOfTheWeek';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <LatestBooks></LatestBooks>
            <BookOfTheWeek></BookOfTheWeek>
            <AboutSection></AboutSection>
        </div>
    );
};

export default Home;