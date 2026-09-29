import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { clientsConfig } from './clientsConfig';

// Importa tus componentes de slides actuales
import { Slide1 } from './slides/Slide1';
import { Slide5 } from './slides/Slide5';
import { Slide6 } from './slides/Slide6';
import { SlideVideo_2 } from './slides/SlideVideo_2';
import { SlideVideo } from './slides/SlideVideo'; 
import { SlideVideo_3 } from './slides/SlideVideo_3';
import { Quiz } from './slides/Quiz';
import { SlideCertificado } from './slides/SlideCertificado';


export default function App() {
  // 1. Detectar el cliente por URL (ej: ?client=agro-sur)
  const queryParams = new URLSearchParams(window.location.search);
  const clientKey = queryParams.get('client');
  const currentClient = clientsConfig[clientKey] || clientsConfig["default"];

  const courseData = currentClient.slides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLastSlide = currentSlide === courseData.length - 1;
  const currentItem = courseData[currentSlide];
  const isQuizSlide = currentItem.type === 'quiz';

  const goToSlide = (index) => {
    // Buscar si el slide al que quiere saltar es un certificado y validar
    const targetSlide = courseData[index];
    if (targetSlide.type === 'certificate' && !quizPassed) {
      alert("Debes aprobar el examen final para acceder a tu certificado.");
      return;
    }
    setCurrentSlide(index);
    setIsMenuOpen(false);
  };

  // 2. Función inteligente que decide qué componente renderizar según el "type"
  const renderSlideComponent = (item) => {
    switch (item.type) {
      case 'video':
        if (item.slideKey === 'SlideVideo_2') return <SlideVideo_2 videoUrl={item.videoUrl} />;
        if (item.slideKey === 'SlideVideo_3') return <SlideVideo_3 videoUrl={item.videoUrl} />;
        return <SlideVideo videoUrl={item.videoUrl} />;

      case 'slide-custom':
        if (item.slideKey === 'Slide1') return <Slide1 />;
        if (item.slideKey === 'Slide5') return <Slide5 />;
        if (item.slideKey === 'Slide6') return <Slide6 />;
        return <Slide1 />;
   
      case 'quiz':
        return <Quiz onPass={() => setQuizPassed(true)} />;

      case 'certificate':
        return <SlideCertificado courseName={item.courseName} clientName={currentClient.name} />;

      default:
        return <div className="p-5 text-center">Contenido no disponible</div>;
    }
  };

  return (
    <div className="container-fluid vh-100 p-0 overflow-hidden d-flex bg-light">
      
      {/* --- BOTÓN TOGGLE MENÚ --- */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="btn position-absolute top-0 start-0 m-3 shadow d-flex justify-content-center align-items-center"
        style={{ 
          width: '50px', 
          height: '50px', 
          borderRadius: '12px', 
          zIndex: 1100, 
          backgroundColor: currentClient.primaryColor || '#28a745', 
          color: '#ffffff', 
          border: 'none' 
        }}
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
              <h5 className="fw-bold mb-2" style={{ color: currentClient.primaryColor || '#28a745' }}>
                {currentClient.name}
              </h5>
              <p className="text-muted small mb-4">Contenido del curso</p>
              <div className="list-group list-group-flush">
                {courseData.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => goToSlide(index)}
                    className={`list-group-item list-group-item-action border-0 rounded-3 mb-2 d-flex align-items-center ${currentSlide === index ? 'text-white' : 'bg-light text-dark'}`}
                    style={{ backgroundColor: currentSlide === index ? (currentClient.primaryColor || '#28a745') : undefined }}
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
          style={{ width: '100%', maxWidth: '1200px', height: '90vh', borderRadius: '24px', overflow: 'hidden' }}
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
                {renderSlideComponent(currentItem)}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Barra de Navegación Inferior */}
          <div className="bg-white p-4 border-top d-flex align-items-center justify-content-between">
            <button 
              className="btn btn-outline-secondary rounded-pill px-4 fw-bold"
              onClick={() => setCurrentSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
            >
              Anterior
            </button>

            <div className="flex-grow-1 mx-4 d-none d-md-block text-center">
              <div className="progress mb-1" style={{ height: '6px' }}>
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${((currentSlide + 1) / courseData.length) * 100}%`,
                    backgroundColor: currentClient.primaryColor || '#28a745',
                    transition: 'width 0.5s ease'
                  }}
                ></div>
              </div>
              <small className="text-muted fw-bold">
                Progreso: {Math.round(((currentSlide + 1) / courseData.length) * 100)}%
              </small>
            </div>

            <button 
              className="btn px-5 py-2 rounded-pill shadow-sm fw-bold text-white"
              style={{ backgroundColor: currentClient.primaryColor || '#28a745', borderColor: currentClient.primaryColor || '#28a745' }}
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