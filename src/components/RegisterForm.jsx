import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function RegisterForm({ onRegister }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false); // NEW

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setErrorMsg('Email already exists.');
        setLoading(false);
        return;
      }

      await addDoc(usersRef, {
        name: fullName,
        email,
        password,
        isAdmin: false,
        selectedPackage: '',
        amountContributed: 0,
        totalAmount: 0,
      });

      onRegister('login'); // Switch to login form
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMsg('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <h3 className={styles.formTitle}>Register</h3>

      <div className={styles.inputGroup}>
        <label className={styles.label}>Full Name</label>
        <input
          type="text"
          placeholder="Example One"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={styles.input}
        />
      </div>
      

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
        {loading ? 'Registering...' : 'Register'}
      </button>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <p>
        Already registered?{' '}
        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => onRegister('login')}>
          Login
        </span>
      </p>
    </form>
  );
}

export default RegisterForm;
