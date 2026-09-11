import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building2, Navigation } from 'lucide-react';
import { supabase } from './lib/supabase';

interface Sucursal {
  id: number;
  numero_sucursal: string;
  razon_social: string;
  nombre_sucursal: string | null;
  domicilio_fisico: string;
  localidad: string;
  marca: string;
  geolocalizacion_url: string | null;
}

export default function App() {
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [filtrados, setFiltrados] = useState<Sucursal[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos de Supabase
  useEffect(() => {
    const cargarSucursales = async () => {
      try {
        const { data, error } = await supabase
          .from('sucursales')
          .select('*')
          .order('numero_sucursal', { ascending: true });

        if (error) throw error;
        setSucursales(data || []);
        setFiltrados(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar datos');
        console.error('Error:', err);
      } finally {
        setCargando(false);
      }
    };

    cargarSucursales();
  }, []);

  // Filtrar por búsqueda (número de sucursal, razón social o localidad)
  useEffect(() => {
    if (!busqueda.trim()) {
      setFiltrados(sucursales);
      return;
    }

    const termino = busqueda.toLowerCase().trim();
    const resultado = sucursales.filter(s =>
      s.numero_sucursal.toLowerCase().includes(termino) ||
      s.razon_social.toLowerCase().includes(termino) ||
      s.nombre_sucursal?.toLowerCase().includes(termino) ||
      s.localidad.toLowerCase().includes(termino)
    );

    setFiltrados(resultado);
  }, [busqueda, sucursales]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-stone-200 shadow-sm z-10">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-stone-700 to-stone-800 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900">Croissant</h1>
          </div>
          <p className="text-sm text-stone-600">Encuentra tu sucursal de distribución</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Buscador */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Busca por número, razón social o localidad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 text-lg border-2 border-stone-200 rounded-xl focus:outline-none focus:border-stone-600 focus:ring-2 focus:ring-stone-100 transition"
            />
          </div>
          <p className="text-xs text-stone-500 mt-2">
            Ejemplo: 0201, ESPERANZA, CDMX
          </p>
        </div>

        {/* Estado de carga */}
        {cargando && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-700 rounded-full animate-spin mb-4"></div>
            <p className="text-stone-600">Cargando sucursales...</p>
          </div>
        )}

        {/* Error */}
        {error && !cargando && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-medium">Error al cargar los datos</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Resultados */}
        {!cargando && !error && (
          <>
            {/* Info de resultados */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                {busqueda && (
                  <p className="text-sm text-stone-600">
                    <span className="font-semibold text-stone-900">{filtrados.length}</span> resultado{filtrados.length !== 1 ? 's' : ''} de{' '}
                    <span className="font-semibold text-stone-900">{sucursales.length}</span> sucursales
                  </p>
                )}
                {!busqueda && (
                  <p className="text-sm text-stone-600">
                    Total de <span className="font-semibold text-stone-900">{sucursales.length}</span> sucursales
                  </p>
                )}
              </div>
            </div>

            {/* Tarjetas de sucursales */}
            {filtrados.length > 0 ? (
              <div className="space-y-4">
                {filtrados.map((sucursal) => (
                  <div
                    key={sucursal.id}
                    className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Header de tarjeta */}
                    <div className="bg-gradient-to-r from-stone-700 to-stone-800 px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-stone-200">Sucursal</p>
                          <p className="text-2xl font-bold text-white">
                            {sucursal.numero_sucursal}
                          </p>
                        </div>
                        <div className="text-right">
                          {sucursal.nombre_sucursal && (
                            <p className="text-sm font-semibold text-white bg-stone-800 bg-opacity-50 px-3 py-1 rounded-full">
                              {sucursal.nombre_sucursal}
                            </p>
                          )}
                          <p className="text-xs text-stone-200 mt-2">{sucursal.marca}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4 space-y-3">
                      {/* Razón Social */}
                      <div>
                        <p className="text-xs text-stone-500 font-medium mb-1">Razón Social</p>
                        <p className="text-sm font-semibold text-stone-900">
                          {sucursal.razon_social}
                        </p>
                      </div>

                      {/* Domicilio */}
                      <div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-stone-700 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-xs text-stone-500 font-medium mb-1">Ubicación</p>
                            <p className="text-sm text-stone-700 leading-relaxed">
                              {sucursal.domicilio_fisico}
                            </p>
                            <p className="text-xs text-stone-700 font-medium mt-1">
                              {sucursal.localidad}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Botón de Maps */}
                      {sucursal.geolocalizacion_url ? (
                        <a
                          href={sucursal.geolocalizacion_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-stone-700 to-stone-800 hover:from-stone-800 hover:to-stone-900 text-white font-semibold py-3 rounded-lg transition-all active:scale-95 touch-manipulation"
                        >
                          <Navigation className="w-5 h-5" />
                          Ver en Google Maps
                        </a>
                      ) : (
                        <div className="mt-4 w-full py-3 bg-stone-100 text-stone-500 rounded-lg text-center text-sm font-medium">
                          Maps no disponible
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-stone-300 mx-auto mb-3" />
                <p className="text-stone-600 font-medium mb-1">No se encontraron resultados</p>
                <p className="text-stone-500 text-sm">
                  Intenta con otro número de sucursal, razón social o localidad
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-stone-200 text-center text-xs text-stone-600">
        <p>🍰 Distribuidor de Croissant • {sucursales.length} sucursales</p>
      </footer>
    </div>
  );
}
