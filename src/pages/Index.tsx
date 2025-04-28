
import React, { useEffect, useState } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Hero from '../components/Hero';
import SemiCircleNav from '../components/SemiCircleNav';
import Navbar from '../components/Navbar';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-frameworkx-black">
        <div className="w-16 h-16 border-t-4 border-frameworkx-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-frameworkx-black">
      <ParticleBackground />
      
      {/* Add Navbar */}
      <Navbar />
      
      <div className="content px-4">
        <Hero />
      </div>
      
      <SemiCircleNav />
    </div>
  );
};

export default Index;
