# 🚀 Guía de Deployment - Croissant Sucursales App

Pasos completos para desplegar tu app en Netlify + Supabase.

---

## Parte 1: Configurar Supabase

### 1.1 Crear un proyecto en Supabase

1. Ve a https://app.supabase.com
2. Click en **"New Project"**
3. Configura:
   - **Name:** `croissant-sucursales`
   - **Database Password:** Guarda en lugar seguro
   - **Region:** `us-east-1` (o la más cercana a ti)
4. Click **Create new project** (toma ~2 minutos)

### 1.2 Crear la tabla de sucursales

1. Abre tu proyecto en Supabase
2. Ve a **SQL Editor** (en el menú izquierdo)
3. Click **New Query**
4. Copia el contenido completo de `supabase_schema.sql`
5. Pega en el editor SQL
6. Click **Run**

✅ La tabla `sucursales` está lista

### 1.3 Obtener las credenciales

1. Ve a **Settings** → **API** (en el menú izquierdo)
2. Copia:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_API_KEY` (para script de carga)

📝 Guarda estos valores, los necesitarás en los siguientes pasos

---

## Parte 2: Cargar datos a Supabase

### 2.1 Instalar dependencias Python

```bash
pip install openpyxl supabase-py python-dotenv
```

### 2.2 Crear archivo .env

En la carpeta del proyecto, crea un archivo `.env`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your-service-role-key
```

### 2.3 Ejecutar el script de carga

```bash
python3 load_to_supabase.py CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx
```

Esperado:

```
📖 Leyendo Excel: CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx
📌 Conectado a Supabase
📊 Cargando 83 sucursales...
✅ Cargadas 83/83 sucursales
🎉 Carga completada exitosamente!
```

✅ Tus datos están en Supabase

---

## Parte 3: Preparar el proyecto React

### 3.1 Crear proyecto Vite + React

```bash
npm create vite@latest croissant-app -- --template react-ts
cd croissant-app
npm install
```

### 3.2 Instalar dependencias adicionales

```bash
npm install @supabase/supabase-js lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3.3 Copiar archivos

Reemplaza los siguientes archivos en tu proyecto:

- **src/App.tsx** ← Tu archivo `App.tsx`
- **src/lib/supabase.ts** ← Tu archivo `supabase.ts`
- **src/main.tsx** ← Tu archivo `main.tsx`
- **src/index.css** ← Tu archivo `index.css`
- **index.html** ← Tu archivo `index.html`
- **vite.config.ts** ← Tu archivo `vite.config.ts`
- **tailwind.config.js** ← Actualiza con:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

### 3.4 Crear archivo .env.local

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3.5 Probar localmente

```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador. ✅ Deberías ver la app con las 83 sucursales.

---

## Parte 4: Desplegar en Netlify

### 4.1 Subir a GitHub

1. Crea un repositorio en GitHub
2. Sube tu proyecto:

```bash
git init
git add .
git commit -m "Initial commit: Croissant sucursales app"
git branch -M main
git remote add origin https://github.com/tu-usuario/croissant-app.git
git push -u origin main
```

### 4.2 Conectar Netlify

1. Ve a https://netlify.com
2. Click **Add new site** → **Import an existing project**
3. Selecciona **GitHub**
4. Elige el repositorio `croissant-app`
5. Configura:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Show advanced** → **New variable** y agrega:
   - `VITE_SUPABASE_URL` = Tu URL de Supabase
   - `VITE_SUPABASE_ANON_KEY` = Tu anon key
7. Click **Deploy site**

✅ Tu app está en vivo en `https://tu-proyecto.netlify.app`

### 4.3 Configurar dominio personalizado (opcional)

En Netlify:
1. Ve a **Settings** → **Domain management**
2. Click **Add custom domain**
3. Ingresa tu dominio (ej: `sucursales.tudominio.com`)
4. Sigue las instrucciones de DNS

---

## Parte 5: Agregar URLs de Google Maps (Lo que falta)

### 5.1 Actualizar Excel

Cuando termines de validar manualmente las URLs de Google Maps en Chrome:

1. Abre tu Excel
2. Llenar la columna **Geolocalización** con las URLs validadas
3. Guarda el archivo

### 5.2 Recargar datos en Supabase

```bash
python3 load_to_supabase.py CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx
```

✅ Los botones "Ver en Google Maps" en la app se actualizarán automáticamente

---

## Checklist Final

- [ ] Proyecto Supabase creado
- [ ] Tabla `sucursales` creada en Supabase
- [ ] Script `load_to_supabase.py` ejecutado exitosamente
- [ ] Proyecto React clonado/creado
- [ ] Variables de entorno configuradas en `.env.local`
- [ ] App funciona localmente (`npm run dev`)
- [ ] Código subido a GitHub
- [ ] Netlify conectado y desplegado
- [ ] URLs de Google Maps validadas en Excel
- [ ] Datos recargados en Supabase
- [ ] App en producción actualizada

---

## 🔗 URLs útiles

- **Supabase:** https://app.supabase.com/project
- **Netlify:** https://app.netlify.com
- **Tu app:** https://tu-proyecto.netlify.app

---

## 🆘 Troubleshooting

### Error: "VITE_SUPABASE_URL is not defined"
→ Falta crear `.env.local` con las credenciales. Ver paso 3.4

### Error: "Database connection failed"
→ Verifica que:
  1. Las credenciales en `.env.local` sean correctas
  2. Supabase esté corriendo
  3. La tabla `sucursales` exista

### App no se actualiza en Netlify después de push
→ En Netlify → **Deployments** → **Trigger deploy** → **Deploy site**

### Botones de Google Maps no funcionan
→ Asegúrate que:
  1. Las URLs están en la columna "Geolocalización"
  2. Ejecutaste `load_to_supabase.py` después de actualizar el Excel
  3. Esperaste 30 segundos para que se propague

---

## 📞 Support

Para preguntas sobre:
- **Supabase:** https://supabase.com/docs
- **Netlify:** https://docs.netlify.com
- **React:** https://react.dev
- **Vite:** https://vitejs.dev

¡Éxito! 🍰
