# 🚀 SANTI FITNESS - Plataforma de Entrenamiento

Plataforma completa para gestionar tu entrenamiento, nutrición y progreso fitness.

## ✨ Características

✅ **Sistema de Autenticación** - Crea cuenta con usuario y contraseña  
✅ **Perfil Personal Avanzado** - Información completa y historial de peso  
✅ **Ejercicios** - Base de datos de 57+ ejercicios categorizados  
✅ **Calendario** - Planifica tu rutina semanal (fechas corregidas)  
✅ **Seguimiento de Progreso** - Registra peso, PRs y metas  
✅ **Nutrición** - Calculadora TDEE, hidratación  
✅ **Mentalidad** - Inspiración diaria, timer de descanso  
✅ **Modo Invitado** - Accede sin crear cuenta  

## 🔐 Sistema de Login

- **Usuario/Contraseña Simple**: Sin necesidad de email o teléfono
- **Perfil Persistente**: Tus datos se guardan en tu cuenta
- **Modo Invitado**: Accede como guest sin crear cuenta
- **Protección de Datos**: Solo con sesión iniciada puedes modificar datos

## 🎯 Cómo Empezar

1. **Abre** `index.html` en tu navegador
2. **Registrate** o inicia sesión, o entra como **Invitado**
3. **Completa tu perfil** con tu información
4. **Comienza a entrenar** - accede a calendarios, ejercicios y nutrición

### Credenciales de Prueba
- Usuario: `demo`
- Contraseña: `demo`

## 🌐 Hosting Recomendado

- **Netlify** (Gratuito, excelente para HTML/CSS/JS)
- **GitHub Pages** (Gratuito, perfecto para static sites)
- **Vercel** (Gratuito, muy rápido)
- **000webhost** (Hosting PHP/HTML gratuito)
- **Hostinger** (Económico, muy confiable)

## 📱 Características Técnicas

- **Diseño Responsive** - Funciona en móvil, tablet y desktop
- **Almacenamiento Local** - Los datos se guardan en tu dispositivo
- **Sin Backend** - App 100% frontend
- **Optimizado** - Carga rápida y rendimiento excelente
- **Tema Dark** - Diseño moderno con colores neón
- **Logo/Nav mejorado** - Header consistente en todas las páginas

## 🗂️ Estructura de Archivos

```
.
├── index.html           (Página principal)
├── ejercicios.html      (Base de ejercicios)
├── calendario.html      (Planificador - fechas corregidas)
├── nutricion.html       (Calculadora TDEE)
├── progreso.html        (Seguimiento)
├── perfil.html          (Perfil avanzado con historial)
├── mentalidad.html      (Motivación)
├── assets/
│   ├── js/
│   │   └── auth.js      (Sistema de autenticación)
│   └── css/
```

## 🔧 Mejoras Implementadas

### v2.0 Actualización
- ✅ Sistema de autenticación completo
- ✅ Perfil mejorado con historial de progreso
- ✅ Corrección de fechas en calendario (problema de zona horaria)
- ✅ Header consistente con logo SF y botones de sesión
- ✅ Control de acceso a funcionalidades
- ✅ Guardado de datos por usuario

## 📋 Guía de Uso por Página

### 🏠 Inicio
- Accede a todas las funciones
- Botón de login/perfil en la esquina
- Opción de acceso como invitado

### 👤 Perfil  
- Completa tu información personal
- Registra tus medidas (altura, peso, grasa corporal)
- Configuración de entrenamiento
- **Historial de peso** con fechas
- Cálculo automático de IMC y MLG

### 📅 Calendario
- Visualiza el mes actual
- **Fechas correctas** sin problemas de zona horaria
- Agrega ejercicios por día
- Marca días de descanso

### 🏋️ Ejercicios
- Filtra por grupo muscular
- Descripción e imágenes
- Agrégalos a tu calendario

### 📈 Progreso
- Registra tu evolución
- Visualiza tendencias

### 🥗 Nutrición
- Calcula tu TDEE
- Planifica macros

### 🔥 Mentalidad
- Frases inspiradoras diarias
- Timer de descanso

## 💾 Datos Guardados

Los datos se guardan automáticamente en el navegador:
- Información de perfil por usuario
- Calendario y rutinas
- Historial de peso
- Progreso
- Preferencias

**Los datos son locales a tu dispositivo/navegador**

## 🐛 Solución de Problemas

### "Acceso Restringido"
→ Necesitas iniciar sesión o entrar como invitado

### "Las fechas están mal"
→ Se corrigió el problema de zona horaria. Actualiza la página.

### "No se guardan mis datos"
→ Asegúrate de iniciar sesión primero

### "¿Cómo exporto mis datos?"
→ Abre DevTools (F12) → Application → Local Storage → Copia los valores
├── perfil.html          (Datos personales)
├── mentalidad.html      (Motivación)
├── README.md            (Este archivo)
└── .htaccess            (Configuración Apache - opcional)
```

## 💾 Datos Almacenados

Todos los datos se guardan en localStorage del navegador:
- Perfil personal
- Ejercicios favoritos
- Calendario de entrenamientos
- Registro de peso
- Récords personales
- Metas y hábitos
- Mantras inspiracionales

**Nota:** Los datos son locales. No se envían a ningún servidor.

## ⚙️ Configuración Avanzada

### Si usas Apache (.htaccess)

El archivo `.htaccess` incluye:
- Redireccionamiento HTTPS
- Caché inteligente
- Compresión GZIP
- Seguridad mejorada

## 🔒 Privacidad

Tus datos son **100% privados**:
- ✅ No se recopilan datos
- ✅ No se envía información a servidores
- ✅ Sin cookies de seguimiento
- ✅ Sin publicidad
- ✅ Sin análisis

## 📞 Soporte

Para reportar bugs o sugerir mejoras, contacta al desarrollador.

## 📄 Licencia

Esta aplicación es de uso personal. Puedes modificarla libremente para tus necesidades.

---

**Versión:** 1.0  
**Última actualización:** Enero 2026  
**Desarrollado por:** SANTI FITNESS

Hecho con 💪 para tu transformación fitness
