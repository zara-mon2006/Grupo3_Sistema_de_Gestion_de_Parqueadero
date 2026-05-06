# Sistema de Gestión de Parqueadero — Grupo 3

## Historias de Usuario

---

### HU-01 — Registrar entrada de un vehículo

**Como** operario del parqueadero,
**quiero** registrar la entrada de un vehículo ingresando su tipo y placa,
**para** tener control de qué vehículos están dentro y desde qué hora llegaron.

**Criterios de aceptación:**
- El sistema permite seleccionar el tipo de vehículo (carro, moto, camioneta, bicicleta).
- El sistema registra automáticamente la hora de entrada.
- No se puede registrar una placa que ya esté dentro del parqueadero.

---

### HU-02 — Placa automática en mayúsculas

**Como** operario del parqueadero,
**quiero** que la placa se convierta automáticamente a mayúsculas mientras la escribo,
**para** evitar errores por escribir en minúscula o mayúscula de forma inconsistente.

**Criterios de aceptación:**
- Sin importar cómo escriba la placa, el sistema la muestra siempre en mayúsculas en tiempo real.
- La placa se guarda en mayúsculas en el sistema.

---

### HU-03 — Ver vehículos en el parqueadero

**Como** operario del parqueadero,
**quiero** ver la lista de todos los vehículos que están actualmente dentro,
**para** saber cuántos hay y de qué tipo son.

**Criterios de aceptación:**
- La lista muestra la placa, el tipo de vehículo y el tiempo que lleva dentro.
- El contador de tiempo se actualiza cada segundo en tiempo real.
- Se muestran contadores de total, carros y motos en la parte superior.

---

### HU-04 — Ver detalle de un vehículo

**Como** operario del parqueadero,
**quiero** seleccionar un vehículo de la lista para ver su información completa,
**para** conocer su hora de entrada, tiempo transcurrido y el valor estimado a cobrar.

**Criterios de aceptación:**
- Al hacer clic en un vehículo se muestra su placa, tipo, hora de entrada, fecha y tarifa por hora.
- El cobro estimado se actualiza en tiempo real según el tiempo transcurrido.

---

### HU-05 — Registrar salida y calcular cobro

**Como** operario del parqueadero,
**quiero** registrar la salida de un vehículo y que el sistema calcule automáticamente el valor a cobrar,
**para** saber exactamente cuánto debe pagar el cliente sin hacer cálculos manuales.

**Criterios de aceptación:**
- El sistema calcula el cobro por horas completas según el tipo de vehículo.
- Tarifas: Carro $2.000/hora, Moto $1.000/hora, Camioneta $3.000/hora, Bicicleta $500/hora.
- Al registrar la salida el vehículo desaparece de la lista.

---

### HU-06 — Ver comprobante de salida

**Como** operario del parqueadero,
**quiero** ver un comprobante al momento de registrar la salida de un vehículo,
**para** tener un resumen claro de la estadía y el valor cobrado.

**Criterios de aceptación:**
- El comprobante muestra: placa, tipo de vehículo, hora de entrada, hora de salida, fecha, tiempo total y total a cobrar.
- El total a cobrar se resalta visualmente en verde.
- Hay un botón para cerrar el comprobante y volver al panel principal.

---

## Tecnologías utilizadas

- **Frontend:** Next.js + React (Puerto 3000)
- **Backend:** NestJS (Puerto 3001)
- **Base de datos:** PostgreSQL + Prisma ORM