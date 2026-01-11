body {
  margin: 0;
  height: 100vh;
  background: radial-gradient(#050520,#000);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial;
  color: white;
}

#container {
  text-align: center;
}

#core {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(#00ffff,#003344);
  box-shadow: 0 0 40px #00ffff;
  animation: pulse 2s infinite;
  margin: 0 auto 30px;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

#panel button {
  padding: 10px 15px;
  margin: 8px;
  background: black;
  color: #00ffff;
  border: 1px solid #00ffff;
  cursor: pointer;
}
