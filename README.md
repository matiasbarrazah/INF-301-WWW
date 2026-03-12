# Fukusuke Frontend

Aplicación frontend de e-commerce para sushi (proyecto académico INF-301-WWW), construida con React + TypeScript + Vite.

El proyecto simula un flujo completo de compra (catálogo, carrito, checkout y pedidos) **sin backend**.

## Tabla de contenido

- [Resumen](#resumen)
- [Stack tecnológico](#stack-tecnologico)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalacion-y-ejecucion)
- [Scripts disponibles](#scripts-disponibles)
- [Flujo demo](#flujo-demo)
- [Autenticación demo](#autenticacion-demo)
- [Pago con tarjeta (simulado)](#pago-con-tarjeta-simulado)
- [Rutas de la aplicación](#rutas-de-la-aplicacion)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Decisiones y alcance](#decisiones-y-alcance)
- [Troubleshooting](#troubleshooting)
- [Mejoras futuras](#mejoras-futuras)

## Resumen

Fukusuke Frontend implementa:

- Landing page y menú de productos.
- Registro e inicio de sesión simulados.
- Carrito con actualización de cantidades.
- Checkout protegido por autenticación.
- Selección de método de pago.
- Formulario de tarjeta de crédito/débito **solo visual/simulado**.
- Vista de pedidos y panel administrativo (demo de interfaz).

## Stack tecnologico

- React 18
- TypeScript 5
- Vite 5
- React Router DOM 6
- Bootstrap 5 (con estilos de marca propios)

## Requisitos

- Node.js 18+ (recomendado)
- npm 9+

## Instalacion y ejecucion

1. Clona o descarga este repositorio.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Instala dependencias:

```bash
npm install
```

4. Levanta servidor de desarrollo:

```bash
npm run dev
```

5. Abre en navegador la URL que entrega Vite (normalmente `http://localhost:5173/`).

## Scripts disponibles

```bash
npm run dev      # servidor de desarrollo
npm run build    # compila TypeScript + build de producción
npm run preview  # previsualiza el build generado
```

## Flujo demo

1. Ir a `Menú` y agregar productos.
2. Ir a `Carrito` para revisar totales.
3. Ir a `Checkout` (requiere sesión).
4. Elegir método de pago:
   - Tarjeta crédito/débito (simulado)
   - Servipag
   - Transferencia bancaria
5. Confirmar pedido y revisar en `Mis pedidos`.

## Autenticacion demo

La autenticación está simulada en frontend.

- Email demo válido: `maria@example.com`
- Contraseña: cualquiera (en modo demo)

La sesión se guarda en `sessionStorage` con la clave `fukusuke_user`.

## Pago con tarjeta (simulado)

En Checkout existe un formulario de tarjeta con:

- Nombre titular
- Número de tarjeta
- Fecha de vencimiento
- CVV
- Detección visual de marca (Visa/Mastercard/Amex)

Importante:

- No hay conexión a pasarela real.
- No hay tokenización ni cobro real.
- Es solo una simulación de interfaz para frontend.

## Rutas de la aplicacion

Públicas:

- `/` Inicio
- `/menu` Menú
- `/login` Login
- `/register` Registro
- `/cart` Carrito

Protegidas (usuario autenticado):

- `/checkout`
- `/orders`

Protegida por roles (`admin` o `dueño`):

- `/admin`

## Estructura del proyecto

```text
src/
  components/
    Footer.tsx
    Layout.tsx
    Navbar.tsx
    ProductCard.tsx
    ProtectedRoute.tsx
  context/
    AuthContext.tsx
    CartContext.tsx
  data/
    products.ts
  pages/
    Home.tsx
    Menu.tsx
    Login.tsx
    Register.tsx
    Cart.tsx
    Checkout.tsx
    Orders.tsx
    Admin.tsx
  types/
    index.ts
```

## Decisiones y alcance

- Proyecto diseñado para evaluación frontend (sin API ni base de datos).
- Datos de productos y pedidos en memoria/local del navegador.
- Enfoque en UX/UI, navegación, estado y validaciones de formulario.

## Troubleshooting

### Error EPERM al iniciar Vite

Si aparece un error como:

```text
Error: EPERM: operation not permitted, rmdir node_modules/.vite/deps
```

prueba:

1. Detener todos los procesos de Vite/Node en terminales abiertas.
2. Eliminar caché de Vite:

```powershell
Remove-Item node_modules/.vite -Recurse -Force
```

3. Volver a ejecutar:

```bash
npm run dev
```

### El editor marca errores pero `npm run build` compila

Puede ser caché del servidor TypeScript de VS Code. Solución típica:

- Reiniciar TS Server.
- Recargar ventana de VS Code.



---

Proyecto académico para INF-301-WWW.
