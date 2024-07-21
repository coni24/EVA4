import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/inicio');
    } else {
      alert('Acceso denegado');
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
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
