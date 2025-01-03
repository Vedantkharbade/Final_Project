import React from 'react'
import NavBar from '../components/LandingPage/NavBar';
import Hero from '../components/LandingPage/Hero';
import ChatForm from '../components/LandingPage/ChatForm';
import FeaturePage from '../components/LandingPage/FeaturePage';
import Company from '../components/LandingPage/Company';
import Result from '../components/LandingPage/Result';
import Creator from '../components/LandingPage/Creator';
import Engagement from '../components/LandingPage/EngagementPage';
import Footer from '../components/LandingPage/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="section-margin ">
        <NavBar />
      </section>
      <section className="section-margin  ">
        <Hero />
      </section>
      <section className="section-margin ">
        <ChatForm/>
      </section>
       
      <section className="section-margin ">
        <FeaturePage/>
      </section>
      
      <section className="section-margin ">
        <Company />
      </section>
      
      <section className="section-margin ">
        <Result />
      </section>
  
      <section className="section-margin ">
        <Creator />
      </section>
          
      <section className="section-margin ">
        <Engagement/>
      </section>
      
      <section className="section-margin ">
        <Footer />
      </section>
    </div>
  );
}

export default LandingPage
