# Sistema de Gestión de Parqueadero

> Proyecto full-stack guiado por el docente — Programación Avanzada 2026A

**Stack base:** NestJS · Next.js · PostgreSQL · Docker · Prisma

---

## Tabla de Contenidos
- Descripción del Proyecto
- Stack Tecnológico
- Arquitectura
- Modelo de Datos
- Plan de Releases
- Sprints e Historias de Usuario
- Cronograma
- Definition of Done (DoD)
- Instalación y Ejecución

---

## Descripción del Proyecto

El Sistema de Gestión de Parqueadero es una aplicación web full-stack que permite administrar el ingreso y salida de vehículos, calcular tarifas automáticamente, gestionar abonados mensuales y visualizar la ocupación en tiempo real.

### Alcance

| Aspecto | Detalle |
|---|---|
| Tipo | Proyecto demostrativo — Guiado por el Docente |
| Capacidad | 150 vehículos |
| Historias de Usuario | 10 HUs organizadas en 5 sprints |
| Releases | 2 releases alineados con los cortes académicos |
| Casos de Uso | Registro de ingreso, salida, tarifas, abonados y ocupación |

### Funcionalidades Principales
- Registro de ingreso de vehículos
- Registro de salida de vehículos
- Cálculo automático de tarifas
- Gestión de tarifas por tipo de vehículo
- Registro y validación de abonados mensuales
- Visualización de ocupación actual en tiempo real
- Integración Frontend ↔ Backend con Docker Compose

---

## Stack Tecnológico

| Capa | Tecnología | Propósito |
|---|---|---|
| Backend | NestJS (Node.js + TypeScript) | API REST con arquitectura en capas |
| Frontend | Next.js 14+ (React + TypeScript) | Interfaz de usuario con App Router |
| Base de Datos | PostgreSQL 16 | Almacenamiento relacional |
| ORM | Prisma | Modelado de datos, migraciones y queries |
| Contenedores | Docker + Docker Compose | Orquestación de servicios |
| Validación | class-validator + class-transformer | DTOs y validación de entrada |

---

## Arquitectura

El proyecto sigue una arquitectura en capas con separación de responsabilidades:

```text
Cliente HTTP → Controller → Service → Repository → Prisma / PostgreSQL
```

### Estructura del Proyecto

```text
proyecto/
├── docker-compose.yml
├── .env.example
├── backend/                        # API REST con NestJS
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── common/
│   │   │   ├── filters/
│   │   │   ├── interceptors/
│   │   │   ├── pipes/
│   │   │   └── guards/
│   │   ├── prisma/
│   │   └── modules/
│   │       ├── vehicle-entry/
│   │       ├── vehicle-exit/
│   │       ├── tariffs/
│   │       ├── subscribers/
│   │       └── occupancy/
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
├── frontend/                       # Interfaz con Next.js
│   ├── Dockerfile
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   └── src/
│       ├── app/
│       ├── components/
│       ├── services/
│       ├── interfaces/
│       └── lib/
└── README.md
```

---

## Modelo de Datos

### Entidades base
- VehicleMovement
- Tariff
- Subscriber
- ParkingCapacity

### Diagrama lógico inicial

### Diagrama lógico inicial

```text
Abonado            1 ──── N  MovimientoVehicular
Tarifa             1 ──── N  MovimientoVehicular
CapacidadParqueo   1 ──── N  MovimientoVehicular
```

---


## Plan de Releases

### Release 1 — Segundo Corte
- HU-01 a HU-05
- Base del repositorio, ingreso/salida y cálculo inicial

### Release 2 — Tercer Corte
- HU-06 a HU-10
- Tarifas, abonados y visualización completa de ocupación

---

## Sprints e Historias de Usuario

| Sprint | Fechas | Historias |
|---|---|---|
| Sprint 1 | Mar 25 - Abr 1 o 2 | HU-01 |
| Sprint 2 | Abr 3 - Abr 9 | HU-02, HU-03 |
| Sprint 3 | Abr 10 - Abr 14 | HU-04, HU-05 |
| Sprint 4 | Abr 15 - Abr 23 | HU-06, HU-07 |
| Sprint 5 | Abr 24 - Abr 30 | HU-08, HU-09, HU-10 |

### Historias de Usuario
1. Como integrante del equipo de desarrollo, quiero crear y configurar el repositorio del proyecto en GitHub para centralizar el código fuente, controlar versiones y facilitar el trabajo colaborativo.
2. Como operador del parqueadero, quiero registrar el ingreso de un vehículo con su placa, tipo y hora de entrada para llevar un control preciso de los vehículos que ingresan.
3. Como administrador del sistema, quiero almacenar y consultar la información de los ingresos y salidas de vehículos para mantener un historial confiable y evitar pérdidas de registro.
4. Como operador del parqueadero, quiero registrar la salida de un vehículo para finalizar su permanencia en el sistema de manera correcta.
5. Como administrador del parqueadero, quiero que el sistema calcule automáticamente la tarifa según el tiempo de permanencia y el tipo de vehículo para reducir errores de cobro y evitar pérdidas de ingresos.
6. Como administrador del parqueadero, quiero configurar y actualizar tarifas por tipo de vehículo y modalidad de cobro para adaptar el sistema a las políticas del negocio.
7. Como administrador del parqueadero, quiero registrar clientes abonados con su plan mensual y vehículo asociado para gestionar su acceso de forma diferenciada.
8. Como operador del parqueadero, quiero que el sistema identifique si un vehículo pertenece a un cliente abonado activo para aplicar el control de acceso y cobro correspondiente.
9. Como operador del parqueadero, quiero visualizar la ocupación actual del parqueadero en tiempo real para saber cuántos espacios están disponibles.
10. Como administrador del parqueadero, quiero ver la disponibilidad de espacios por tipo de vehículo y las tarifas vigentes para tomar decisiones rápidas sobre la operación del parqueadero.

---

## Cronograma

- Inicio del proyecto: 25 de marzo de 2026
- Cierre del Sprint 1: 1 o 2 de abril de 2026
- Cierre del Sprint 5: 30 de abril de 2026

---

## Definition of Done (DoD)

Una historia de usuario se considera terminada cuando:
1. Cumple todos sus criterios de aceptación.
2. La funcionalidad está implementada en la capa correspondiente.
3. El código funciona sin errores.
4. La funcionalidad fue probada manualmente.
5. Los datos se guardan y consultan correctamente, si aplica.
6. La interfaz muestra mensajes claros al usuario.
7. La funcionalidad está integrada con el resto del sistema.
8. No rompe funciones ya existentes.
9. El código fue subido al repositorio del proyecto.
10. Está lista para ser presentada en la entrega final.

### DoD específico HU-01
- Repositorio creado en GitHub.
- README inicial cargado.
- Estructura base de backend y frontend definida.
- Docker Compose inicial agregado.
- Variables de entorno documentadas.
- Plantillas de issues y PR agregadas.
- Primer commit realizado.

---

## Instalación y Ejecución

### Variables de entorno
1. Copiar `.env.example` a `.env`
2. Ajustar credenciales según sea necesario

### Ejecución con Docker
```bash
docker compose up --build
```

### Servicios esperados
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- PostgreSQL: localhost:5432

---

## Convenciones de trabajo
- Ramas sugeridas: `main`, `develop`, `feature/*`, `fix/*`
- Commits sugeridos: `feat:`, `fix:`, `docs:`, `chore:`
- Pull requests obligatorios para integrar cambios importantes
