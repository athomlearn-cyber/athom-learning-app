// src/clientsConfig.js
export const clientsConfig = {
  "agro-sur": {
    name: "Agro Sur S.A.",
    logo: "assets/logos/agro-sur.png", 
    primaryColor: "#28a745",
    slides: [
      { id: 0, type: "slide-custom", title: "Introducción", slideKey: "Slide1" },
      { 
        id: 1, 
        type: "video", 
        title: "Bienvenidos", 
        videoUrl: "https://banojzotfsgexogadzmr.supabase.co/storage/v1/object/public/cursos/videos/introduccion.mp4",
        slideKey: "SlideVideo"
      },
      { id: 2, type: "slide-custom", title: "¿Qué es la Trazabilidad?", slideKey: "Slide5" },
      
      { id: 3, type: "slide-custom", title: "Datos a inspeccionar", slideKey: "Slide6" },
      { 
        id: 4, 
        type: "video", 
        title: "El futuro", 
        videoUrl: "https://banojzotfsgexogadzmr.supabase.co/storage/v1/object/public/cursos/videos/elfuturo.mp4",
        slideKey: "SlideVideo_3"
      },

      { id: 5, type: "quiz", title: "Examen Final" },
      { id: 6, type: "certificate", title: "Tu Certificado", courseName: "Capacitación en Trazabilidad Agro Sur" }
    ]
  },
  
  // Cliente por defecto (si entran al link general sin ?client=...)
  "default": {
    name: "Athom Learning (Demo)",
    logo: "assets/logos/athom-learning.png",
    primaryColor: "#28a745",
    slides: [
      { id: 0, type: "slide-custom", title: "Introducción", slideKey: "Slide1" },
      { 
        id: 1, 
        type: "video", 
        title: "Bienvenidos", 
        videoUrl: "https://banojzotfsgexogadzmr.supabase.co/storage/v1/object/public/cursos/videos/introduccion.mp4",
        slideKey: "SlideVideo_1"
      },
        { id: 2, type: "slide-custom", title: "¿Qué es la Trazabilidad?", slideKey: "Slide5" },
        { 
        id: 3, 
        type: "video", 
        title: "Por qué es importante", 
        videoUrl: "https://banojzotfsgexogadzmr.supabase.co/storage/v1/object/public/cursos/videos/porqueesvital.mp4",
        slideKey: "SlideVideo_2"
      },

        { id: 4, type: "slide-custom", title: "Datos a inspeccionar", slideKey: "Slide6" },
        { 
        id: 5, 
        type: "video", 
        title: "El futuro", 
        videoUrl: "https://banojzotfsgexogadzmr.supabase.co/storage/v1/object/public/cursos/videos/elfuturo.mp4",
        slideKey: "SlideVideo_3"
      },

      { id: 6, type: "quiz", title: "Examen Final" },
      { id: 7, type: "certificate", title: "Tu Certificado", courseName: "Curso General de Demostración" }
    ]
  }
};
