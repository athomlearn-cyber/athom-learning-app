import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { supabase } from '../supabaseClient'; // ⚠️ Ajusta la ruta a tu cliente de Supabase

export const SlideCertificado = ({ courseName, clientName, alumnoNombre, dni }) => {
  const [guardando, setGuardando] = useState(false);

  const manejarDescargaPDF = async () => {
    if (guardando) return;

    try {
      setGuardando(true);

      // 1. Guardar el reporte en Supabase
      const { error } = await supabase
        .from('progreso_reportes')
        .insert([
          {
            operario_dni: dni,
            curso_nombre: courseName || 'Inducción General de Ingreso y Seguridad',
            nota_porcentaje: 100,
            estado: 'Aprobado'
          }
        ]);

      if (error) {
        console.error("Error al guardar en Supabase:", error.message);
      } else {
        console.log("¡Reporte guardado con éxito!");
      }

      // 2. Seleccionar el contenedor del certificado que queremos convertir a PDF
      const elemento = document.getElementById('certificado-pdf');

      // Configuración de html2pdf
      const opciones = {
        margin:       10,
        filename:     `Certificado_${(alumnoNombre || 'colaborador').replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
      };

      // 3. Generar y descargar el PDF automáticamente
      await html2pdf().from(elemento).set(opciones).save();

    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="container-fluid h-100 d-flex flex-column justify-content-center align-items-center p-2 p-md-4 overflow-auto">
      
      {/* Contenedor envuelto con un ID para que html2pdf sepa exactamente qué convertir */}
      <div 
        id="certificado-pdf"
        className="card shadow-lg border-0 p-3 p-sm-4 p-md-5 text-center w-100" 
        style={{ maxWidth: '800px', borderRadius: '24px', backgroundColor: '#fff' }}
      >
        
        {/* Cabecera del Certificado */}
        <h6 className="text-uppercase tracking-widest text-muted fw-bold mb-1 fs-6" style={{ letterSpacing: '2px' }}>
          Certificado de Finalización
        </h6>
        <h3 className="fw-bold text-success mb-3 fs-2">Athom Learning</h3>
        
        <p className="text-secondary small mb-1">Se certifica que el operario / colaborador:</p>
        
        {/* Datos reales del alumno ingresados por DNI */}
        <h1 className="fw-bold text-dark my-2 fs-3 fs-md-2 border-bottom pb-2 text-break">
          {alumnoNombre || 'Colaborador Evaluado'}
        </h1>
        <p className="text-muted fw-semibold mb-3 small">
          DNI: {dni || 'No especificado'}
        </p>

        <p className="text-secondary small mb-2">Ha completado y aprobado satisfactoriamente la capacitación:</p>
        <h5 className="fw-bold text-dark mb-3 fs-5">
          {courseName || 'Protocolos y Buenas Prácticas'}
        </h5>

        <p className="text-muted small mb-4 px-2">
          Otorgado para la empresa <strong className="text-dark">{clientName}</strong>, validando el cumplimiento de los estándares operativos y de seguridad.
        </p>

      </div>

      {/* Botón fuera del contenedor del PDF para que no salga impreso en el archivo */}
      <div className="mt-4">
        <button 
          onClick={manejarDescargaPDF}
          disabled={guardando}
          className="btn btn-success px-4 py-2 px-md-5 py-md-3 rounded-pill fw-bold shadow-sm"
          style={{ fontSize: '0.95rem' }}
        >
          {guardando ? 'Generando PDF y registrando...' : 'Descargar Certificado PDF'}
        </button>
      </div>

    </div>
  );
};