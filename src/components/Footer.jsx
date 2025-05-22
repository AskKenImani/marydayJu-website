import React from 'react';
import styles from './Footer.module.css';

function Footer({ visitorCount, dateTime }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>Date/Time: {dateTime.toLocaleString()}</p>
        <div className="socials">
          <a href="#">Facebook</a> |
          <a href="#">Twitter</a> |
          <a href="#">Instagram</a> |
          <a href="#">Tiktok</a>
        </div>
        <p>&copy; {new Date().getFullYear()} MaryDayJu. All rights reserved.</p>
        <p>Built with ❤️ by <a href= "https://kenmaticssolutionservices.com" target="_blank">Kenmatics Solution Services.</a></p>
      </div>
    </footer>
  );
}

export default Footer;
