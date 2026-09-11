# ⚡ Quick Start - Croissant Sucursales App

Guía rápida para poner la app funcionando en **menos de 30 minutos**.

---

## 📋 Requisitos

- [x] Node.js 18+ instalado: https://nodejs.org
- [x] Python 3.8+ instalado: https://python.org
- [x] Cuenta Supabase (gratis): https://supabase.com
- [x] Excel actualizado: `CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx`
- [x] Git (para subir a GitHub): https://git-scm.com

---

## 🎯 Pasos

### Paso 1️⃣: Crear Proyecto en Supabase (5 min)

1. Ve a https://supabase.com y crea cuenta gratis
2. Click **"New Project"**
3. Ingresa nombre: `croissant-sucursales`
4. Crea una contraseña fuerte
5. Selecciona región (la más cercana a ti)
6. Espera que termine de crear (~2 minutos)

**Guarda este proyecto URL en lugar seguro** 📝

---

### Paso 2️⃣: Crear Tabla en Supabase (3 min)

1. En tu proyecto Supabase, ve a **SQL Editor** (menú izquierdo)
2. Click **New Query**
3. Copia TODO el contenido de `supabase_schema.sql`
4. Pégalo en el editor
5. Click **Run** (botón azul arriba)

✅ La tabla está creada

---

### Paso 3️⃣: Obtener Credenciales (2 min)

1. En Supabase, ve a **Settings** → **API**
2. Copia estos 3 valores en un documento:

```
VITE_SUPABASE_URL = [copiar aquí]
VITE_SUPABASE_ANON_KEY = [copiar aquí]
SUPABASE_API_KEY = [copiar aquí - "service_role secret"]
```

---

### Paso 4️⃣: Cargar tu Excel a Supabase (3 min)

Abre terminal en la carpeta del proyecto y ejecuta:

```bash
# Instala dependencia
pip install openpyxl supabase-py

# Crea archivo .env
echo "SUPABASE_URL=https://your-url.supabase.co" > .env
echo "SUPABASE_API_KEY=your-key" >> .env

# Reemplaza your-url y your-key con los valores del paso anterior

# Carga los datos
python3 load_to_supabase.py CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx
```

**Resultado esperado:**
```
✅ Cargadas 83/83 sucursales
🎉 Carga completada exitosamente!
```

✅ Tus 83 sucursales están en Supabase

---

### Paso 5️⃣: Instalar Dependencias React (2 min)

```bash
npm install
```

---

### Paso 6️⃣: Crear .env.local (1 min)

Crea un archivo llamado `.env.local` en la raíz con:

```
VITE_SUPABASE_URL=https://your-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Usa los valores que guardaste en el Paso 3️⃣

---

### Paso 7️⃣: Probar Localmente (1 min)

```bash
npm run dev
```

Abre http://localhost:5173 en tu navegador.

👀 ¿Ves las 83 sucursales? ✅ ¡Todo funciona!

Presiona `Ctrl+C` para detener.

---

### Paso 8️⃣: Subir a GitHub (5 min)

Si no tienes repositorio:

```bash
# Crear repo local
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Crear repo en GitHub primero (https://github.com/new)
# Luego:
git remote add origin https://github.com/tu-usuario/croissant-app.git
git push -u origin main
```

---

### Paso 9️⃣: Desplegar en Netlify (5 min)

1. Ve a https://netlify.com
2. Click **Add new site** → **Import an existing project**
3. Conecta GitHub
4. Selecciona tu repositorio `croissant-app`
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **Show advanced**
7. **New variable** y agrega:
   - Key: `VITE_SUPABASE_URL` | Value: `https://your-url.supabase.co`
   - Key: `VITE_SUPABASE_ANON_KEY` | Value: `your-anon-key`
8. Click **Deploy site**

Espera 2-3 minutos... ¡listo! 🎉

Tu app estará en `https://tu-proyecto.netlify.app`

---

## ✨ Ahora Qué

### Cuando termines de validar URLs en Maps

1. Abre el Excel
2. Rellena la columna "Geolocalización" con tus URLs validadas
3. Ejecuta:
   ```bash
   python3 load_to_supabase.py CROISSANT_SUCURSALES_UNIFICADAS_83.xlsx
   ```
4. En ~30 segundos, tu app en Netlify se actualiza automáticamente ✅

---

## 🆘 Errores Comunes

### "VITE_SUPABASE_URL is not defined"
→ Creaste `.env.local`? Verifica que exista en la raíz con los valores correctos.

### "Cannot find module supabase"
→ ¿Ejecutaste `npm install`? Intenta de nuevo.

### "Database connection failed"
→ ¿Las credenciales en `.env.local` son correctas? Cópialas nuevamente de Supabase.

### "Port 5173 already in use"
→ Ya hay otro servidor corriendo. Ejecuta:
```bash
kill -9 $(lsof -t -i:5173)
npm run dev
```

---

## 📞 Soporte

Si algo falla:

1. Lee **DEPLOYMENT_GUIDE.md** (tiene más detalles)
2. Verifica que cada paso esté completo
3. Revisa los "Errores Comunes" arriba

---

## ✅ Checklist Final

- [ ] Proyecto Supabase creado
- [ ] Schema SQL ejecutado
- [ ] Credenciales copiadas
- [ ] Excel cargado a Supabase (83 sucursales)
- [ ] `npm install` completado
- [ ] `.env.local` creado
- [ ] `npm run dev` funciona localmente
- [ ] Código en GitHub
- [ ] Desplegado en Netlify
- [ ] URLs de Maps validadas
- [ ] Datos recargados

---

¡Eso es todo! Tu app está lista para que los conductores encuentren sus sucursales. 🍰🚀
