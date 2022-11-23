// import TextArea from "antd/lib/input/TextArea";
// import { ColumnsType } from "antd/lib/table";
// import React, { useEffect, useMemo, useRef, useState } from "react"
// import CustomCard from "../../components/app/CustomFormCard/CustomCard";
// import CustomTable from "../../components/app/CustomTable/CustomTable"

// const columnsDirecciones: ColumnsType<Direcciones> = [
//      {
//           title: "Dirección",
//           dataIndex: "Direccion",

//      },
//      {
//           title: "Referencia",
//           dataIndex: "Referencia",

//      }
// ]
// const pruebaDirecciones: Direcciones[] = [{ Direccion: "Soacha", Referencia: "Casa Jimena", Observacion: " jimena" }, { Direccion: "casa leo 123", Referencia: "Casa Hermano", Observacion: "Es donde todos van a comer, la casa es azul con bordo" }, { Direccion: "Juan Larran 240", Referencia: "Casa Abuela", Observacion: "El Perri" }, { Direccion: "Soacha", Referencia: "Casa Jimena", Observacion: "La rica de jimena" }, { Direccion: "casa leo 123", Referencia: "Casa Hermano", Observacion: "Es donde todos van a comer, la casa es azul con bordo" }, { Direccion: "Juan Larran 240", Referencia: "Casa Abuela", Observacion: "El Perri" }];

// const Tabla = React.memo((d: prueba) => { return <CustomTable columns={d.x} dataSource={d.y} scroll={"150px"} columnIndex={(x) => { d.z(x as number) }} /> })
// export default function Prueba() {
//      const [asd, setAsd] = useState<number>(0);
//      const [asd2, setAsd2] = useState<string>("");
//      const Ref = useRef<Direcciones[]>([...pruebaDirecciones]);
//      const Ref2 = useRef("");
//      useEffect(() => {
//           console.log(asd + "asd");
//           Ref2.current = Ref.current[asd].Observacion;
//           setAsd2(Ref.current[asd].Observacion);
//      }, [asd])
//      console.log("me renderizo desde prueba")
//      return <>

//           <Tabla x={columnsDirecciones} y={Ref.current} z={(x) => setAsd(x)} />
//           {/* <CustomCard> */}

//           <div>
//                {/* <CustomTable columns={columnsDirecciones} dataSource={Ref.current} columnIndex={(x) => setAsd(x as number)} scroll={100} /> */}

//                <TextArea value={asd2} />
//           </div>
//           <input defaultValue={asd2} />
//           <textarea defaultValue={asd2} />
//           {/* </CustomCard> */}
//      </>
// }
// interface prueba {
//      x: ColumnsType<any>;
//      y: Direcciones[];
//      z: (q: number) => void;
// }
// interface Direcciones {
//      Direccion: string;
//      Referencia: string;
//      Observacion: string;
//      /**
//       * Verdadero si es la direccion principal del cliente
//       */
//      Principal?: boolean;
// }

import { Button, Collapse, Image, Input, Modal, Table } from "antd";
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import CuadriculaCuotas from "../../components/app/Cuadricula/CuadriculaCuotas";
import CustomCard from "../../components/app/CustomFormCard/CustomCard";
import CustomTable from "../../components/app/CustomTable/CustomTable";
import DefaultLayout from "../../components/app/layout/DefaultLayout";
import type { ColumnsType } from "antd/es/table";
import _ from "lodash";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { RiDeleteBin2Line } from "react-icons/ri";
import dynamic from "next/dynamic";
import React from "react";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import { MdGpsFixed } from "react-icons/md";
import { IoReloadSharp } from "react-icons/io5";
import TextArea from "antd/lib/input/TextArea";

//Variables Externas//

const { Panel } = Collapse;

/**
 * Esta variable es la que almacen la configuracion
 * de las columnas
 */
const columnsHistorial: ColumnsType<Historial> = [
     {
          title: "Motivo",
          dataIndex: "Motivo",
          sorter: (a, b) => {
               var dato1 = a.Motivo.toLowerCase();
               var dato2 = b.Motivo.toLowerCase();
               if (dato1 < dato2) {
                    return -1;
               }
               if (dato1 > dato2) {
                    return 1;
               }
               return 0;
          },
          align: "center",
          width: 90,
     },
     {
          title: "Fecha",
          dataIndex: "Fecha",
          sorter: (a, b) => a.Fecha.getTime() - b.Fecha.getTime(),
          align: "center",
          width: 85,
          render: (z) => <span>{moment(z).format("DD/MM/YY")}</span>,
     },
     {
          title: "Observación",
          dataIndex: "Observacion",
          width: "100%",
          render: (x) => <span>{x}</span>,
     },
];

