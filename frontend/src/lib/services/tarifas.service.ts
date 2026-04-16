import { api } from "@/lib/api";

export interface Tarifa {
  id: number;
  tipoVehiculoId: number;
  modalidad: "MINUTO" | "HORA" | "DIA";
  valor: string;
  fraccionMinutos: number;
  activa: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTarifaDto {
  tipoVehiculoId: number;
  modalidad: "MINUTO" | "HORA" | "DIA";
  valor: number;
  fraccionMinutos: number;
  activa: boolean;
}

export type UpdateTarifaDto = Partial<CreateTarifaDto>;

export const tarifasService = {
  findAll: () => api.get<Tarifa[]>("/tarifas"),
  findOne: (id: number) => api.get<Tarifa>(`/tarifas/${id}`),
  create: (data: CreateTarifaDto) => api.post<Tarifa>("/tarifas", data),
  update: (id: number, data: UpdateTarifaDto) =>
    api.patch<Tarifa>(`/tarifas/${id}`, data),
  remove: (id: number) => api.delete<void>(`/tarifas/${id}`),
};
