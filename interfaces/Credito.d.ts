export interface Credito {
  id: number;
  /**
   * Es el id al cual pertenece el credito
   */
  idCliente: number;
  /**
   * el numero del credito
   */
  creditoNum: number;
  /**
   * el id del cobro al que pertenece   *
   */

  idCobro: number;
  /*
   *Fecha inicio credito */
  fInicio: Date | string;
  /**
   * De cuanto es el credito que solicito
   */
  monto: number;

  /**
   * El valor de la cuota
   */
  valorCuota: number;

  /**
   * Lo que ha pagado del credito
   */

  pagado: number;
  /**
   * Lo que le falta por pagar
   */
  deuda: number;
  /**
   * los dias que se ha retrasado en el credito
   */
  atraso: number;
  /**
   * El numero de cuotas del credito
   */
  numCuotas: number;
  /**
   * Aca se recibe una lista de la fecha o el monto de cola
   * en la cual se debe proporcionar la fecha cuando se completo la cuota
   * o la cola pendiente
   * @example 2022-06-28 fecha
   * @example 450 cola o sobrante de la cuota
   */
  listaCuotas: string[];
  /**
   * un objeto[] de tipo historialCredito
   */
  historial: HistorialCredito[];
}

export interface HistorialCredito {
  id: number;
  idCredito: number;
  motivo: string;
  fecha: Date | string;
  observacion: string;
}