const columnsDirecciones: ColumnsType<Direcciones> = [
     {
          title: "Dirección",
          dataIndex: "Direccion",
     },
     {
          title: "Referencia",
          dataIndex: "Referencia",
     },
];

const pruebaDirecciones: Direcciones[] = [
     { Direccion: "Soacha", Referencia: "Casa Jimena", Observacion: " jimena" },
     {
          Direccion: "casa leo 123",
          Referencia: "Casa Hermano",
          Observacion: "Es donde todos van a comer, la casa es azul con bordo",
     },
     {
          Direccion: "Juan Larran 240",
          Referencia: "Casa Abuela",
          Observacion: "El Perri",
     },
     {
          Direccion: "Soacha",
          Referencia: "Casa Jimena",
          Observacion: "La rica de jimena",
     },
     {
          Direccion: "casa leo 123",
          Referencia: "Casa Hermano",
          Observacion: "Es donde todos van a comer, la casa es azul con bordo",
     },
     {
          Direccion: "Juan Larran 240",
          Referencia: "Casa Abuela",
          Observacion: "El Perri",
     },
];
//Fin Variables Externas//

export default function Pruebas() {
     //UseStates & useEffect//
     const [width, setWidth] = useState<number>(400);
     const [ready, setReady] = useState<boolean>(false);
     const [imageId, setImageId] = useState<number>(0);
     const [visible, setVisible] = useState<boolean>(false);
     const [botonAgregado, setBotonAgregado] = useState<boolean>(false);
     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
     const [modalSelection, setModalSelection] = useState<
          "nombre" | "direccion" | "negocio" | undefined
     >(undefined);
     const [rowIndex, setRowIndex] = useState<number | undefined>(undefined);
     // const rowIndex = useRef(0);
     const Ref = useRef<Direcciones[]>([...pruebaDirecciones]);
     const [loading, SetLoading] = useState<boolean>(false);
     const [direcciones, setDirecciones] = useState<Direcciones[]>([
          ...pruebaDirecciones,
     ]);
     const router = useRouter();
     const [isModalOpen2, setModalOpen2] = useState<boolean>(false);

     //-----
     useEffect(() => {
          setReady(true);
          setWidth(window.innerWidth);

          for (let index = 0; index < 4; index++) {
               historial.push({
                    Motivo: _.random(1) == 1 ? "Pago" : "Transferencia",
                    Fecha: faker.date.between("2022-10-31", "2022-11-06"),
                    Observacion: faker.lorem.sentence(),
               });
          }
     }, []);

     const Dirrr = (
          <>
               {" "}
               <CustomTable
                    columns={columnsDirecciones}
                    dataSource={Ref.current}
                    scroll={"150px"}
                    columnIndex={(x) => {
                         setRowIndex(x);
                    }}
               />
               {/* <Tabla /> */}
               <hr className="my-2" />
               <span className="font-medium">Observaciónes</span>
               <TextArea
                    readOnly
                    value={rowIndex != undefined ? direcciones[rowIndex].Observacion : ""}
                    className="!h-[150px]"
               />
          </>
     );

     // useEffect(() => {
     //      console.log("Actualizado Index")
     // }, [rowIndex.current])
     //Fin UseStates//

     //Variables//
     var historial: Historial[] = [];

     const position = { lat: -24.893795, lng: -65.4867887 };

     var botonEliminar: HTMLElement;

     interface containerProps {
          cuadro: Element;
     }
     const Tabla = React.memo(() => {
          return (
               <CustomTable
                    columns={columnsDirecciones}
                    dataSource={Ref.current}
                    scroll={"150px"}
                    columnIndex={(x) => {
                         setRowIndex(x);
                    }}
               />
          );
     });

     const modalCliente = (
          <div className="h-fit w-[220px] flex flex-col">
               <span>Actualizar Nombre</span>
               <hr className="my-2" />

               <Input
                    disabled={loading}
                    className="text-center"
                    defaultValue={"Michael Gonzalez"}
               />
               <hr className="my-2" />
               <div className="flex justify-between">
                    <Button disabled={loading}>Cancelar</Button>
                    <Button
                         type="primary"
                         loading={loading}
                         onClick={() => SetLoading(!loading)}
                         className="  !flex justify-center items-center text-gray-50"
                    >
                         Actualizar
                    </Button>
               </div>
          </div>
     );

     const modalDireccion = (
          <div className="h-fit w-[330px] flex flex-col pb-2">
               <span className="font-medium">Direcciones Registradas</span>
               <hr className="my-2" />
               <CustomTable
                    columns={columnsDirecciones}
                    dataSource={Ref.current}
                    scroll={"150px"}
                    columnIndex={(x) => {
                         setRowIndex(x);
                    }}
               />
               {/* <Tabla /> */}
               <hr className="my-2" />
               <span className="font-medium">Observaciónes</span>
               <TextArea
                    readOnly
                    defaultValue={
                         rowIndex != undefined ? direcciones[rowIndex].Observacion : ""
                    }
                    className="!h-[150px]"
               />
          </div>
     );

     //Fin Variables//

     //Funciones//

     //--------

     //--------
     const handlepruebainsert = (x: number) => {
          setImageId(x);
          if (!botonAgregado) {
               setBotonAgregado(true);
               setTimeout(() => {
                    setVisible(true);
               }, 150);
          }
     };

     // const setRowIndex = (val: number) => { rowIndex.current = val; console.log(val) };

     const Prueba23 = (Container: containerProps) => {
          return ReactDOM.createPortal(
               <li onClick={() => console.log(imageId)} className="-mb-[5px]">
                    <RiDeleteBin2Line size={18} />
               </li>,
               Container.cuadro
          );
     };
     const Map = React.useMemo(
          () =>
               dynamic(() => import("../../components/Map/customMap"), {
                    loading: () => <span>Cargando...</span>,
                    ssr: false,
               }),
          []
     );

     function InnerModal(props: ModalInterface) {
          if (props.Tipo == "nombre") {
               return (
                    <div className="h-fit w-[220px] flex flex-col">
                         <span>Actualizar Nombre</span>
                         <hr className="my-2" />

                         <Input
                              disabled={loading}
                              className="text-center"
                              defaultValue={"Michael Gonzalez"}
                         />
                         <hr className="my-2" />
                         <div className="flex justify-between">
                              <Button disabled={loading}>Cancelar</Button>
                              <Button
                                   type="primary"
                                   loading={loading}
                                   onClick={() => SetLoading(!loading)}
                                   className="  !flex justify-center items-center text-gray-50"
                              >
                                   Actualizar
                              </Button>
                         </div>
                    </div>
               );
          }

          if (props.Tipo == "direccion") {
               return (
                    <div className="h-fit w-[330px] flex flex-col pb-2">
                         <span className="font-medium">Direcciones Registradas</span>
                         <hr className="my-2" />
                         <CustomTable
                              columns={columnsDirecciones}
                              dataSource={Ref.current}
                              scroll={"150px"}
                              columnIndex={(x) => {
                                   setRowIndex(x);
                              }}
                         />
                         {/* <Tabla /> */}
                         <hr className="my-2" />
                         <span className="font-medium">Observaciónes</span>
                         <TextArea
                              readOnly
                              defaultValue={
                                   rowIndex != undefined ? direcciones[rowIndex].Observacion : ""
                              }
                              className="!h-[150px]"
                         />
                    </div>
               );
          }
          if (props.Tipo == "negocio") {
          }

          return <div></div>;
     }

     const HandleModal = (props: ModalInterface) => {
          setModalSelection(props.Tipo);
          setIsModalOpen(!isModalOpen);
     };
     const HandleModalClose = () => {
          setIsModalOpen(!isModalOpen);
          SetLoading(false);
     };

     //Fin Funciones//

     return (
          <DefaultLayout>
               <div className="w-full flex justify-center p-4 [&_img]:inline-block">
                    <div className="w-[900px] flex flex-col gap-4">
                         <CustomCard className="p-4 flex-col gap-2">
                              <span className="text-lg font-medium">Información del Cliente</span>
                              <hr />
                              <div className="flex  gap-2 justify-around flex-wrap sm:justify-between  sm:[&>div]:min-w-[90px]  [&>div]:min-w-[100px] [&>div]:items-center [&>div]:flex [&>div]:flex-col [&>div>span:first-child]:text-arena [&>div>span:first-child]:font-semibold [&>div>span:first-child]:flex [&>div>span:first-child]:items-center sm:text-[14px]">
                                   <div className="!sm:min-w-[90px]">
                                        <span
                                             onClick={() => HandleModal({ Tipo: "nombre" })}
                                             className="underline cursor-pointer select-none"
                                        >
                                             Nombre
                                        </span>
                                        <span>Andres Pastrana</span>
                                   </div>

                                   <div>
                                        <span
                                             onClick={() => HandleModal({ Tipo: "direccion" })}
                                             className="select-none cursor-pointer underline "
                                        >
                                             Direcciones
                                        </span>
                                        <span>Juan Laperra 240</span>
                                   </div>
                                   <div>
                                        <span>Creditos</span>
                                        <span>3</span>
                                   </div>
                                   <div>
                                        <span>F.Ingreso</span>
                                        <span>06/06/2022</span>
                                   </div>
                                   <div>
                                        <span className="underline cursor-pointer select-none">
                                             T.Negocio
                                        </span>
                                        <span>Verduleria</span>
                                   </div>
                                   <div>
                                        <span>Valor</span>
                                        <span>85600</span>
                                   </div>
                                   <div>
                                        <span>Calificación</span>
                                        <span>8/10</span>
                                   </div>
                                   <Modal
                                        maskClosable={false}
                                        footer={null}
                                        okButtonProps={{ hidden: true }}
                                        open={isModalOpen}
                                        destroyOnClose={true}
                                        onCancel={HandleModalClose}
                                        className="!w-fit h- [&_.ant-modal-close-x]:!w-[30px] [&_.ant-modal-close-x]:!h-4 [&_.ant-modal-close-x]:!leading-[1.6rem] [&_.ant-modal-body]:!py-2 [&_.ant-modal-footer]:flex [&_.ant-modal-footer]:justify-center"
                                   >
                                        <InnerModal Tipo={modalSelection} />
                                   </Modal>

                                   {width < 900 ? (
                                        <>
                                             <div></div>
                                             <div></div>
                                        </>
                                   ) : (
                                        ""
                                   )}
                              </div>
                         </CustomCard>
                         <CustomCard className=" flex-col w-full [&_.innerDiv]:!pb-6 [&_.innerDiv]:p-4 [&_.innerDiv]:!pt-0 [&_.swiper-pagination]:!bottom-[2px] [&_.swiper-wrapper]:!w-full [&_.swiper-slide]:!w-full">
                              <span className="text-lg font-medium mb-2 px-4 pt-4">
                                   Creditos Activos
                              </span>
                              <hr className="mb-2 mx-4" />
                              <div className="w-full">
                                   <Swiper
                                        autoHeight={true}
                                        pagination={{ clickable: true }}
                                        modules={[Pagination]}
                                        className="w-full max-w-full min-w-0 flex"
                                   >
                                        <SwiperSlide>
                                             <div className="innerDiv">
                                                  <div className="flex mb-2  gap-2 justify-evenly flex-wrap sm:justify-between [&>div]:justify-center  sm:[&>div]:flex-col sm:[&>div]:w-[85px]  [&>div]:w-[120px] [&>div]:items-center [&>div]:flex [&>div>span:first-child]:mr-1 [&>div>span:first-child]:text-arena [&>div>span:first-child]:font-semibold [&>div>span:first-child]:flex [&>div>span:first-child]:items-center">
                                                       <span className="flex sm:items-center w-[120px] justify-center font-medium text-emerald-green sm:flex-col sm:w-[85px]">
                                                            <span>Credito #</span>{" "}
                                                            <span className="sm:text-lg">1</span>
                                                       </span>
                                                       <div>
                                                            <span>F.Inicio:</span>
                                                            <span>10/06/22</span>
                                                       </div>
                                                       <div>
                                                            <span>Pagado: </span>
                                                            <span> $15600</span>
                                                       </div>
                                                       <div>
                                                            <span>Deuda: {"    "}</span>
                                                            <span> $4400</span>
                                                       </div>
                                                       <div>
                                                            <span>Atraso: </span>
                                                            <span> 3</span>
                                                       </div>
                                                       {width < 1309 ? <div></div> : ""}
                                                  </div>
                                                  <hr className="mb-3" />
                                                  <div className="flex w-full flex-wrap justify-between [&>div]:w-[49%] sm:[&>div]:w-full mb-2 sm:gap-4">
                                                       <div className=" justify-start items-center flex flex-col">
                                                            <div className="w-fit sm:w-full">
                                                                 <span className="w-full justify-start font-medium text-lg">
                                                                      Cuotas
                                                                 </span>
                                                                 <div>
                                                                      <CuadriculaCuotas cuotas={26} fecha={[]} />
                                                                 </div>
                                                            </div>
                                                       </div>

                                                       <div
                                                            className={
                                                                 " justify-start items-center flex-col flex  sm:[&_.ant-table-wrapper]:!max-h-[400px] [&_td]:text-sm"
                                                            }
                                                       >
                                                            <div className="w-fit [&_tbody_tr_td:first-child]:border-l [&_tbody_tr_td:last-child]:border-r [&_.ant-table-body]:!min-h-[161px] [&_.ant-table-wrapper]:border-b [&_.ant-table-wrapper]:max-h-[400px]">
                                                                 <span className="font-medium text-lg">Historial</span>
                                                                 <CustomTable
                                                                      columns={columnsHistorial}
                                                                      dataSource={historial}
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        </SwiperSlide>
                                        <SwiperSlide>hola x 2</SwiperSlide>
                                   </Swiper>
                              </div>
                         </CustomCard>
                         <div className="flex gap-4 w-full sm:flex-col [&_.ant-collapse]:w-full [&_.ant-collapse-content-box]:flex [&_.ant-collapse-content-box]:gap-4 sm:[&_.ant-collapse-content-box]:justify-center [&_.ant-collapse-content-box]:flex-wrap ">
                              <Collapse>
                                   <Panel key={"1"} header={"Fotos"}>
                                        <Image.PreviewGroup>
                                             <Image
                                                  onClick={() => handlepruebainsert(1)}
                                                  width={150}
                                                  src="https://redgol.cl/__export/1586119895268/sites/redgol/img/2020/04/05/homero-simpson-1200x630_1.jpg_242310155.jpg"
                                             />
                                             <Image
                                                  onClick={() => handlepruebainsert(2)}
                                                  width={150}
                                                  src="https://redgol.cl/__export/1586119895268/sites/redgol/img/2020/04/05/homero-simpson-1200x630_1.jpg_242310155.jpg"
                                             />
                                             <Image
                                                  onClick={() => handlepruebainsert(3)}
                                                  width={150}
                                                  src="https://redgol.cl/__export/1586119895268/sites/redgol/img/2020/04/05/homero-simpson-1200x630_1.jpg_242310155.jpg"
                                             />
                                             <div>asd</div>
                                        </Image.PreviewGroup>
                                   </Panel>
                                   <Panel
                                        key={"2"}
                                        header={
                                             <div className="flex justify-between">
                                                  <span>Maps</span>
                                                  <MdGpsFixed />
                                             </div>
                                        }
                                   >
                                        <div className="w-full h-[300px]">
                                             <Map position={position} />
                                        </div>
                                        {/* {ready ?  : ""} */}
                                   </Panel>
                              </Collapse>
                         </div>
                         {visible ? (
                              <Prueba23
                                   cuadro={
                                        document.getElementsByClassName(
                                             "ant-image-preview-operations"
                                        )[0] as HTMLElement
                                   }
                              />
                         ) : (
                              ""
                         )}
                         <div id="prueba"></div>
                         <Button
                              type="primary"
                              onClick={() =>
                                   router.push(
                                        "https://www.google.com.ar/maps/place/-24.89129884149519,+-65.49758661741734/@-24.89129884149519,+-65.49758661741734"
                                   )
                              }
                         >
                              Presioname Duro
                         </Button>
                         <hr />
                         <div className="h-fit w-[330px] flex flex-col pb-2">
                              <span className="font-medium">Direcciones Registradas</span>
                              <hr className="my-2" />
                              <CustomTable
                                   columns={columnsDirecciones}
                                   dataSource={Ref.current}
                                   scroll={"150px"}
                                   columnIndex={(x) => {
                                        setRowIndex(x);
                                   }}
                              />
                              {/* <Tabla /> */}
                              <hr className="my-2" />
                              <span className="font-medium">Observaciónes</span>
                              <TextArea
                                   readOnly
                                   value={
                                        rowIndex != undefined ? direcciones[rowIndex].Observacion : ""
                                   }
                                   className="!h-[150px]"
                              />
                              <hr />
                              <InnerModal Tipo={"direccion"} />
                              <hr />
                              <label onClick={() => setModalOpen2(true)}>asd123</label>
                              <Modal
                                   open={isModalOpen2}
                                   closable={true}
                                   onCancel={() => setModalOpen2(false)}
                              >
                                   {Dirrr}
                              </Modal>
                         </div>
                    </div>
               </div>
          </DefaultLayout>
     );
}
interface Historial {
     Motivo: string;
     Fecha: Date;
     Observacion: string;
}
interface Direcciones {
     Direccion: string;
     Referencia: string;
     Observacion: string;
     /**
      * Verdadero si es la direccion principal del cliente
      */
     Principal?: boolean;
}
interface ModalInterface {
     Tipo: "nombre" | "direccion" | "negocio" | undefined;
}
