import { useState } from 'react';

export const Quiz = ({ onPass }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      pregunta: "¿Qué es la trazabilidad agrícola en las cadenas de suministro?",
      opciones: ["La capacidad de rastrear el origen y el destino de los productos agrícolas a lo largo de toda la cadena de suministro.", "El uso exclusivo de maquinaria autónoma para la cosecha.", "Un método para aumentar la velocidad de transporte logístico."],
      correcta: 0
    },
    {
      pregunta: "¿Cuáles son los tres pilares fundamentales para lograr una trazabilidad completa?",
      opciones: ["Siembra, Cosecha y Distribución.", "Identidad, Historial y Localización.", "Precio, Calidad y Volumen."],
      correcta: 1
    },
    {
      pregunta: "En un sistema de trazabilidad, ¿a qué nos referimos cuando hablamos de *Identidad*?",
      opciones: ["Al nombre de la compañía que transporta los insumos.", "A la marca comercial con la que se empaca el producto en el supermercado.", "A las características, lotes y perfiles únicos que diferencian a un producto o cosecha en particular."],
      correcta: 2
    },
    {
      pregunta: "¿Qué significa *Historial* en el contexto de la trazabilidad agrícola?",
      opciones: ["El registro de todas las etapas y procesos que ha atravesado un producto desde su origen hasta su destino final.", "La historia de la empresa que produce los insumos.", "El tiempo que tarda un producto en llegar al mercado."],                                                          
      correcta: 0
    },
    { 
      pregunta: "¿Por qué es importante la trazabilidad en la agricultura?",        
      opciones: ["Permite a los consumidores conocer el origen de los productos y garantiza la seguridad alimentaria.", "Aumenta la velocidad de transporte logístico.", "Reduce el costo de producción agrícola."],
      correcta: 0
    }
  ];

  const handleAnswer = (index) => {
    let currentScore = score;
    if (index === questions[currentQuestion].correcta) {
      currentScore = score + 1;
      setScore(currentScore);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      // Calculamos si aprobó (ej: más del 60%, o sea 3 de 5)
      if (currentScore >= 3) {
        onPass(currentScore * 20); // Pasamos la nota (0 a 100)
      }
    }
  };

  if (showResult) {
    return (
      <div className="text-center p-4">
        <h3 className="mb-3">Resultado de la Evaluación</h3>
        <div className="display-4 fw-bold mb-3">{score} / {questions.length}</div>
        {score >= 3 ? (
          <p className="text-success fw-bold">¡Aprobado! Ya podés finalizar el curso.</p>
        ) : (
          <div>
            <p className="text-danger">No alcanzaste el puntaje mínimo.</p>
            <button className="btn btn-warning" onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-3">
        <span className="badge bg-agro-green">Pregunta {currentQuestion + 1} de {questions.length}</span>
      </div>
      <h4 className="mb-4">{questions[currentQuestion].pregunta}</h4>
      <div className="d-grid gap-3">
        {questions[currentQuestion].opciones.map((opt, i) => (
          <button key={i} className="btn btn-outline-dark p-3 text-start" onClick={() => handleAnswer(i)}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};