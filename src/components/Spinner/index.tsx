const Spinner = () => {
  return (
    <main className="text-center">
      <div className="flex justify-center items-center h-screen flex-col">
        <h2 className="text-white">Loading...</h2>
        <p>Hopefully not for too long</p>
        <div className="loader"></div>
      </div>
      <style jsx>{`
          .loader {
            border: 4px solid rgba(255, 255, 255, 0.3); // Gris clair
            border-top: 4px solid #3498db; // Bleu
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 2s linear infinite;
          }
  
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
    </main>
  );
};

export default Spinner;