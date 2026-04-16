import { api } from "@/lib/api";

export interface Abonado {
  id: number;
  nombre: string;
  documento: string;
  telefono: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  vehiculoId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAbonadoDto {
  nombre: string;
  documento: string;
  telefono: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  vehiculoId: number;
}

export type UpdateAbonadoDto = Partial<CreateAbonadoDto>;

export const abonadosService = {
  findAll: () => api.get<Abonado[]>("/abonados"),
  findOne: (id: number) => api.get<Abonado>(`/abonados/${id}`),
  create: (data: CreateAbonadoDto) => api.post<Abonado>("/abonados", data),
  update: (id: number, data: UpdateAbonadoDto) =>
    api.patch<Abonado>(`/abonados/${id}`, data),
  remove: (id: number) => api.delete<void>(`/abonados/${id}`),
};