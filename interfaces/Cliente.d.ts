import { Credito } from "./Credito";

export interface ClienteInterface {
  /**
   *
   */
  id: number;
  /**
   * el id del cobro al que pertenece este cliente
   */
  idCobro: number;
  /**
   * El nombre del cliente
   */
  nombre: string;
  /**
   * Objeto de direcciones
   */
  direccion: Direccion[];
  /**
   * Fecha de ingreso
   */
  fIngreso: Date | string;
  /**
   * Tipo de Negocio, ej: Drogueria, Verduleria
   */
  tNegocio: string;
  /**
   * el Valor total de todos los prestamos que tiene con ese cobro
   */
  valor: number;
  /**
   * calificacion del rendimiento del cliente
   */
  calificacion: number;
  /**
   * url de las fotos
   */
  urlsFotos: string[];
  /**
   * ubicacion
   */
  ubicacion: Ubicacion;
  /**
   * los creditos del cliente
   */
  creditos: Credito[];
}
export interface Direccion {
  direccion: string;
  referencia: string;
  observacion: string;
  principal: boolean;
}
export interface Ubicacion {
  lat: number | string;
  lng: number | string;
}
