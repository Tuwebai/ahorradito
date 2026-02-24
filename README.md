# 🛒 Ahorradito - Comparador de Precios de Supermercados

[![Deploy on Vercel](https://img.shields.io/badge/Deploy%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/ahorradito)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📖 Descripción

**Ahorradito** es una aplicación web moderna que te ayuda a ahorrar dinero comparando precios de productos entre diferentes supermercados. Con una interfaz oscura y elegante, podés encontrar las mejores ofertas y optimizar tu presupuesto familiar....

### ✨ Características Principales

- 🔍 **Búsqueda Inteligente**: Encontrá productos por nombre, categoría o marca
- 📊 **Comparación de Precios**: Visualizá precios de múltiples supermercados
- 🛒 **Carrito Inteligente**: Te recomendamos dónde comprar todo junto
- 💰 **Cálculo de Ahorro**: Ve cuánto podés ahorrar en cada producto
- 🔔 **Notificaciones**: Alertas cuando bajen los precios
- 📱 **Diseño Responsive**: Funciona perfecto en móviles y desktop
- 🌙 **Tema Oscuro**: Interfaz moderna y cómoda para los ojos

## 🚀 Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Icons**: Lucide React
- **Deployment**: Vercel (recomendado)

## 📦 Instalación

### Prerrequisitos

- Node.js 18.0.0 o superior
- npm 8.0.0 o superior

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/ahorradito.git
   cd ahorradito
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Scripts Disponibles

```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar en modo producción
npm run lint         # Ejecutar linter
npm run type-check   # Verificar tipos TypeScript
```

## 🎨 Personalización

### Colores del Tema

El proyecto utiliza un tema oscuro personalizado con los siguientes colores:

- **Fondo Principal**: `#0F1117`
- **Superficie**: `#1A1D24`
- **Texto**: `#EAEAEA`
- **Acento Principal**: `#00BFFF` (Azul eléctrico)
- **Acento Secundario**: `#39FF14` (Verde neón)

### Modificar Colores

Los colores se pueden personalizar en `tailwind.config.ts`:

```typescript
colors: {
  background: "#0F1117",
  foreground: "#EAEAEA",
  primary: {
    DEFAULT: "#00BFFF",
    // ...
  }
}
```

## 📁 Estructura del Proyecto

```
ahorradito/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── como-funciona/     # Página informativa
├── components/            # Componentes React
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── header.tsx        # Header de la aplicación
│   ├── footer.tsx        # Footer de la aplicación
│   └── ...               # Otros componentes
├── data/                 # Datos estáticos
│   ├── productos.json    # Lista de productos
│   ├── precios.json      # Precios por supermercado
│   └── supermercados.json # Información de supermercados
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y servicios
├── types/                # Definiciones de TypeScript
└── public/               # Archivos estáticos
```

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conectar con GitHub**
   - Fork este repositorio
   - Conectá tu cuenta de Vercel con GitHub
   - Importá el proyecto en Vercel

2. **Configuración Automática**
   - Vercel detectará automáticamente que es un proyecto Next.js
   - El build se ejecutará automáticamente en cada push

3. **Variables de Entorno** (si las necesitas)
   ```env
   NEXT_PUBLIC_API_URL=tu-api-url
   ```

### Otros Proveedores

- **Netlify**: Configurá el build command como `npm run build`
- **Railway**: Conectá directamente desde GitHub
- **DigitalOcean App Platform**: Soporte nativo para Next.js

## 🤝 Contribuir

1. Fork el proyecto
2. Creá una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrí un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- **Email**: info@ahorradito.com.ar
- **Website**: [ahorradito.com.ar](https://ahorradito.com.ar)
- **GitHub**: [@ahorradito](https://github.com/ahorradito)

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework increíble
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [Radix UI](https://www.radix-ui.com/) por los componentes accesibles
- [Lucide](https://lucide.dev/) por los iconos hermosos

---

**¡Gracias por usar Ahorradito! 💚**
