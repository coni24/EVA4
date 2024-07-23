import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/inicio.module.css';
import Image from 'next/image';
import dos from '../assets/imgs/dos.jpeg';


const Inicio = () => {
  const router = useRouter();

const handleNavigation = (path: string) => {
  router.push(path);
  };


  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li onClick={() => handleNavigation('/RegistrarUsuario')}>REGISTRAR NUEVO USUARIO</li>
          <li onClick={() => handleNavigation('/RegistrarProductos')}>REGISTRAR PRODUCTOS</li>
          <li onClick={() => handleNavigation('/Visualizar')}>VISUALIZAR REGISTRADO</li>
          <li onClick={()=> handleNavigation('/Login')}>SALIR</li>
        </ul>
      </nav>
      <div className={styles.mainContent}>
        <div className={styles.imagen}>
          <Image src={dos} alt="inicio" className={styles.mainImagen} />
        </div>
        <div className={styles.textoImagen}>
          <h1 className={styles.titulo}></h1>
          <p className={styles.description}>We're BLUSHING the WORLD of rhode..</p>
        </div>
      </div>
    </div>

  
  );
};


export default Inicio;
