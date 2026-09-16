import React from 'react';

export const SlideVideo_2 = ({ videoUrl }) => {
  // Esto nos avisará en la consola si el componente está recibiendo el enlace o llega vacío
  console.log("El enlace que recibe el slide es:", videoUrl);

  return (
    <div className="position-relative w-100 h-100 bg-black rounded-4 d-flex justify-content-center align-items-center overflow-hidden">
      
      {/* Verificamos si videoUrl existe antes de intentar renderizar el video */}
      {videoUrl ? (
        <video
          className="w-100 h-100"
          style={{ objectFit: 'contain' }}
          controls
          playsInline
          controlsList="nodownload"
          preload="metadata"
          src={videoUrl} /* <-- CAMBIO CLAVE: Ponemos el src aquí directo, no usamos <source> */
        />
      ) : (
        <h4 className="text-white">Error: No llegó el enlace del video</h4>
      )}

    </div>
  );
};