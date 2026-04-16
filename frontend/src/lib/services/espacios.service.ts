import { api } from "@/lib/api";

export interface Espacio {
  id: number;
  codigo: string;
  tipoVehiculoId: number;
  estado: "DISPONIBLE" | "OCUPADO" | "INACTIVO";
  createdAt: string;
  updatedAt: string;
}

export interface CreateEspacioDto {
  codigo: string;
  tipoVehiculoId: number;
  estado: "DISPONIBLE" | "OCUPADO" | "INACTIVO";
}

export type UpdateEspacioDto = Partial<CreateEspacioDto>;

export const espaciosService = {
  findAll: () => api.get<Espacio[]>("/espacios"),
  findOne: (id: number) => api.get<Espacio>(`/espacios/${id}`),
  create: (data: CreateEspacioDto) => api.post<Espacio>("/espacios", data),
  update: (id: number, data: UpdateEspacioDto) =>
    api.patch<Espacio>(`/espacios/${id}`, data),
  remove: (id: number) => api.delete<void>(`/espacios/${id}`),
};