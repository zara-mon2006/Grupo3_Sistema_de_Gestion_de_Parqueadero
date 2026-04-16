import { api } from "@/lib/api";

export interface RegistroParqueadero {
  id: number;
  vehiculoId: number;
  espacioId: number;
  tarifaId: number | null;
  horaEntrada: string;
  horaSalida: string | null;
  minutos: number | null;
  totalCobrado: string | null;
  esAbonado: boolean;
  estado: "ABIERTO" | "CERRADO";
  createdAt: string;
  updatedAt: string;
}

export interface CreateRegistroDto {
  vehiculoId: number;
  espacioId: number;
}

export interface UpdateRegistroDto {
  horaSalida: string;
}

export const registrosParqueaderoService = {
  findAll: () => api.get<RegistroParqueadero[]>("/registros-parqueadero"),
  findOne: (id: number) =>
    api.get<RegistroParqueadero>(`/registros-parqueadero/${id}`),
  create: (data: CreateRegistroDto) =>
    api.post<RegistroParqueadero>("/registros-parqueadero", data),
  update: (id: number, data: UpdateRegistroDto) =>
    api.patch<RegistroParqueadero>(`/registros-parqueadero/${id}`, data),
  remove: (id: number) =>
    api.delete<void>(`/registros-parqueadero/${id}`),
};