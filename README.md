# Sistema de Gestión de Parqueadero

> Proyecto full-stack académico para la asignatura **Programación Avanzada 2026A**

## Integrantes

- **Juan David Calderón Gutiérrez**
- **Zara Melisa Monroy Vera**

---

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Contexto del Problema](#contexto-del-problema)
3. [Objetivo General](#objetivo-general)
4. [Objetivos Específicos](#objetivos-específicos)
5. [Alcance del Proyecto](#alcance-del-proyecto)
6. [Casos de Uso Principales](#casos-de-uso-principales)
7. [Stack Tecnológico](#stack-tecnológico)
8. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
9. [Estructura del Proyecto](#estructura-del-proyecto)
10. [Modelo de Datos](#modelo-de-datos)
11. [Reglas de Negocio Principales](#reglas-de-negocio-principales)
12. [Historias de Usuario](#historias-de-usuario)
13. [Definition of Done General](#definition-of-done-general)
14. [Plan de Trabajo](#plan-de-trabajo)
15. [Instalación y Ejecución](#instalación-y-ejecución)
16. [Variables de Entorno](#variables-de-entorno)
17. [Servicios Esperados](#servicios-esperados)
18. [Endpoints Base del Backend](#endpoints-base-del-backend)
19. [Convenciones de Trabajo](#convenciones-de-trabajo)
20. [Entregables del Proyecto](#entregables-del-proyecto)

---

## Descripción del Proyecto

El **Sistema de Gestión de Parqueadero** es una aplicación web full-stack que permite administrar de forma digital la operación de un parqueadero con capacidad para **150 vehículos**.

La plataforma permite:

- Registrar el ingreso de vehículos.
- Registrar la salida de vehículos.
- Calcular automáticamente la tarifa según el tiempo de permanencia.
- Gestionar tarifas por tipo de vehículo.
- Registrar clientes abonados con plan mensual.
- Visualizar la ocupación actual del parqueadero.
- Consultar la disponibilidad de espacios por tipo de vehículo.

---

## Contexto del Problema

Actualmente, el parqueadero realiza el control de ingreso y salida mediante tiquetes en papel. Este proceso presenta múltiples problemas:

- Pérdida frecuente de tiquetes.
- Errores en el registro manual de horas.
- Cobros inconsistentes por cálculo manual.
- Falta de trazabilidad de ingresos y salidas.
- Dificultad para conocer la ocupación en tiempo real.
- Ausencia de control diferenciado para clientes abonados.

Este proyecto busca resolver esos problemas mediante una solución web centralizada y estructurada.

---

## Objetivo General

Desarrollar una aplicación web full-stack funcional para administrar la operación de un parqueadero, aplicando arquitectura en capas, buenas prácticas de desarrollo, persistencia en PostgreSQL, validación de datos y despliegue con Docker Compose.

---

## Objetivos Específicos

- Implementar una API REST con NestJS siguiendo la arquitectura **Controller → Service → Repository**.
- Diseñar un modelo de datos relacional con Prisma y PostgreSQL.
- Construir una interfaz web con Next.js para registrar ingresos, salidas, tarifas y abonados.
- Calcular automáticamente el valor a cobrar según el tipo de vehículo y tiempo de permanencia.
- Mostrar la ocupación actual del parqueadero y la disponibilidad por tipo de vehículo.
- Integrar frontend, backend y base de datos con Docker Compose.
- Documentar el proyecto mediante README, historias de usuario e issues en GitHub.

---

## Alcance del Proyecto

El sistema cubrirá los siguientes procesos:

- Registro de ingreso de vehículos.
- Registro de salida de vehículos.
- Consulta del historial de movimientos.
- Cálculo automático de tarifa.
- Administración de tarifas por tipo de vehículo.
- Registro y validación de abonados.
- Visualización de ocupación y disponibilidad.
- Gestión de espacios del parqueadero.

### Fuera de alcance

- Pasarela de pagos en línea.
- Facturación electrónica.
- Integración con cámaras o lectores automáticos de placas.
- Aplicación móvil nativa.
- Notificaciones por correo o SMS.

---

## Casos de Uso Principales

- **CU-01:** Registrar ingreso de vehículo con placa, tipo y hora de entrada.
- **CU-02:** Registrar salida de vehículo y calcular tarifa según tiempo de permanencia.
- **CU-03:** Gestionar tarifas por tipo de vehículo y modalidad de cobro.
- **CU-04:** Registrar clientes abonados con plan mensual y vehículo asociado.
- **CU-05:** Visualizar la ocupación actual del parqueadero con espacios disponibles por tipo.

---

## Stack Tecnológico

| Capa | Tecnología | Propósito |
|---|---|---|
| Backend | NestJS + TypeScript | API REST con arquitectura en capas |
| Frontend | Next.js + TypeScript | Interfaz web con App Router |
| Base de Datos | PostgreSQL 16 | Persistencia relacional |
| ORM | Prisma ORM | Modelado de datos, migraciones y acceso a base de datos |
| Infraestructura | Docker + Docker Compose | Orquestación de servicios |
| Validación | class-validator + class-transformer | Validación de DTOs |
| Control de versiones | Git + GitHub | Gestión del código y trabajo colaborativo |

---

## Arquitectura del Proyecto

El proyecto sigue una arquitectura en capas con separación clara de responsabilidades:

```text
Cliente HTTP → Controller → Service → Repository → Prisma → PostgreSQL
```

### Responsabilidad de cada capa

- **Controller:** recibe peticiones HTTP, procesa parámetros y delega al service.
- **Service:** implementa la lógica de negocio y valida reglas del dominio.
- **Repository:** encapsula el acceso a datos usando Prisma Client.
- **DTOs:** validan los datos de entrada.
- **Entities:** representan el dominio del sistema.
- **Common:** agrupa filtros, pipes, guards, interceptores y decoradores reutilizables.

---

## Estructura del Proyecto

```text
proyecto/
├── docker-compose.yml
├── .env
├── .env.example
├── .gitignore
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── .env
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── common/
│   │   │   ├── filters/
│   │   │   │   └── http-exception.filter.ts
│   │   │   ├── interceptors/
│   │   │   │   └── response.interceptor.ts
│   │   │   ├── pipes/
│   │   │   │   └── validation.pipe.ts
│   │   │   ├── guards/
│   │   │   │   └── api-key.guard.ts
│   │   │   └── decorators/
│   │   ├── config/
│   │   │   └── env.config.ts
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   └── modules/
│   │       ├── tipo-vehiculo/
│   │       ├── vehiculo/
│   │       ├── tarifa/
│   │       ├── espacio/
│   │       ├── abonado/
│   │       └── registro-parqueo/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── test/
├── frontend/
│   ├── Dockerfile
│   ├── .env.local
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── interfaces/
│   │   └── lib/
│   └── package.json
```

---

## Modelo de Datos

### Entidades principales

- **TipoVehiculo**
- **Vehiculo**
- **Tarifa**
- **Espacio**
- **Abonado**
- **RegistroParqueo**

### Descripción breve de cada entidad

- **TipoVehiculo:** define categorías como carro, moto o bicicleta.
- **Vehiculo:** almacena la información básica del vehículo, principalmente su placa y tipo.
- **Tarifa:** define los valores de cobro por tipo de vehículo y modalidad.
- **Espacio:** representa los cupos del parqueadero y su disponibilidad.
- **Abonado:** registra clientes con plan mensual vigente.
- **RegistroParqueo:** almacena el movimiento de ingreso y salida de cada vehículo.

### Relaciones principales

```text
TipoVehiculo 1 ──── N Vehiculo
TipoVehiculo 1 ──── N Tarifa
TipoVehiculo 1 ──── N Espacio
Vehiculo     1 ──── N RegistroParqueo
Vehiculo     1 ──── 1 Abonado
Espacio      1 ──── N RegistroParqueo
Tarifa       1 ──── N RegistroParqueo
```

---

## Reglas de Negocio Principales

- No se puede registrar el ingreso de un vehículo si ya tiene un ingreso activo.
- No se puede registrar la salida de un vehículo que no tenga ingreso activo.
- El sistema debe asignar un espacio disponible compatible con el tipo de vehículo.
- La tarifa aplicada debe corresponder al tipo de vehículo y modalidad configurada.
- Si el vehículo pertenece a un abonado activo, se debe aplicar la lógica de cobro definida para abonados.
- La ocupación debe actualizarse después de cada ingreso y salida.
- No se debe permitir duplicar una placa con abono activo.
- No se debe permitir registrar ingresos cuando no existan espacios disponibles del tipo correspondiente.

---

## Historias de Usuario

### HU-01

**Historia de usuario:**  
Como integrante del equipo de desarrollo, quiero crear y configurar el repositorio del proyecto en GitHub para centralizar el código fuente, controlar versiones y facilitar el trabajo colaborativo.

**Criterios de aceptación:**

- El repositorio del proyecto debe estar creado en GitHub.
- El repositorio debe tener un nombre acorde al proyecto.
- Todos los integrantes del equipo deben tener acceso al repositorio.
- Debe existir una estructura inicial del proyecto en el repositorio.
- Debe existir al menos un archivo README con información básica del proyecto.
- Los cambios realizados por el equipo deben poder subirse correctamente al repositorio.

**DoD:**

- El repositorio fue creado y configurado correctamente.
- Los integrantes necesarios fueron agregados como colaboradores.
- Se realizó al menos un primer commit con la estructura base del proyecto.
- El README inicial fue cargado.
- Se comprobó que el repositorio permite clonar, subir y actualizar código sin errores.
- El repositorio quedó listo para usarse durante el desarrollo.

---

### HU-02

**Historia de usuario:**  
Como operador del parqueadero, quiero registrar el ingreso de un vehículo con su placa, tipo y hora de entrada para llevar un control preciso de los vehículos que ingresan.

**Criterios de aceptación:**

- El sistema debe permitir ingresar la placa del vehículo.
- El sistema debe permitir seleccionar el tipo de vehículo.
- El sistema debe registrar la fecha y hora de entrada.
- El sistema no debe permitir campos obligatorios vacíos.
- El sistema no debe permitir registrar dos ingresos activos con la misma placa.
- El sistema debe validar que exista disponibilidad para el tipo de vehículo seleccionado.
- El sistema debe confirmar que el ingreso fue registrado correctamente.

**DoD:**

- La interfaz de registro de ingreso está implementada.
- El backend procesa correctamente la solicitud de ingreso.
- El sistema valida los campos obligatorios.
- El sistema evita registros duplicados activos.
- El sistema valida disponibilidad de espacios.
- La información se guarda correctamente en la base de datos.
- La funcionalidad fue probada con casos válidos e inválidos.
- El módulo quedó integrado al sistema sin errores.

---

### HU-03

**Historia de usuario:**  
Como administrador del sistema, quiero consultar el historial de movimientos de ingreso y salida de vehículos para llevar un control confiable de la operación del parqueadero y evitar pérdidas de información.

**Criterios de aceptación:**

- El sistema debe permitir consultar el historial de movimientos registrados.
- Cada movimiento debe mostrar como mínimo la placa del vehículo, tipo de vehículo, fecha y hora de ingreso y, si existe, fecha y hora de salida.
- Cada registro debe tener un identificador único.
- El sistema debe diferenciar claramente los registros activos de los finalizados.
- La información consultada debe coincidir con la almacenada en la base de datos.
- El sistema no debe mostrar registros incompletos o inconsistentes.

**DoD:**

- La estructura de base de datos para almacenar los movimientos está implementada.
- Los modelos y relaciones necesarios están correctamente definidos.
- El backend permite consultar el historial de movimientos.
- La información persiste correctamente en la base de datos.
- La consulta del historial fue probada con casos válidos.
- Se verificó que los datos mostrados coinciden con los registros almacenados.
- La funcionalidad quedó integrada con los módulos de ingreso y salida sin errores.

---

### HU-04

**Historia de usuario:**  
Como operador del parqueadero, quiero registrar la salida de un vehículo para finalizar su permanencia en el sistema de manera correcta.

**Criterios de aceptación:**

- El sistema debe permitir buscar el vehículo por placa o por registro activo.
- El sistema debe registrar la fecha y hora de salida.
- Solo se debe permitir la salida de vehículos con ingreso activo.
- El estado del registro debe actualizarse correctamente al registrar la salida.
- El sistema debe liberar el espacio ocupado al confirmar la salida.
- El sistema debe mostrar confirmación de salida exitosa.

**DoD:**

- La interfaz para registrar salida está implementada.
- El backend valida que el vehículo tenga ingreso activo.
- La fecha y hora de salida se almacenan correctamente.
- El estado del registro cambia correctamente después de la salida.
- El espacio se libera correctamente después del cierre del registro.
- La funcionalidad fue probada con casos válidos e inválidos.
- El módulo quedó integrado con el historial de movimientos.
- No se generan salidas duplicadas ni inconsistentes.

---

### HU-05

**Historia de usuario:**  
Como administrador del parqueadero, quiero que el sistema calcule automáticamente la tarifa según el tiempo de permanencia y el tipo de vehículo para reducir errores de cobro y evitar pérdidas de ingresos.

**Criterios de aceptación:**

- El sistema debe calcular el tiempo de permanencia entre el ingreso y la salida.
- El sistema debe aplicar la tarifa correspondiente al tipo de vehículo.
- El valor calculado debe mostrarse antes de confirmar la salida.
- El sistema debe evitar cálculos manuales por parte del operador.
- Si el vehículo es abonado activo, el sistema debe aplicar la lógica correspondiente.
- Si no existe una tarifa vigente para el tipo de vehículo, el sistema debe informar el error y no cerrar la salida hasta resolverlo.

**DoD:**

- La lógica de cálculo tarifario está implementada en backend.
- El sistema toma correctamente los datos de ingreso, salida y tipo de vehículo.
- El valor calculado se muestra correctamente en la interfaz.
- Se probaron distintos casos de permanencia y tipos de vehículo.
- Se validó la integración con la configuración de tarifas.
- Se validó la integración con abonados activos.
- Se validó el comportamiento cuando no existe tarifa vigente.
- El cálculo funciona sin errores dentro del flujo de salida.

---

### HU-06

**Historia de usuario:**  
Como administrador del parqueadero, quiero configurar y actualizar tarifas por tipo de vehículo y modalidad de cobro para adaptar el sistema a las políticas del negocio.

**Criterios de aceptación:**

- El sistema debe permitir crear tarifas por tipo de vehículo.
- El sistema debe permitir editar tarifas existentes.
- El sistema debe permitir definir la modalidad de cobro.
- Los valores ingresados deben ser numéricos y válidos.
- Las tarifas actualizadas deben aplicarse en futuros cobros.
- El sistema debe permitir consultar las tarifas vigentes.

**DoD:**

- Existe formulario o módulo para administrar tarifas.
- El backend permite crear, editar y consultar tarifas.
- Las tarifas quedan guardadas correctamente en la base de datos.
- El sistema valida datos inválidos antes de guardar.
- Se probó la creación y edición de tarifas.
- Se verificó que los cobros usan la tarifa vigente.
- La funcionalidad quedó integrada con el cálculo de pagos.

---

### HU-07

**Historia de usuario:**  
Como administrador del parqueadero, quiero registrar clientes abonados con su plan mensual y vehículo asociado para gestionar su acceso de forma diferenciada.

**Criterios de aceptación:**

- El sistema debe permitir registrar los datos del abonado.
- El sistema debe permitir asociar una placa al abonado.
- El sistema debe permitir registrar la vigencia del plan.
- No debe permitirse duplicar una placa con abono activo.
- El sistema debe guardar correctamente la información del abonado.
- El sistema debe confirmar cuando el registro sea exitoso.

**DoD:**

- El módulo de registro de abonados está implementado.
- El backend valida los datos ingresados.
- La información se almacena correctamente en la base de datos.
- La restricción de placa duplicada activa funciona correctamente.
- Se probaron registros válidos e inválidos.
- La funcionalidad quedó integrada con ingreso, salida y cobro.
- El registro de abonados funciona sin errores.

---

### HU-08

**Historia de usuario:**  
Como operador del parqueadero, quiero que el sistema identifique si un vehículo pertenece a un cliente abonado activo para aplicar el control de acceso y cobro correspondiente.

**Criterios de aceptación:**

- El sistema debe verificar automáticamente si la placa corresponde a un abonado.
- El sistema debe diferenciar entre abonado activo, vencido y no registrado.
- La validación debe funcionar al ingreso y a la salida.
- El sistema debe mostrar claramente el estado del abonado al operador.
- La lógica de cobro debe ajustarse según el estado del abonado.

**DoD:**

- La lógica de validación de abonados está implementada.
- El sistema consulta correctamente la información del abonado en base de datos.
- La interfaz muestra el estado del abonado al operador.
- Se probaron escenarios de abonado activo, vencido y no existente.
- La validación quedó integrada con ingreso, salida y cálculo de tarifa.
- No se presentan errores de identificación de placas registradas.
- La funcionalidad quedó operativa dentro del flujo normal del sistema.

---

### HU-09

**Historia de usuario:**  
Como operador del parqueadero, quiero visualizar la ocupación actual del parqueadero para saber cuántos espacios están disponibles.

**Criterios de aceptación:**

- El sistema debe mostrar la cantidad actual de vehículos dentro del parqueadero.
- El sistema debe mostrar los espacios disponibles respecto a la capacidad total.
- La información debe actualizarse después de cada ingreso y salida.
- Los datos visibles deben coincidir con los registros activos.
- La visualización debe ser clara y entendible.

**DoD:**

- La vista o panel de ocupación está implementado.
- El backend entrega los datos actuales de ocupación.
- La interfaz muestra ocupados y disponibles correctamente.
- La ocupación se actualiza después de cada movimiento.
- Se validó que los datos coincidan con los registros almacenados.
- Se probaron varios escenarios de entrada y salida.
- La funcionalidad quedó integrada al panel principal del sistema.

---

### HU-10

**Historia de usuario:**  
Como administrador del parqueadero, quiero ver la disponibilidad de espacios por tipo de vehículo y las tarifas vigentes para tomar decisiones rápidas sobre la operación del parqueadero.

**Criterios de aceptación:**

- El sistema debe mostrar espacios disponibles por tipo de vehículo.
- El sistema debe diferenciar la información por carro, moto y bicicleta.
- El sistema debe mostrar también las tarifas vigentes.
- La información debe actualizarse cuando cambie la ocupación o las tarifas.
- Los datos mostrados deben coincidir con la información almacenada en el sistema.

**DoD:**

- La vista administrativa correspondiente está implementada.
- El backend entrega datos de disponibilidad por tipo de vehículo.
- El backend entrega las tarifas vigentes configuradas.
- La interfaz muestra correctamente ambas informaciones.
- Se validó que los datos coincidan con base de datos y lógica de negocio.
- Se probaron cambios en ocupación y tarifas.
- La funcionalidad quedó integrada al panel administrativo sin errores.

---

## Definition of Done General

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

---

## Plan de Trabajo

### Fase 1 - Configuración del entorno
- Crear repositorio en GitHub.
- Configurar Docker Compose.
- Crear estructura inicial de backend y frontend.
- Definir variables de entorno.

### Fase 2 - Modelo de datos
- Diseñar el `schema.prisma`.
- Crear migraciones.
- Generar Prisma Client.
- Configurar PrismaModule en NestJS.

### Fase 3 - Backend
- Implementar módulos por entidad.
- Crear DTOs, repositories, services y controllers.
- Aplicar validaciones y reglas de negocio.
- Implementar filtros, pipes e interceptores globales.

### Fase 4 - Frontend
- Crear estructura base con Next.js.
- Implementar cliente HTTP centralizado.
- Crear vistas de listado, formularios y paneles.
- Integrar frontend con backend.

### Fase 5 - Integración y pruebas
- Probar flujos de ingreso y salida.
- Validar cálculo de tarifas.
- Validar abonados y ocupación.
- Ejecutar todo con `docker compose up`.

---

## Instalación y Ejecución

### Requisitos previos

Debes tener instalado:

- Git
- Node.js LTS
- Docker Desktop
- Docker Compose
- Visual Studio Code
- Postman o Thunder Client

### Clonar el repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]
```

### Configurar variables de entorno

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### Levantar los servicios

```bash
docker compose up --build
```

---

## Variables de Entorno

### Archivo `.env.example`

```env
DB_USER=admin
DB_PASSWORD=admin123
DB_NAME=proyecto_db
```

### Archivo `.env`

Este archivo debe crearse localmente a partir de `.env.example`.

> **Importante:** el archivo `.env` **no debe subirse al repositorio**.  
> Debe incluirse únicamente `.env.example` como plantilla.

---

## Servicios Esperados

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001
- **PostgreSQL:** localhost:5432

---

## Endpoints Base del Backend

### Tipos de Vehículo
- `GET /api/tipos-vehiculo`
- `POST /api/tipos-vehiculo`

### Tarifas
- `GET /api/tarifas`
- `POST /api/tarifas`
- `PATCH /api/tarifas/:id`

### Espacios
- `GET /api/espacios`
- `POST /api/espacios`
- `PATCH /api/espacios/:id`

### Vehículos
- `GET /api/vehiculos`
- `POST /api/vehiculos`

### Abonados
- `GET /api/abonados`
- `POST /api/abonados`

### Registro de Parqueo
- `POST /api/registros-parqueo/ingreso`
- `POST /api/registros-parqueo/salida`
- `GET /api/registros-parqueo`
- `GET /api/registros-parqueo/activos`
- `GET /api/registros-parqueo/ocupacion`

---

## Convenciones de Trabajo

### Ramas sugeridas

- `main`
- `develop`
- `feature/*`
- `fix/*`

### Convención de commits

- `feat:`
- `fix:`
- `docs:`
- `chore:`
- `refactor:`
- `test:`

### Reglas de colaboración

- Todo cambio importante debe pasar por Pull Request.
- Los commits deben ser descriptivos.
- No se debe subir el archivo `.env`.
- Cada historia de usuario debe poder relacionarse con commits y avances del proyecto.

---

## Entregables del Proyecto

- Repositorio GitHub con estructura organizada.
- README completo.
- Historias de usuario documentadas.
- Docker Compose funcional.
- Modelo de datos en Prisma con migraciones.
- API REST con arquitectura en capas.
- Frontend funcional consumiendo la API.
- Pruebas funcionales de los flujos principales.

---

## Estado del Proyecto

Proyecto académico en desarrollo.  
La implementación se realizará por fases: infraestructura, modelo de datos, backend, frontend e integración final.

---

## Licencia

Proyecto académico de uso formativo.
