import React from 'react';
import './Footer.css'; // Asegúrate de que este archivo CSS esté en la misma carpeta

// Importa los íconos que necesitas
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Dalila Limbett Reyes Perez</p>
        
        
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=100064110936347" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={24} />
          </a>
       
          <a href="https://dalilareyes.me" target="_blank" rel="noopener noreferrer">
            
          </a>
          <a href="https://github.com/Dalila-Reyes" target="_blank" rel="noopener noreferrer">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
