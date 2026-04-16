import { api } from "@/lib/api";

export interface Vehiculo {
  id: number;
  placa: string | null;
  identificadorInterno: string;
  tipoVehiculoId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVehiculoDto {
  placa?: string;
  identificadorInterno: string;
  tipoVehiculoId: number;
}

export type UpdateVehiculoDto = Partial<CreateVehiculoDto>;

export const vehiculosService = {
  findAll: () => api.get<Vehiculo[]>("/vehiculos"),
  findOne: (id: number) => api.get<Vehiculo>(`/vehiculos/${id}`),
  create: (data: CreateVehiculoDto) => api.post<Vehiculo>("/vehiculos", data),
  update: (id: number, data: UpdateVehiculoDto) =>
    api.patch<Vehiculo>(`/vehiculos/${id}`, data),
  remove: (id: number) => api.delete<void>(`/vehiculos/${id}`),
};