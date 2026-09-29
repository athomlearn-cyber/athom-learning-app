import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

// Añadimos clientName y primaryColor como props opcionales
export const SlideCertificado = ({ clientName, primaryColor }) => {
  const [nombre, setNombre] = useState('');
  const [generando, setGenerando] = useState(false);

  // Usamos el color del cliente o un verde por defecto (#28a745)
  const brandColor = primaryColor || '#28a745';

  const descargarCertificado = () => {
    setGenerando(true);

    const imagenFondo = new Image();
    imagenFondo.src = '/assets/diploma_base.png';

    imagenFondo.onload = () => {
      try {
        const doc = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        doc.addImage(imagenFondo, 'PNG', 0, 0, 297, 210);

        doc.setFontSize(40);
        doc.setTextColor(40, 167, 69); 
        doc.setFont("helvetica", "bold");

        doc.text(nombre, 148.5, 110, { align: 'center' });

        doc.save(`Certificado_${nombre.replace(/\s+/g, '_')}.pdf`);
        setGenerando(false);
      } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Hubo un error al generar el certificado. Revisa la consola.");
        setGenerando(false);
      }
    };

    imagenFondo.onerror = () => {
      alert("Error: No se pudo encontrar la imagen diploma_base.png en la carpeta assets.");
      setGenerando(false);
    };
  };

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white p-4 text-center rounded-4 shadow-sm">
      
      <img 
        src="/assets/trofeo.png" 
        alt="Éxito" 
        className="mb-4 shadow-sm"
        style={{ 
          width: '25%', 
          maxWidth: '200px', 
          borderRadius: '8px',
          objectFit: 'contain'
        }} 
      />
      
      <h2 className="fw-bold mb-3" style={{ color: brandColor }}>¡Curso Completado!</h2>
      
      <p className="mb-4 text-muted fs-5">
        {clientName ? `Capacitación oficial de ${clientName}.` : ''} Ingresa tu nombre completo para emitir tu certificado.
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
        className="btn btn-lg px-5 py-3 shadow text-white"
        style={{ borderRadius: '12px', fontWeight: 'bold', backgroundColor: brandColor, border: 'none' }}
        disabled={nombre.trim() === '' || generando}
        onClick={descargarCertificado}
      >
        {generando ? 'Generando PDF...' : 'Descargar Certificado'}
      </button>
    </div>
  );
};