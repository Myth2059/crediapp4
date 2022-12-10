import { faker } from "@faker-js/faker";
import _ from "lodash";
import moment from "moment";
import { ClienteInterface, Direccion } from "../interfaces/Cliente";
import { Credito, HistorialCredito, ListaDiariaPagos } from "../interfaces/Credito";

/**
 * Este archivo se usa para simular solicitudes a un "servidor"
 */
export function DatosApiCliente(cli: string): ClienteInterface {

     var cliente: ClienteInterface = {
          id: _.random(100000, 999999),
          idCobro: _.random(100000, 999999),
          nombre: faker.name.firstName() + " " + faker.name.lastName(),
          direccion: [..._.times<Direccion>(_.random(1, 4), () => {
               var data: Direccion = {
                    key: _.random(0, 444) + "dir",
                    id: _.random(154, 99999),
                    direccion: faker.address.secondaryAddress(),
                    referencia: faker.random.word(),
                    observacion: faker.lorem.lines(3),
                    principal: Boolean(_.random(0, 1))
               }
               return data;
          })],
          fIngreso: faker.date.between("2022-10-01", "2022-12-31").toISOString(),
          tNegocio: faker.commerce.department(),
          valor: _.random(40000, 300000),
          calificacion: _.random(0, 10),
          creditos: [..._.times<Credito>(_.random(1, 5), () => {
               var data: Credito = {
                    id: _.random(999999),
                    idCliente: _.random(999999),
                    idCobro: _.random(999999),
                    creditoNum: _.random(1, 10),
                    fInicio: faker.date.between("2022-10-01", "2022-12-31").toISOString(),
                    monto: _.random(20000, 160000),
                    pagado: _.random(160000),
                    deuda: _.random(160000),
                    numCuotas: _.random(20, 60),
                    valorCuota: _.random(300, 2000),
                    atraso: _.random(5),
                    historial: [..._.times<HistorialCredito>(_.random(5), () => {
                         var data: HistorialCredito = {
                              key: _.random(9999) + "lista",
                              id: _.random(9999),
                              idCredito: _.random(999999),
                              fecha: faker.date.between("2022-10-01", "2022-12-31").toISOString(),
                              motivo: faker.random.word(),
                              observacion: faker.lorem.paragraphs(1)
                         }
                         return data;
                    }
                    )],
                    listaCuotas: [..._.times<string>(_.random(26), () => {
                         var fecha: string = moment(faker.date.between("2022-10-01", "2022-12-31")).format("YYYY-MM-DD");
                         return fecha;
                    }), _.random(100, 3000).toString()],
                    listaDiariaPagos: [..._.times(26, () => {
                         var data: ListaDiariaPagos = {
                              id: _.random(1, 99),
                              fecha: faker.date.between("2022-11-01", "2022-11-31").toISOString(),
                              valor: _.random(300, 2500)
                         }
                         return data;
                    })]
               }
               return data;
          })],
          ubicacion: { lat: faker.address.latitude(), lng: faker.address.longitude() },
          urlsFotos: [..._.times(_.random(1, 3), () => faker.image.animals(640, 640, true))]







     }
     console.log(cliente);
     return cliente;
};




