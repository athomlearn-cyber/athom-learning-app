
export const Slide1 = () => (
  // 1. Contenedor principal con posición relativa y h-100 para ocupar el alto de la card
  <div className="position-relative w-100 h-100 overflow-hidden rounded-4">
    
    {/* 2. IMAGEN DE FONDO */}

      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="position-absolute w-100 h-100 object-fit-cover opacity-40"
      >
        <source src="/assets/agriculture.mp4" type="video/mp4" />
      </video>
 

    {/* 3. CONTENIDO DE TEXTO */}
    {/* Usamos d-flex y align-items-center para centrar el texto verticalmente */}
    <div 
      className="position-relative container h-100 d-flex flex-column align-items-center justify-content-center text-center p-5"
      style={{ zIndex: 1 }} // Asegura que esté por encima de la imagen
    >
      {/* Caja de texto con fondo semitransparente (Glassmorphism) para mejorar legibilidad */}
      <div 
        className="p-4 rounded-4 shadow-lg text-white" 
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscuro suave
          backdropFilter: 'blur(5px)', // Efecto borroso suave detrás
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <h2 className="slide-title display-5 fw-bold mb-3 text-white">
          Trazabilidad Agrícola:
        </h2>
        <p className="lead fs-3 mb-0 text-white-50">
           La conexion entre la tecnología y el campo.
        </p>
      </div>
    </div>
  </div>
);