import { vehiculosService } from "@/lib/services";

export default async function HomePage() {
  let totalVehiculos = 0;
  let error = "";

  try {
    const vehiculos = await vehiculosService.findAll();
    totalVehiculos = vehiculos.length;
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al conectar con la API";
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <span className="badge">Parqueadero · Panel base</span>
        <h1 className="title">Sistema de Gestión de Parqueadero</h1>
        <p className="subtitle">
          Base visual del frontend para administrar ingresos, salidas, espacios,
          vehículos, abonados y tarifas desde una interfaz más limpia y clara.
        </p>
      </section>

      <section className="grid grid-2">
        <article className="card">
          <h2>Estado del sistema</h2>
          <p>
            Esta pantalla confirma la conexión entre el frontend y el backend y
            sirve como punto de partida para las historias de usuario.
          </p>

          {error ? (
            <div className="status-error">Error de conexión: {error}</div>
          ) : (
            <div className="status-ok">
              Conexión OK con backend. Vehículos registrados: {totalVehiculos}
            </div>
          )}

          <div className="kpi">
            <div className="kpi-item">
              <div className="kpi-label">Vehículos</div>
              <div className="kpi-value">{totalVehiculos}</div>
            </div>

            <div className="kpi-item">
              <div className="kpi-label">Estado backend</div>
              <div className="kpi-value" style={{ fontSize: "1.2rem" }}>
                {error ? "Error" : "Activo"}
              </div>
            </div>

            <div className="kpi-item">
              <div className="kpi-label">Módulos base</div>
              <div className="kpi-value">6</div>
            </div>
          </div>

          <p className="footer-note">
            Siguiente objetivo: convertir esta base en pantallas de operación
            para ingreso, historial, salida y cálculo de cobro.
          </p>
        </article>

        <aside className="card">
          <h3>Acciones rápidas</h3>
          <p>
            Esto te deja una base visual que ya parece producto, no maqueta
            cruda.
          </p>

          <div className="quick-actions">
            <div className="action">
              <div>
                <strong>Registrar ingreso</strong>
                <span>HU-02</span>
              </div>
              <span className="action-tag">Siguiente</span>
            </div>

            <div className="action">
              <div>
                <strong>Consultar historial</strong>
                <span>HU-03</span>
              </div>
              <span className="action-tag">Backend listo</span>
            </div>

            <div className="action">
              <div>
                <strong>Registrar salida</strong>
                <span>HU-04</span>
              </div>
              <span className="action-tag">Probado</span>
            </div>

            <div className="action">
              <div>
                <strong>Calcular tarifa</strong>
                <span>HU-05</span>
              </div>
              <span className="action-tag">Enfoque</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="card" style={{ marginTop: "22px" }}>
        <h2>Módulos conectados</h2>
        <p>
          Estos módulos ya tienen servicios base listos para que tu compañero
          empiece a montar las vistas reales.
        </p>

        <ul className="modules">
          <li className="module-item">
            <div className="module-name">Tipos de vehículo</div>
            <div className="module-desc">
              Configuración de clases de vehículo y reglas como requerimiento de
              placa.
            </div>
          </li>

          <li className="module-item">
            <div className="module-name">Tarifas</div>
            <div className="module-desc">
              Tarifas activas por tipo, modalidad y fracción de cobro.
            </div>
          </li>

          <li className="module-item">
            <div className="module-name">Espacios</div>
            <div className="module-desc">
              Gestión del estado de ocupación y disponibilidad de parqueo.
            </div>
          </li>

          <li className="module-item">
            <div className="module-name">Vehículos</div>
            <div className="module-desc">
              Registro de placa, identificador interno y relación con su tipo.
            </div>
          </li>

          <li className="module-item">
            <div className="module-name">Abonados</div>
            <div className="module-desc">
              Asociación de vehículos a usuarios con vigencia y estado de
              suscripción.
            </div>
          </li>

          <li className="module-item">
            <div className="module-name">Registros de parqueadero</div>
            <div className="module-desc">
              Flujo de entrada, salida, cálculo de tiempo y total cobrado.
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
}
