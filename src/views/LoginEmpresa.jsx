import React, { useState } from 'react';
import AccesoDni from '../slides/AccesoDni'; // Importas tu diseño visual
import { supabase } from '../supabaseClient';

const LoginEmpresa = ({ nombreEmpresa, logoUrl, primaryColor, onLoginExitoso }) => {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  const verificarDni = async (dniIngresado) => {
    setCargando(true);
    setError(null);
    
    try {
      // Consulta real a la tabla 'operarios' que acabamos de crear en Supabase
      const { data, error: dbError } = await supabase
        .from('operarios')
        .select('nombre_completo, dni, estado_activo')
        .eq('dni', dniIngresado)
        .single();

      if (dbError || !data) {
        setError('El DNI ingresado no figura en la nómina de esta empresa.');
        setCargando(false);
        return;
      }

      if (!data.estado_activo) {
        setError('Este acceso se encuentra suspendido. Contactá a tu supervisor.');
        setCargando(false);
        return;
      }

      // ¡DNI encontrado y activo! Pasamos los datos reales al App.jsx
      onLoginExitoso({ nombre: data.nombre_completo, dni: data.dni });

    } catch (err) {
      setError('Hubo un problema de conexión. Intentá nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <AccesoDni 
      nombreEmpresa={nombreEmpresa} 
      logoUrl={logoUrl}
      primaryColor={primaryColor}
      validarDni={verificarDni}
      mensajeError={error}
      cargando={cargando}
    />
  );
};

export default LoginEmpresa;