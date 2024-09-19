import React, { useState } from 'react';
import axios from 'axios';
import coronaImage from './assets/corona.png'; // Asegúrate de que la ruta sea correcta
import Footer from './Footer'; // Asegúrate de que el nombre sea correcto
import './Chatbot.css'; // Si tienes estilos para Chatbot

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    setError(null);
    setIsLoading(true);

    const userMessage = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/chat', { prompt: input });
      handleResponse(response.data.response); // Llama a handleResponse en lugar de agregar directamente el mensaje
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema al procesar tu solicitud. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }

    setInput('');
  };

  const handleResponse = (response) => {
    const maxLength = 80; // Establece la longitud máxima de cada mensaje
    const messagesArray = [];
    let currentIndex = 0;

    while (currentIndex < response.length) {
      let nextIndex = currentIndex + maxLength;

      if (nextIndex >= response.length) {
        messagesArray.push(response.substring(currentIndex));
        break;
      }

      let lastSpaceIndex = response.lastIndexOf(' ', nextIndex);
      if (lastSpaceIndex === -1) {
        lastSpaceIndex = nextIndex; // Esto se asegurará de no entrar en un bucle infinito
      }

      messagesArray.push(response.substring(currentIndex, lastSpaceIndex));
      currentIndex = lastSpaceIndex + 1; // Mueve el índice al siguiente carácter después del espacio
    }

    const botMessages = messagesArray.map(message => ({
      text: formatMessage(message), // Aplica formato al mensaje
      sender: 'bot'
    }));
    setMessages(prevMessages => [...prevMessages, ...botMessages]);
  };

  // Función para formatear mensajes
  const formatMessage = (message) => {
    const formattedMessage = message
      .split('\n') // Divide el mensaje en líneas
      .map((line, index) => `<li>${line}</li>`) // Crea un <li> para cada línea
      .join(''); // Une los <li> en un solo string

    return `<ul style="padding-left: 20px;">${formattedMessage}</ul>`; // Crea una lista y aplica indentación
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <img src={coronaImage} alt="logo" className="cartoon-image" />
        <h1>Open IA </h1>
        <h3>¿En qué puedo ayudarte?</h3>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <span className="badge" dangerouslySetInnerHTML={{ __html: msg.text }}></span>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button className="btn send-button" onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
      <Footer /> {/* Agrega el Footer aquí */}
    </div>
  );
};

export default Chatbot;
