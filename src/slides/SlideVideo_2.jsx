import React from 'react';

export const SlideVideo_2 = ({ videoUrl }) => {
  console.log("El enlace que recibe el slide es:", videoUrl);

  return (
    // Contenedor principal que centra el contenido y evita desbordes
    <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center p-2 overflow-hidden">
      
      {/* Verificamos si videoUrl existe antes de intentar renderizar */}
      {videoUrl ? (
        <div 
          className="bg-black rounded-4 overflow-hidden shadow-sm d-flex justify-content-center align-items-center"
          style={{
            // Propiedad moderna de CSS para videos verticales (9:16)
            aspectRatio: '9 / 16',
            // Altura máxima del 65% de la pantalla para que NUNCA tape los botones de abajo
            maxHeight: '65vh',
            // Permite que se adapte en altura y calcule el ancho proporcionalmente
            height: '100%',
            width: 'auto',
            maxWidth: '100%'
          }}
        >
          <video
            className="w-100 h-100"
            style={{ objectFit: 'contain' }}
            controls
            playsInline
            controlsList="nodownload"
            preload="metadata"
            src={videoUrl}
          />
        </div>
      ) : (
        <h4 className="text-white text-center p-3">Error: No llegó el enlace del video</h4>
      )}

    </div>
  );
};