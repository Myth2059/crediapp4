import {
     Input,
     InputNumber,
     Modal,
     Popover,
     Select,
     Table,
     TabPaneProps,
     Tabs,
} from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { BsPlusLg } from "react-icons/bs";

import CustomCard from "../../components/app/CustomFormCard/CustomCard";
import DefaultLayout from "../../components/app/layout/DefaultLayout";
import { Tab } from "../../node_modules/rc-tabs/lib/interface";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import CustomTable from "../../components/app/CustomTable/CustomTable";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";

export default function Cobro() {
     const [modalOpen, setModalOpen] = useState<boolean>(false);
     const [modalData, setModalData] = useState(<></>);
     const popoverContent = (
          <div className="w-[200px]">
               La cantidad de dias que se necesita para generar una multa. (Una multa es
               el valor de una cuota).
          </div>
     );
     const [width, setWidth] = useState<number>(0);
     useEffect(() => {
          setWidth(window.innerWidth);
     }, []);

     var datosClientes: ListaCliente[] = [];
     var datosCreditos: ListaCreditos[] = [];
     var datosObservaciones: Observaciones[] = [];

     /**Datos ficticios */
     for (let index = 4555; index < 4560; index++) {
          datosClientes.push({
               key: index,
               nombre: "Michael Gonzalez",
               creditos: _.random(50),
               valor: _.random(400000, 700000),
               calificacion: _.random(0, 10),
          });
     }
     /**Datos ficticios */
     for (let index = 0; index < 36; index++) {
          datosCreditos.push({
               num: _.random(20),
               key: "Cli" + index,
               cliente: "Jimena Rica",
               cuota: _.random(0, 25),
               nCuotas: _.random(26, 30),
               diasMora: _.random(0, 6),
               inicio: faker.date.between(
                    "2022-10-01T00:00:00Z",
                    "2022-10-31T00:00:00Z"
               ),
               valor: _.random(5000, 60000),
          });
     }

     /**Datos ficticios */

     for (let index = 0; index < 10; index++) {
          datosObservaciones.push({
               key: "obs" + index,
               motivo: _.random(1) == 0 ? "Observación" : "Adicional",
               fecha: new Date("2022-06-06"),
               observacion: faker.lorem.paragraphs(),
          });
     }
     const columnsClientes: ColumnsType<ListaCliente> = [
          {
               title: "Nombre",
               dataIndex: "nombre",
               sorter: (a, b) => {
                    var dato1 = a.nombre.toLowerCase();
                    var dato2 = b.nombre.toLowerCase();

                    if (dato1 < dato2) {
                         return -1;
                    }
                    if (dato1 > dato2) {
                         return 1;
                    }
                    return 0;
               },
               render: (nombre, k) => (
                    <Link href={"/clientes/" + k.key}>
                         <a>{nombre}</a>
                    </Link>
               ),
               align: "center",
          },
          {
               title: "Cdtos",
               dataIndex: "creditos",
               sorter: (a, b) => a.creditos - b.creditos,
               align: "center",
          },
          {
               title: "Valor",
               dataIndex: "valor",
               sorter: (a, b) => a.valor - b.valor,
               render: (x: number) => "$" + x.toLocaleString("es-CO"),
               align: "center",
          },
          {
               title: "Score",
               dataIndex: "calificacion",
               sorter: (a, b) => a.calificacion - b.calificacion,
               align: "center",
               render: (x) => x + "/10",
          },
     ];
     const columnsCreditos: ColumnsType<ListaCreditos> = [
          {
               title: "#",
               dataIndex: "num",
               align: "center",
               responsive: ["md"],
          },
          {
               title: "Cliente",
               dataIndex: "cliente",
               sorter: (a, b) => {
                    var dato1 = a.cliente.toLowerCase();
                    var dato2 = b.cliente.toLowerCase();
                    if (dato1 < dato2) {
                         return -1;
                    }
                    if (dato1 > dato2) {
                         return 1;
                    }
                    return 0;
               },
               align: "center",
               render: (cliente, k) => (
                    <Link href={"/clientes/" + k.key}>
                         <a>{cliente}</a>
                    </Link>
               ),
          },
          {
               title: "F.Inicio",
               dataIndex: "inicio",
               sorter: (a, b) => a.inicio.getTime() - b.inicio.getTime(),
               render: (x) => moment(x).format("DD/MM/YY"),
               align: "center",
          },
          {
               title: "Valor",
               dataIndex: "valor",
               sorter: (a, b) => a.valor - b.valor,
               render: (x: number) => "$" + x.toLocaleString("es-CO"),
               align: "center",
          },
          {
               title: "Cuota",
               dataIndex: "cuota",
               sorter: (a, b) => a.cuota - b.cuota,
               render: (a, x) => a + "/" + x.nCuotas,
               align: "center",
          },
          {
               title: "DM",
               dataIndex: "diasMora",
               sorter: (a, b) => a.diasMora - b.diasMora,
               align: "center",
          },
     ];
     const columnsObservaciones: ColumnsType<Observaciones> = [
          {
               title: "Motivo",
               dataIndex: "motivo",
               sorter: (a, b) => {
                    var data1 = a.motivo.toLowerCase();
                    var data2 = b.motivo.toLowerCase();

                    if (data1 < data2) {
                         return -1;
                    }
                    if (data1 > data2) {
                         return 1;
                    }

                    return 0;
               },
               align: width > 720 ? "center" : "left",
               width: width > 720 ? 100 : 80,
          },
          {
               title: "Fecha",
               dataIndex: "fecha",
               sorter: (a, b) => a.fecha.getTime() - b.fecha.getTime(),
               align: width > 720 ? "center" : "left",
               width: width > 720 ? 100 : 80,
               render: (x) => moment(x).format("DD/MM/YYYY"),
          },
          {
               title: "Observación",
               dataIndex: "observacion",
          },
     ];

     const clientes: Tab[] = [
          {
               key: "cli1",
               label: "Activos",
               children: (
                    <CustomTable
                         checkbox={true}
                         columns={columnsClientes}
                         dataSource={datosClientes}
                         tabla="Cliente"
                    />
               ),
          },
          {
               key: "cli2",
               label: "Inactivos",
               children: (
                    <CustomTable
                         checkbox={true}
                         columns={columnsClientes}
                         dataSource={datosClientes}
                         tabla="Cliente"
                    />
               ),
          },
     ];

     const creditos: Tab[] = [
          {
               key: "cre1",
               label: "Activos",
               children: (
                    <CustomTable
                         checkbox={true}
                         columns={columnsCreditos}
                         dataSource={datosCreditos}
                         tabla="Credito"
                    />
               ),
          },
          {
               key: "cre2",
               label: "Morosos",
               children: (
                    <CustomTable
                         checkbox={true}
                         columns={columnsCreditos}
                         dataSource={datosCreditos}
                         tabla="Credito"
                    />
               ),
          },
     ];

     const { Option } = Select;

     const handleModalOpen = (e: 1 | 2 | 3 | 4 | 5) => {
          if (e == 1) {
               setModalData(
                    <div className="flex flex-col mb-2">
                         <span className="text-base font-normal mb-4">
                              {" "}
                              Seleccione el nuevo Cobrador
                         </span>
                         <Select>
                              <Option value="jack">Jack</Option>
                              <Option value="lucy">Lucy</Option>
                         </Select>
                    </div>
               );
          }
          if (e == 2) {
               setModalData(
                    <div className="flex flex-col items-center mb-2">
                         <span className="mb-2  ">Ingrese el nuevo interes</span>
                         <div>
                              {" "}
                              <InputNumber
                                   type="number"
                                   max={100}
                                   controls={false}
                                   className="!w-12"
                              />{" "}
                              <span className="text-lg text-emerald-green">%</span>{" "}
                         </div>
                    </div>
               );
          }
          if (e == 3) {
               setModalData(

                    <div className="flex flex-col items-center mb-2">
                         <span className="mb-2  ">Ingrese el nuevo numero de cuotas</span>
                         <div>
                              {" "}
                              <InputNumber
                                   type="number"
                                   max={100}
                                   controls={false}
                                   className="!w-12"
                              />{" "}
                         </div>
                    </div>

               );
          }
          if (e == 4) {
               setModalData(

                    <div className="flex flex-col items-center mb-2">
                         <span className="mb-2  ">Ingrese los nuevos dias de mora</span>
                         <div>
                              {" "}
                              <InputNumber
                                   type="number"
                                   max={100}
                                   controls={false}
                                   className="!w-12"
                              />{" "}
                         </div>
                    </div>

               );
          }
          if (e == 5) {
               setModalData(
                    <div className="flex flex-col w-[300px] gap-2 mb-2">
                         <span className="text-lg font-semibold">Observaciónes</span>
                         <hr />
                         <div className="flex justify-end items-center gap-2">Motivo: <Select style={{ width: "120px" }} options={[{ value: "Observacion", label: "Observación" }, { value: "Adicional", label: "Adicional" }]} /></div>

                         <TextArea placeholder="Ingrese la observación" />
                    </div>
               )
          }
          console.log(modalData);
          setModalOpen(true);
     };

     const handleModalClose = () => {
          setModalOpen(false);
     };

     return (
          <DefaultLayout>
               <div className="flex justify-center p-4">
                    <div className="w-[900px] flex flex-col gap-4">
                         <div>
                              <CustomCard className="p-4 flex-col">
                                   <span className="font-semibold text-lg">
                                        Información del Cobro
                                   </span>
                                   <hr className="my-2" />
                                   <div className="flex gap-2 justify-evenly flex-wrap sm:justify-between  sm:[&>div]:w-[90px]  [&>div]:w-[160px] [&>div]:items-center [&>div]:flex [&>div]:flex-col [&>div>span:first-child]:text-arena [&>div>span:first-child]:font-semibold [&>div>span:first-child]:flex [&>div>span:first-child]:items-center">
                                        <div>
                                             <span className="pl-4">
                                                  Cobrador{" "}
                                                  <a className="ml-1" onClick={() => handleModalOpen(1)}>
                                                       <AiOutlineEdit />
                                                  </a>
                                             </span>
                                             <span>Michael</span>
                                        </div>
                                        <div>
                                             <span>F.Inicio</span>
                                             <span>06/06/06</span>
                                        </div>

                                        <div>
                                             <span>Clientes</span>
                                             <span>45</span>
                                        </div>
                                        <div>
                                             <span>Creditos</span>
                                             <span>65</span>
                                        </div>
                                        <div>
                                             <span className="pl-4">
                                                  Interes{" "}
                                                  <a className="ml-1" onClick={() => handleModalOpen(2)}>
                                                       <AiOutlineEdit />
                                                  </a>
                                             </span>
                                             <span>26%</span>
                                        </div>
                                        <div>
                                             <span className="pl-4">
                                                  Cuotas{" "}
                                                  <a className="ml-1" onClick={() => handleModalOpen(3)}>
                                                       <AiOutlineEdit />
                                                  </a>
                                             </span>
                                             <span>26</span>
                                        </div>
                                        {true ? (
                                             <div>
                                                  <span className="pl-4">
                                                       <Popover
                                                            className="select-none cursor-help"
                                                            content={popoverContent}
                                                       >
                                                            D.Mora
                                                       </Popover>{" "}
                                                       <a
                                                            className="ml-1 select-none"
                                                            onClick={() => handleModalOpen(4)}
                                                       >
                                                            <AiOutlineEdit />
                                                       </a>
                                                  </span>
                                                  <span>3</span>
                                             </div>
                                        ) : (
                                             ""
                                        )}
                                        <div>
                                             <span>Capital</span>
                                             <span>$45000</span>
                                        </div>
                                        <div>
                                             <span>Intereses</span>
                                             <span>$350.000</span>
                                        </div>
                                        <div>
                                             <span>Caja</span>
                                             <span>150.000</span>
                                        </div>
                                        <div className="justify-self-start">
                                             <span>Total</span>
                                             <span>$45000</span>
                                        </div>
                                        {width < 900 ? (
                                             <div></div>
                                        ) : (
                                             <>
                                                  <div></div>
                                                  <div></div>
                                                  <div></div>
                                                  <div></div>
                                             </>
                                        )}

                                        <Modal
                                             className="!w-fit [&_.ant-modal-body]:!pb-0 [&_.ant-modal-body]:!px-4 [&_.ant-modal-body]:!pt-2 [&_.ant-modal-close-x]:w-[28px] [&_.ant-modal-close-x]:h-[34px] [&_.ant-modal-close-x]:leading-[24px]"
                                             open={modalOpen}
                                             onCancel={handleModalClose}
                                             destroyOnClose={true}
                                        >
                                             {modalData}
                                        </Modal>
                                   </div>
                              </CustomCard>
                         </div>
                         <div className="sm:flex-col  flex gap-4 [&_.titulo]:font-semibold [&_.titulo]:text-lg [&_.ant-table-content]:max-h-full [&_.ant-tabs]:h-full [&_.ant-table-wrapper]:h-[455px]">
                              <CustomCard className="flex-col  p-4">
                                   <div className="titulo">Lista Creditos</div>
                                   <hr className="mt-2" />
                                   <div className=" h-[530px] :w-full">
                                        <Tabs items={creditos} />
                                   </div>
                              </CustomCard>
                              <CustomCard className="flex-col  p-4">
                                   <div className="titulo">Lista Clientes</div>
                                   <hr className="mt-2" />
                                   <div className="h-[530px] w-full">
                                        <Tabs items={clientes} />
                                   </div>
                              </CustomCard>
                         </div>
                         <div className="w-full">
                              <CustomCard className="p-4 flex-col h-[400px] [&_.ant-table-wrapper]:h-[310px] sm:[&_td]:text-xs">
                                   <div className="flex justify-between">
                                        <span className="text-lg font-semibold">Observaciónes</span>
                                        <button onClick={() => handleModalOpen(5)}><BsPlusLg color="#24695c" size={18} /></button>
                                   </div>
                                   <hr className="mt-3 mb-3" />
                                   <CustomTable
                                        columns={columnsObservaciones}
                                        dataSource={datosObservaciones}
                                   />
                              </CustomCard>
                         </div>
                    </div>
               </div>
          </DefaultLayout>
     );
}
interface ListaCliente {
     key: React.Key;
     nombre: string;
     creditos: number;
     valor: number;
     calificacion: number;
}
interface ListaCreditos {
     key: React.Key;
     num: number;
     cliente: string;
     inicio: Date;
     valor: number;
     cuota: number;
     nCuotas: number;
     diasMora: number;
}
interface Observaciones {
     key: React.Key;
     motivo: string;
     fecha: Date;
     observacion: string;
}
