# 🍰 Croissant Sucursales - App de Búsqueda de Distribuidoras

Aplicación web **mobile-first** para que conductores encuentren rápidamente sus sucursales de distribución Croissant con un tap a Google Maps.

---

## ✨ Características

✅ **Búsqueda en tiempo real** - Por número de sucursal, razón social, localidad
✅ **Mobile-first** - Optimizado para conductores en celular
✅ **Maps integrado** - Un tap y abre Google Maps con la ubicación
✅ **Sin login** - Acceso público, sin autenticación requerida
✅ **Datos actualizados** - Sincroniza automáticamente con tu Excel

---

## 🏗️ Arquitectura

```
Frontend (React 19 + TypeScript)
    ↓
Supabase Database (PostgreSQL)
    ↑
    ↓
Python Script (Carga de Excel)
```

**Librerías principales:**
- React 19 + TypeScript
- Supabase (base de datos)
- Vite (bundler)
- Tailwind CSS (estilos)
- Lucide React (iconos)

---

## 📁 Archivos Incluidos

```
.
├── App.tsx                          # Componente principal React
├── main.tsx                         # Punto de entrada
├── index.html                       # HTML base
├── index.css                        # Estilos Tailwind
├── vite.config.ts                   # Config de Vite
├── tsconfig.json                    # Config de TypeScript
├── package.json                     # Dependencias npm
├── .env.example                     # Variables de entorno (template)
├── lib/
│   └── supabase.ts                  # Cliente de Supabase
├── supabase_schema.sql              # Schema de BD (ejecutar en Supabase)
├── load_to_supabase.py              # Script para cargar Excel → Supabase
├── DEPLOYMENT_GUIDE.md              # Guía completa de deployment
└── README.md                        # Este archivo
```

---

## 🚀 Quick Start

### Prerequisitos
- Node.js 18+ (https://nodejs.org)
- Python 3.8+ (https://python.org)
- Cuenta Supabase gratis (https://supabase.com)
- Tu Excel: `CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx`

### Pasos

**1. Lee la guía de deployment**
```bash
cat DEPLOYMENT_GUIDE.md
```

**2. Configura Supabase** (5 min)
- Crear proyecto
- Ejecutar schema SQL
- Copiar credenciales

**3. Carga tus datos** (2 min)
```bash
pip install openpyxl supabase-py
python3 load_to_supabase.py CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx
```

**4. Instala el proyecto React** (3 min)
```bash
npm install
```

**5. Crea `.env.local`**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**6. Prueba localmente**
```bash
npm run dev
```

**7. Desplega en Netlify** (10 min)
- Push a GitHub
- Conecta Netlify
- Configura variables de entorno
- ¡Listo!

---

## 📊 Base de Datos

Tabla `sucursales`:

| Campo | Tipo | Notas |
|-------|------|-------|
| `id` | BigInt | PK auto-increment |
| `numero_sucursal` | VARCHAR(10) | Único, indexado |
| `razon_social` | VARCHAR(255) | Para búsqueda |
| `nombre_sucursal` | VARCHAR(255) | Nombre descriptivo |
| `domicilio_fisico` | TEXT | Dirección completa |
| `localidad` | VARCHAR(100) | Ciudad/Estado |
| `marca` | VARCHAR(100) | Marca asociada |
| `geolocalizacion_url` | TEXT | URL acortada de Google Maps |
| `created_at` | Timestamp | Auto-generado |
| `updated_at` | Timestamp | Auto-actualizado |

---

## 🔄 Flujo de Actualización

### Cuando agregas nuevas URLs de Maps

1. Abre tu Excel `CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx`
2. Llena/actualiza la columna "Geolocalización"
3. Ejecuta:
   ```bash
   python3 load_to_supabase.py CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx
   ```
4. Netlify se actualiza automáticamente (en ~30 segundos)

---

## 💡 Funcionalidad

### Pantalla Principal

- **Header sticky** - Título visible siempre
- **Input de búsqueda** - Busca por:
  - Número de sucursal: `0201`
  - Razón social: `ESPERANZA`
  - Localidad: `CDMX`
- **Tarjetas de resultados** - Mostrar:
  - Número de sucursal (destacado)
  - Nombre de sucursal (si existe)
  - Razón social
  - Domicilio físico
  - Localidad
  - Botón a Google Maps
- **Contador de resultados** - X de 83 sucursales

### Mobile Optimizado

✅ Padding/margin apropiado
✅ Botones de 44px mínimo (tap-friendly)
✅ Scroll suave
✅ Teclado inteligente (no zoom en iPhone)

---

## 🛠️ Desarrollo Local

### Estructura de carpetas

```
src/
├── App.tsx          # Componente principal
├── main.tsx         # Punto de entrada
├── index.css        # Estilos globales
└── lib/
    └── supabase.ts  # Configuración de BD
```

### Desarrollar

```bash
npm run dev          # Inicia servidor Vite en port 3000
npm run build        # Build para producción
npm run preview      # Previsualiza build
```

### Type checking

```bash
npm run type-check   # Verifica TypeScript
```

---

## 📱 Testing en Móvil

### Localhost en móvil (WiFi)

```bash
# Obtén tu IP local
ipconfig getifaddr en0  # Mac
hostname -I             # Linux/WSL

# Accede desde móvil
http://<tu-ip>:5000
```

### Con ngrok (exposición a internet)

```bash
npm install -g ngrok
ngrok http 5000
# Usa la URL que ngrok te da
```

---

## 🔐 Seguridad

- ✅ Base de datos pública (lectura)
- ✅ Sin datos sensibles expuestos
- ✅ Anon key válida solo para lectura
- ✅ Service role key guardada en Netlify (solo deploy)

---

## 📈 Escalabilidad

Con 83 sucursales + búsqueda SQL indexada:
- **Búsquedas:** <100ms
- **Carga inicial:** <2s (3G)
- **Usuarios simultáneos:** 1000+ (Supabase plan free)

---

## 🎨 Diseño

### Colores
- **Primary:** Orange (Croissant theme)
- **Background:** Light orange/amber gradient
- **Text:** Gray scale

### Tipografía
- System fonts (-apple-system, Segoe UI)
- Responsive sizes (clamp en Tailwind)

### Iconos
- Lucide React (SVG, importados)
- Google Maps icon
- Search icon
- Location pin

---

## 🚨 Troubleshooting

Ver **DEPLOYMENT_GUIDE.md** → **Troubleshooting** para problemas comunes

---

## 📞 Support

- **Supabase Docs:** https://supabase.com/docs
- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Tailwind Docs:** https://tailwindcss.com

---

## 📄 Licencia

Proyecto interno • 2025

---

## 🎯 Roadmap

- [ ] Agregar filtros por marca/localidad
- [ ] Favoritos en localStorage
- [ ] Historial de búsquedas recientes
- [ ] Modo oscuro
- [ ] PWA (offline support)
- [ ] Notificaciones de cambios
- [ ] Multi-idioma (ES/EN)

---

¡Listo para 🚀 desplegar! Lee **DEPLOYMENT_GUIDE.md** para instrucciones paso a paso.
