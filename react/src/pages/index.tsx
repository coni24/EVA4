// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Inicio from './inicio';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
  
    router.push('/Login');
  }, [router]);

  return Inicio; 
};

export default Home;
