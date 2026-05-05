"use client";

import { useState, useEffect } from "react";

const RATES = { carro: 2000, moto: 1000, camioneta: 3000, bicicleta: 500 };
const LABEL = { carro: "Carro", moto: "Moto", camioneta: "Camioneta", bicicleta: "Bicicleta" };
const ICON = { carro: "🚗", moto: "🏍", camioneta: "🚙", bicicleta: "🚲" };

function duracion(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  return (h > 0 ? h + "h " : "") + (m % 60 > 0 || h > 0 ? (m % 60) + "m " : "") + (s % 60) + "s";
}

function tarifa(tipo, ms) {
  const horas = Math.ceil(Math.ceil(ms / 60000) / 60) || 1;
  return horas * RATES[tipo];
}

function cop(n) {
  return "$ " + n.toLocaleString("es-CO");
}

export default function Parqueadero() {
  const [lista, setLista] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("carro");
  const [recibo, setRecibo] = useState(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const vehiculo = lista.find((v) => v.id === seleccionado) || null;

  function entrar() {
    const p = placa.trim().toUpperCase();
    if (!p) return alert("Ingresa la placa.");
    if (lista.find((v) => v.plate === p)) return alert("Ya está registrado.");
    const v = { id: Date.now(), plate: p, tipo, hora: Date.now() };
    setLista((prev) => [v, ...prev]);
    setPlaca("");
    setSeleccionado(v.id);
    setRecibo(null);
  }

  function salir(v) {
    const ms = Date.now() - v.hora;
    setRecibo({ v, salida: Date.now(), total: tarifa(v.tipo, ms), ms });
    setLista((prev) => prev.filter((x) => x.id !== v.id));
    setSeleccionado(null);
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", fontSize: 14 }}>

      <div style={{ width: 280, borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", background: "#f9fafb" }}>

        <div style={{ padding: 16, borderBottom: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 12 }}>Nueva entrada</div>

          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>TIPO</div>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}
              style={{ width: "100%", padding: "7px 8px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, background: "white" }}>
              <option value="carro">🚗 Carro</option>
              <option value="moto">🏍 Moto</option>
              <option value="camioneta">🚙 Camioneta</option>
              <option value="bicicleta">🚲 Bicicleta</option>
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>PLACA</div>
            <input type="text" maxLength={7} placeholder="ABC123" value={placa}
              onChange={(e) => setPlaca(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""))}
              style={{ width: "100%", padding: "7px 8px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13 }} />
            <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 700, letterSpacing: 4, paddingTop: 6, color: "#111827" }}>
              {placa || "—"}
            </div>
          </div>

          <button onClick={entrar}
            style={{ width: "100%", padding: 9, background: "#2563eb", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Registrar entrada
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 10 }}>
            En parqueadero ({lista.length})
          </div>
          {lista.length === 0 && (
            <div style={{ color: "#9ca3af", fontSize: 12, textAlign: "center", paddingTop: 20 }}>Sin vehículos</div>
          )}
          {lista.map((v) => (
            <div key={v.id} onClick={() => { setSeleccionado(v.id); setRecibo(null); }}
              style={{ background: "white", border: "1px solid " + (seleccionado === v.id ? "#3b82f6" : "#e5e7eb"),
                borderRadius: 8, padding: "10px 12px", marginBottom: 8, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 14 }}>{v.plate}</span>
                <span style={{ fontSize: 11, background: "#f3f4f6", padding: "2px 6px", borderRadius: 20, color: "#6b7280" }}>
                  {ICON[v.tipo]} {LABEL[v.tipo]}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{duracion(Date.now() - v.hora)}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        <div style={{ padding: "14px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Parqueadero</div>
          <div style={{ display: "flex", gap: 8 }}>
            {[["Total", lista.length], ["Carros", lista.filter((v) => v.tipo === "carro").length], ["Motos", lista.filter((v) => v.tipo === "moto").length]].map(([l, n]) => (
              <div key={l} style={{ textAlign: "center", padding: "5px 14px", background: "#f3f4f6", borderRadius: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{n}</div>
                <div style={{ fontSize: 10, color: "#6b7280" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>

          {recibo ? (
            <div style={{ maxWidth: 360, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Comprobante de salida</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Vehículo retirado</div>
              {[
                ["Placa", recibo.v.plate],
                ["Tipo", ICON[recibo.v.tipo] + " " + LABEL[recibo.v.tipo]],
                ["Entrada", new Date(recibo.v.hora).toLocaleTimeString("es-CO")],
                ["Salida", new Date(recibo.salida).toLocaleTimeString("es-CO")],
                ["Fecha", new Date(recibo.salida).toLocaleDateString("es-CO")],
                ["Tiempo", duracion(recibo.ms)],
                ["Tarifa/hora", cop(RATES[recibo.v.tipo])],
              ].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #e5e7eb", fontSize: 13 }}>
                  <span style={{ color: "#6b7280" }}>{l}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", fontSize: 18, fontWeight: 700 }}>
                <span>Total</span>
                <span style={{ color: "#16a34a" }}>{cop(recibo.total)}</span>
              </div>
              <button onClick={() => setRecibo(null)}
                style={{ marginTop: 16, width: "100%", padding: 10, background: "#16a34a", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Listo ✓
              </button>
            </div>

          ) : vehiculo ? (
            <div style={{ maxWidth: 420, background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24 }}>
              <div style={{ fontFamily: "monospace", fontSize: 34, fontWeight: 700, letterSpacing: 4, marginBottom: 6 }}>{vehiculo.plate}</div>
              <div style={{ display: "inline-block", fontSize: 12, padding: "4px 12px", borderRadius: 20, background: "#eff6ff", color: "#2563eb", marginBottom: 20 }}>
                {ICON[vehiculo.tipo]} {LABEL[vehiculo.tipo]}
              </div>
              {[
                ["Hora de entrada", new Date(vehiculo.hora).toLocaleTimeString("es-CO")],
                ["Fecha", new Date(vehiculo.hora).toLocaleDateString("es-CO")],
                ["Tarifa por hora", cop(RATES[vehiculo.tipo])],
                ["Tiempo en parqueadero", duracion(Date.now() - vehiculo.hora)],
              ].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #e5e7eb", fontSize: 13 }}>
                  <span style={{ color: "#6b7280" }}>{l}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: 16, background: "#f0fdf4", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#16a34a", fontSize: 13 }}>Cobro estimado</span>
                <span style={{ color: "#16a34a", fontSize: 26, fontWeight: 700 }}>
                  {cop(tarifa(vehiculo.tipo, Date.now() - vehiculo.hora))}
                </span>
              </div>
              <button onClick={() => salir(vehiculo)}
                style={{ marginTop: 16, width: "100%", padding: 11, background: "#dc2626", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Registrar salida y cobrar
              </button>
            </div>

          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#9ca3af" }}>
              <div style={{ fontSize: 50, marginBottom: 12 }}>🅿️</div>
              <div style={{ fontSize: 15 }}>Selecciona un vehículo de la lista</div>
              <div style={{ fontSize: 12, marginTop: 6 }}>o registra una nueva entrada</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}