import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

// 1. Este componente DEBE estar en su propio archivo o fuera de App()
export const SlideCertificado = () => {
  const [nombre, setNombre] = useState('');
  const [generando, setGenerando] = useState(false);

  const descargarCertificado = () => {
    setGenerando(true);

    // Creamos un objeto de imagen nativo de HTML
    const imagenFondo = new Image();
    imagenFondo.src = '/assets/diploma_base.png';

    // Le decimos a React: "Espera a que la imagen cargue y luego arma el PDF"
    imagenFondo.onload = () => {
      try {
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        // Ahora le pasamos el objeto imagen ya cargado en lugar de un texto
        doc.addImage(imagenFondo, 'PNG', 0, 0, 297, 210);

        // Configuramos el texto
        doc.setFontSize(40);
        doc.setTextColor(40, 167, 69); // Color verde
        doc.setFont("helvetica", "bold");

        // Centramos el nombre (148.5 es el centro del A4)
        doc.text(nombre, 148.5, 110, { align: 'center' });

        // Descargamos el archivo
        doc.save(`Certificado_${nombre.replace(/\s+/g, '_')}.pdf`);
        
        setGenerando(false);
      } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Hubo un error al generar el certificado. Revisa la consola.");
        setGenerando(false);
      }
    };

    // Si la imagen no se encuentra en la carpeta assets, lanzamos un error
    imagenFondo.onerror = () => {
      alert("Error: No se pudo encontrar la imagen diploma_base.png en la carpeta assets.");
      setGenerando(false);
    };
  };

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white p-4 text-center rounded-4 shadow-sm">
      
      <img 
        src="/assets/trofeo.png" /* Puedes cambiar esto por otra imagen como /assets/medalla.png */
        alt="Éxito" 
        className="mb-4 shadow-sm"
        style={{ 
          width: '25%', 
          maxWidth: '200px', /* Controla qué tan grande se ve en pantalla */
          borderRadius: '8px',
          objectFit: 'contain'
        }} 
      />
      <h2 className="text-success fw-bold mb-3">¡Curso Completado!</h2>
      <p className="mb-4 text-muted fs-5">
        Ingresa tu nombre completo para emitir tu certificado.
      </p>
      
      <input 
        type="text" 
        className="form-control form-control-lg mb-4 text-center shadow-sm" 
        style={{ maxWidth: '400px', borderRadius: '12px', border: '2px solid #e9ecef' }}
        placeholder="Ej: Juan Pérez"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      
      <button 
        className="btn btn-success btn-lg px-5 py-3 shadow"
        style={{ borderRadius: '12px', fontWeight: 'bold' }}
        disabled={nombre.trim() === '' || generando}
        onClick={descargarCertificado}
      >
        {generando ? 'Generando PDF...' : 'Descargar Certificado'}
      </button>
    </div>
  );
};