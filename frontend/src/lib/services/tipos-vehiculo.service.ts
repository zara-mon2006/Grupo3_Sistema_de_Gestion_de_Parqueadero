import { api } from "@/lib/api";

export interface TipoVehiculo {
  id: number;
  nombre: string;
  requierePlaca: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTipoVehiculoDto {
  nombre: string;
  requierePlaca: boolean;
}

export type UpdateTipoVehiculoDto = Partial<CreateTipoVehiculoDto>;

export const tiposVehiculoService = {
  findAll: () => api.get<TipoVehiculo[]>("/tipos-vehiculo"),
  findOne: (id: number) => api.get<TipoVehiculo>(`/tipos-vehiculo/${id}`),
  create: (data: CreateTipoVehiculoDto) =>
    api.post<TipoVehiculo>("/tipos-vehiculo", data),
  update: (id: number, data: UpdateTipoVehiculoDto) =>
    api.patch<TipoVehiculo>(`/tipos-vehiculo/${id}`, data),
  remove: (id: number) => api.delete<void>(`/tipos-vehiculo/${id}`),
};