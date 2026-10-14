import React, { useState } from 'react';

const AccesoDni = ({ nombreEmpresa, logoUrl, validarDni, mensajeError, cargando, primaryColor }) => {
  const [dni, setDni] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (dni.length >= 7) {
      validarDni(dni);
    }
  };

  // Función para asegurar que solo se ingresen números
  const manejarCambio = (e) => {
    const soloNumeros = e.target.value.replace(/\D/g, '');
    setDni(soloNumeros);
  };

  // Color principal dinámico según el cliente (por defecto verde institucional)
  const colorBoton = primaryColor || '#28a745';

  return (
    <div className="container-fluid vh-100 bg-light d-flex flex-column justify-content-center align-items-center p-3">
      
      {/* Tarjeta Principal */}
      <div className="card shadow-lg border-0 p-4 p-md-5 w-100" style={{ maxWidth: '420px', borderRadius: '24px' }}>
        <div className="card-body d-flex flex-column align-items-center text-center p-0">
          
          {/* Cabecera: Logo o Nombre de la Empresa (White-label) */}
          {logoUrl ? (
            <img src={logoUrl} alt={nombreEmpresa} className="mb-2 object-fit-contain" style={{ height: '60px' }} />
          ) : (
            <h1 className="fw-bold text-dark mb-2 fs-2">
              {nombreEmpresa || 'Cooperativa Local'}
            </h1>
          )}
          
          {/* Marca de Agua de tu producto */}
          <p className="text-muted small text-uppercase tracking-wider fw-semibold mb-4" style={{ letterSpacing: '1px' }}>
            Plataforma por Athom Learning
          </p>

          {/* Textos de Instrucción */}
          <h2 className="fw-bold text-secondary fs-5 mb-1">
            Capacitación de Temporada
          </h2>
          <p className="text-muted small mb-4">
            Ingresá tu número de DNI sin puntos para comenzar el módulo.
          </p>

          {/* Formulario */}
          <form onSubmit={manejarEnvio} className="w-100 d-flex flex-column gap-3">
            
            <input
              type="tel"
              value={dni}
              onChange={manejarCambio}
              placeholder="Ej: 34567890"
              maxLength={8}
              className="form-control text-center fw-bold fs-2 py-3 bg-light border-2"
              style={{ letterSpacing: '4px', borderRadius: '14px' }}
              required
            />

            {/* Feedback de Error (si el DNI no está en la base) */}
            {mensajeError && (
              <div className="alert alert-danger py-2 small mb-0 fw-medium" role="alert">
                {mensajeError}
              </div>
            )}

            {/* Botón de Acción Principal */}
            <button
              type="submit"
              disabled={dni.length < 7 || cargando}
              className="btn text-white fw-bold py-3 mt-2 shadow-sm transition-all"
              style={{ 
                backgroundColor: dni.length >= 7 && !cargando ? colorBoton : '#cbd5e1', 
                borderColor: dni.length >= 7 && !cargando ? colorBoton : '#cbd5e1',
                borderRadius: '14px',
                fontSize: '1.1rem'
              }}
            >
              {cargando ? 'VERIFICANDO...' : 'INGRESAR AL CURSO'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AccesoDni;