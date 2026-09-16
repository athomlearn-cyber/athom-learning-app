import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

// Imports de tus componentes actuales
import { Slide1 } from './slides/Slide1';
import { SlideVideo_2 } from './slides/SlideVideo_2';
import { Slide5 } from './slides/Slide5';
import { SlideVideo } from './slides/SlideVideo'; 
import { Slide6 } from './slides/Slide6';
import { SlideVideo_3 } from './slides/SlideVideo_3';
import { Quiz } from './slides/Quiz';
import { SlideCertificado } from './slides/SlideCertificado';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const courseData = [
    { id: 0, title: "Introducción", component: <Slide1 /> },
    { id: 1, title: "Bienvenidos", component: <SlideVideo_2 videoUrl="https://banojzotfsgexogadzmr.supabase.co/storage/v1/object/public/cursos/videos/introduccion.mp4" /> },
    { id: 2, title: "¿Qué es la Trazabilidad?", component: <Slide5 /> },
    { id: 3, title: "Por qué es importante", component: <SlideVideo videoUrl="https://banojzotfsgexogadzmr.supabase.co/storage/v1/object/public/cursos/videos/porqueesvital.mp4" /> },
    { id: 4, title: "Datos a inspeccionar", component: <Slide6 /> },
    { id: 5, title: "El futuro", component: <SlideVideo_3 videoUrl="https://banojzotfsgexogadzmr.supabase.co/storage/v1/object/public/cursos/videos/elfuturo.mp4" /> },
    { id: 6, title: "Examen Final", component: <Quiz onPass={() => setQuizPassed(true)} /> },
    { id: 7, title: "Tu Certificado", component: <SlideCertificado /> }
  ];

  const isLastSlide = currentSlide === courseData.length - 1;
  const isQuizSlide = currentSlide === 6;

  const goToSlide = (index) => {
    // Evitamos que salten al certificado desde el menú si no aprobaron
    if (index === 7 && !quizPassed) {
      alert("Debes aprobar el examen final para acceder a tu certificado.");
      return;
    }
    setCurrentSlide(index);
    setIsMenuOpen(false);
  };

  return (
    <div className="container-fluid vh-100 p-0 overflow-hidden d-flex bg-light">
      
      {/* --- BOTÓN TOGGLE MENÚ --- */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="btn btn-agro position-absolute top-0 start-0 m-3 shadow d-flex justify-content-center align-items-center"
        style={{ width: '50px', height: '50px', borderRadius: '12px', zIndex: 1100, backgroundColor: '#28a745', color: '#ffffff', border: 'none' }}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* --- MENÚ LATERAL --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="bg-white shadow-lg position-absolute top-0 start-0 vh-100 border-end"
            style={{ width: '300px', paddingTop: '80px', zIndex: 1050 }}
          >
            <div className="p-4">
              <h5 className="text-agro-green fw-bold mb-4">Contenido</h5>
              <div className="list-group list-group-flush">
                {courseData.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => goToSlide(index)}
                    className={`list-group-item list-group-item-action border-0 rounded-3 mb-2 d-flex align-items-center ${currentSlide === index ? 'bg-success text-white' : 'bg-light text-dark'}`}
                  >
                    <small className="me-2">{index + 1}.</small>
                    {item.title}
                    {currentSlide === index && <ChevronRight size={16} className="ms-auto" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-3 p-md-5 bg-light">
        <div 
          className="card shadow-lg border-0 d-flex flex-column bg-white" 
          style={{ 
            width: '100%', 
            maxWidth: '1200px', 
            height: '90vh', 
            borderRadius: '24px',
            overflow: 'hidden'
          }}
        >
          {/* Área de los Slides */}
          <div className="flex-grow-1 position-relative bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-100 w-100"
              >
                {courseData[currentSlide].component}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Barra de Navegación Inferior Integrada */}
          <div className="bg-white p-4 border-top d-flex align-items-center justify-content-between">
            
            <button 
              className="btn btn-outline-secondary rounded-pill px-4 fw-bold"
              onClick={() => setCurrentSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
            >
              Anterior
            </button>

            {/* Barra de progreso central */}
            <div className="flex-grow-1 mx-4 d-none d-md-block text-center">
              <div className="progress mb-1" style={{ height: '6px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ 
                    width: `${((currentSlide + 1) / courseData.length) * 100}%`,
                    transition: 'width 0.5s ease'
                  }}
                ></div>
              </div>
              <small className="text-muted fw-bold">
                Progreso: {Math.round(((currentSlide + 1) / courseData.length) * 100)}%
              </small>
            </div>

            <button 
              className="btn-agro px-5 py-2 rounded-pill shadow-sm fw-bold text-white"
              style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
              disabled={(isQuizSlide && !quizPassed) || isLastSlide} 
              onClick={() => setCurrentSlide(currentSlide + 1)}
            >
              {isLastSlide ? 'Finalizado' : 'Siguiente'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}