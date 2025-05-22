import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMsg('No account found with this email.');
        setLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.password !== password) {
        setErrorMsg('Incorrect password.');
        setLoading(false);
        return;
      }

      onLogin(userDoc.id);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>Login</h3>
      
      <div className={styles.inputGroup}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="******"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <p>
        Don't have an account?{' '}
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => onLogin('register')}>
          Register
        </span>
      </p>
    </form>
  );
}

export default LoginForm;
