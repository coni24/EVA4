import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import { obtenerUsuario } from '@/Firebase/Promesas';

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [autenticar, setAutenticar] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre === 'admin' && password === 'admin') {
      setAutenticar(true);
      router.push('/inicio');
    } else {
      try {
        const usuario = await obtenerUsuario(nombre);
        if (usuario && usuario.password === password) {
          setAutenticar(true);
          router.push('/inicio');
        } else {
          alert('Acceso denegado');
        }
      } catch (e) {
        console.error('Error al iniciar sesión:', e);
        alert('Algo ocurrió. Por favor, intenta nuevamente.');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.textSection}>
        <h1>RHODE</h1>
      </div>
      <div className={styles.formSection}>
        <h2>LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>USUARIO:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className={styles.inputGroup}>
            <label>CONTRASEÑA:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className={styles.loginButton}>INGRESAR</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
