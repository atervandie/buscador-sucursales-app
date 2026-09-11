-- Tabla de sucursales Croissant
CREATE TABLE IF NOT EXISTS sucursales (
  id BIGSERIAL PRIMARY KEY,
  numero_sucursal VARCHAR(10) NOT NULL UNIQUE,
  razon_social VARCHAR(255) NOT NULL,
  nombre_sucursal VARCHAR(255),
  domicilio_fisico TEXT NOT NULL,
  localidad VARCHAR(100) NOT NULL,
  marca VARCHAR(100),
  geolocalizacion_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Índices para búsqueda rápida
CREATE INDEX idx_numero_sucursal ON sucursales(numero_sucursal);
CREATE INDEX idx_razon_social_search ON sucursales USING GIN(to_tsvector('spanish', razon_social));
CREATE INDEX idx_nombre_sucursal_search ON sucursales USING GIN(to_tsvector('spanish', nombre_sucursal));
CREATE INDEX idx_localidad ON sucursales(localidad);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::TEXT, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_sucursales_updated_at BEFORE UPDATE
ON sucursales FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- RLS Policy (Row Level Security) - Permitir lectura pública
ALTER TABLE sucursales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sucursales are publicly readable" ON sucursales
  FOR SELECT USING (true);
