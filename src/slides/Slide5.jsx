import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ImageUp, Earth, CheckCircle, ChevronRight } from 'lucide-react';

export const Slide5 = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
 
   { id: 'Identidad', title: "Identidad", icon: <ImageUp size={24} />, color: "#5AE2F2", short: "registro único", full: "Registro único de cada lote, semilla o animal. Consiste en saber exactamente *qué es* y *de dónde viene* desde el punto inicial.", bullets: ["Registro único", "Tracing"] },
    { id: 'Historial', title: "Historial", icon: <Cpu size={24} />, color: "#48B037", short: "Historial", full: "El *diario de vida* del producto. Incluye todos los tratamientos, insumos aplicados, fechas de siembra, cuidado y cosecha. ", bullets: ["Diario de vida", "Historial de tratamientos"] },
    { id: 'Localización', title: "Localización", icon: <Earth size={24} />, color: "#9C27F5", short: "Localización", full: "Ubicación exacta de cada lote, semilla o animal en todo el proceso de producción.", bullets: ["Ubicación exacta", "Seguimiento en tiempo real"] }
  ];

  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center p-2 p-md-3 bg-white overflow-hidden">
      <div className="container-fluid d-flex flex-column justify-content-center h-100" style={{ maxWidth: '1000px' }}>
        
        <div className="text-center mb-2 mb-md-3">
          <h2 className="fw-bold mb-1" style={{ fontSize: 'calc(1.1rem + 0.5vw)' }}>¿Qué es la Trazabilidad? </h2>
          <p className="text-muted small mb-0 d-none d-sm-block">Seleccioná un item para profundizar.</p>
        </div>

        {/* Grilla de Cards */}
        <div className="row g-2 g-md-3 justify-content-center">
          {topics.map((topic) => (
            <div key={topic.id} className="col-12 col-md-4">
              <motion.div
                whileHover={{ y: -5 }}
                className="card h-100 border-0 shadow-sm p-3 text-center d-flex flex-column align-items-center"
                style={{ borderRadius: '20px', backgroundColor: '#f9f9f9' }}
              >
                <div 
                  className="mb-2 d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: '50px', height: '50px', backgroundColor: `${topic.color}15`, color: topic.color }}
                >
                  {topic.icon}
                </div>

                <h6 className="fw-bold mb-1 text-truncate w-100">{topic.title}</h6>
                <p className="text-muted mb-3 d-none d-md-block" style={{ fontSize: '0.75rem' }}>{topic.short}</p>

                <button 
                  onClick={() => setSelectedTopic(topic)}
                  className="btn w-100 rounded-pill py-1 mt-auto d-flex align-items-center justify-content-center gap-1 shadow-sm"
                  style={{ backgroundColor: topic.color, color: 'white', fontSize: '0.8rem', fontWeight: '600' }}
                >
                  Saber más <ChevronRight size={14} />
                </button>
              </motion.div>
            </div>
          ))}
        </div>

    
        <AnimatePresence>
          {selectedTopic && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center z-3 p-3"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
              onClick={() => setSelectedTopic(null)}
            >
              <motion.div
                initial={{ y: 20, scale: 0.95 }} animate={{ y: 0, scale: 1 }}
                className="bg-white rounded-4 shadow-lg p-4 position-relative d-flex flex-column"
                style={{ maxWidth: '450px', maxHeight: '85%', width: '100%' }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="btn-close position-absolute top-0 end-0 m-3" onClick={() => setSelectedTopic(null)} />
                
                {/* Scroll interno para el texto largo */}
                <div className="overflow-auto pe-1 mt-2">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="p-2 rounded-3" style={{ backgroundColor: `${selectedTopic.color}15`, color: selectedTopic.color }}>
                      {selectedTopic.icon}
                    </div>
                    <h5 className="fw-bold mb-0">{selectedTopic.title}</h5>
                  </div>

                  <p className="text-secondary small mb-3">{selectedTopic.full}</p>
                  
                  <div className="p-3 rounded-3" style={{ backgroundColor: '#f8f9fa' }}>
                    {selectedTopic.bullets.map((b, i) => (
                      <div key={i} className="d-flex align-items-center mb-1 fw-medium" style={{ fontSize: '0.8rem' }}>
                        <CheckCircle size={14} className="text-success me-2" /> {b}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};