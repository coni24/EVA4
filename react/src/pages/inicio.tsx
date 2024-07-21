import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/inicio.module.css';

const Inicio = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.menuSection}>
        <ul>
          <li onClick={() => handleNavigation('/RegistrarUsuario')}>Registrar nuevo usuario</li>
          <li onClick={() => handleNavigation('/RegistrarProductos')}>Registro según temática</li>
          <li onClick={() => handleNavigation('/Visualizar')}>Visualizar lo registrado</li>
          <li onClick={handleLogout}>Salir</li>
        </ul>
      </nav>
    </div>
  );
};

export default Inicio;
