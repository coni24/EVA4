import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/inicio.module.css';
import Image from 'next/image';
import dos from '../assets/imgs/inicio.jpeg';


const Inicio = () => {
  const router = useRouter();

const handleNavigation = (path: string) => {
  router.push(path);
  };


  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <ul className={styles.menu}>
          <li onClick={() => handleNavigation('/RegistrarUsuario')}>REGISTRAR USUARIO</li>
          <li onClick={() => handleNavigation('/RegistrarProductos')}>REGISTRAR PRODUCTO</li>
          <li onClick={() => handleNavigation('/VisualizarPersonas')}> USUARIOS</li>
          <li onClick={() => handleNavigation('/VisualizarProductos')}>PRODUCTOS</li>
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
