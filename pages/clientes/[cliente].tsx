import { Button, Collapse, Image, Input, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
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
import { SiAddthis } from "react-icons/si";
import TextArea from "antd/lib/input/TextArea";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { DatosApiCliente } from "../../utils/CafePruebas";
import { ClienteInterface, Direccion } from "../../interfaces/Cliente";




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





const columnsDirecciones: ColumnsType<Direccion> = [
     {
          title: "Dirección",
          dataIndex: "direccion",
          render: ((value, record) => { return (record.principal ? <span>{value}<span className="text-[10px] text-emerald-green-2"> (Principal)</span></span> : <span>{value}</span>) })
     },
     {
          title: "Referencia",
          dataIndex: "referencia",


     }
]


//Fin Variables Externas//


const imagenes: string[] = ["https://s2.dmcdn.net/v/SqfKZ1WNipVg5ti58/x240", "https://img-07.stickers.cloud/packs/65dfc4f0-c8a5-42a0-91c2-c77f2faf1549/webp/ff04dafc-3f60-414d-ab70-534177e19c72.webp", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLrq4s4xwmnVwnLBDcBPH7CZY4SSto1DoDA&usqp=CAU"];







export default function Cliente({ data }: InferGetServerSidePropsType<ClienteInterface>) {
     var datos: ClienteInterface = data;
     // console.log(datos);

     //UseStates & useEffect//
     const [width, setWidth] = useState<number>(400);
     const [ready, setReady] = useState<boolean>(false);
     const [imageId, setImageId] = useState<number>(0);
     const [visible, setVisible] = useState<boolean>(false);
     const [botonAgregado, setBotonAgregado] = useState<boolean>(false);
     const [isModalClienteOpen, setIsModalClienteOpen] = useState<boolean>(false);
     const [isModalDireccionOpen, setIsModalDireccionOpen] = useState<boolean>(false);
     const [isModalAddDirOpen, setIsModalAddDirOpen] = useState<boolean>(false);
     const [isModalNegocioOpen, setIsModalNegocioOpen] = useState<boolean>(false);
     const [rowIndex, setRowIndex] = useState<number | undefined>(undefined);
     const [loading, SetLoading] = useState<boolean>(false);
     const [direcciones, setDirecciones] = useState<Direccion[]>([...datos.direccion]);
     const router = useRouter();

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




     //Variables//
     var historial: Historial[] = [];

     const position = { lat: -24.893795, lng: -65.4867887 };

     var botonEliminar: HTMLElement;

     interface containerProps {
          cuadro: Element;
     }


     const modalCliente = (
          <div className="h-fit w-[220px] flex flex-col">
               <span>Actualizar Nombre</span>
               <hr className="my-2" />

               <Input
                    disabled={loading}
                    className="text-center"
                    defaultValue={datos.nombre}
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
                    dataSource={direcciones}
                    scroll={"150px"}
                    columnIndex={(x) => {
                         setRowIndex(x);
                    }}
               />
               {/* <Tabla /> */}
               <hr className="mt-1 mb-4" />
               <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Observaciónes</span>
                    <a onClick={() => setIsModalAddDirOpen(true)}><SiAddthis size={15} /></a>
                    <Modal maskClosable={false} footer={null} okButtonProps={{ hidden: true }} open={isModalAddDirOpen} destroyOnClose={true} onCancel={() => setIsModalAddDirOpen(false)} className="!w-fit h- [&_.ant-modal-close-x]:!w-[30px] [&_.ant-modal-close-x]:!h-4 [&_.ant-modal-close-x]:!leading-[1.6rem] [&_.ant-modal-body]:!py-2 [&_.ant-modal-footer]:flex [&_.ant-modal-footer]:justify-center">
                         <div className="h-fit w-[330px] flex flex-col pb-2 gap-2">
                              <div>
                                   <span className="font-medium">Agregar Dirección</span>
                                   <hr className="my-2" />
                              </div>
                              <div>
                                   <span>Direccion</span>
                                   <Input placeholder="" />
                              </div>
                              <div>
                                   <span>Referencia</span>
                                   <Input placeholder="" />
                              </div>
                              <div className="mb-2">
                                   <span>Observación</span>
                                   <TextArea className="!h-[100px]" />
                              </div>
                              <div className="flex justify-center w-full">
                                   <Button type="primary">Guardar</Button>
                              </div>
                         </div>
                    </Modal>
               </div>
               <TextArea

                    readOnly
                    value={
                         rowIndex != undefined ? direcciones[rowIndex].observacion : ""
                    }
                    className="!h-[150px]"
               />
          </div>
     );

     const modalNegocio = (
          <div className="h-fit w-[220px] flex flex-col">
               <span>Actualizar Negocio</span>
               <hr className="my-2" />

               <Input
                    disabled={loading}
                    className="text-center"
                    defaultValue={"Drogueria"}
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


     //Fin Variables//


     //Funciones//

     //--------

     //--------
     const handlepruebainsert = (x: number) => {
          setImageId(x);
          if (!botonAgregado) {
               setBotonAgregado(true);
               setTimeout(() => {
                    setVisible(true)

               }, 150);
          }
     };



     const Prueba23 = (Container: containerProps) => {

          return ReactDOM.createPortal(<li onClick={() => console.log(imageId)} className="-mb-[5px]"><RiDeleteBin2Line size={18} /></li>, Container.cuadro);

     }
     const Map = React.useMemo(
          () =>
               dynamic(() => import("../../components/Map/customMap"), {
                    loading: () => <span>Cargando...</span>,
                    ssr: false,
               }),
          []
     );




     const HandleModalClose = () => {
          setIsModalClienteOpen(false);
          setIsModalDireccionOpen(false);
          setIsModalNegocioOpen(false);
          setRowIndex(undefined);
          SetLoading(false);
     }

     //Fin Funciones//



     return (
          <DefaultLayout>
               <div className="w-full flex justify-center p-4 [&_img]:inline-block">
                    <div className="max-w-[900px] w-full flex flex-col gap-4">
                         <CustomCard className="p-4 flex-col gap-2">
                              <span className="text-lg font-medium">Información del Cliente</span>
                              <hr />
                              <div className="flex  gap-2 justify-around flex-wrap sm:justify-between  sm:[&>div]:min-w-[90px]  [&>div]:min-w-[100px] [&>div]:items-center [&>div]:flex [&>div]:flex-col [&>div>span:first-child]:text-arena [&>div>span:first-child]:font-semibold [&>div>span:first-child]:flex [&>div>span:first-child]:items-center sm:text-[14px]">
                                   <div className="!sm:min-w-[90px]">
                                        <span onClick={() => setIsModalClienteOpen(true)} className="underline cursor-pointer select-none">Nombre</span>
                                        <span>{datos.nombre}</span>
                                        <Modal maskClosable={false} footer={null} okButtonProps={{ hidden: true }} open={isModalClienteOpen} destroyOnClose={true} onCancel={HandleModalClose} className="!w-fit h- [&_.ant-modal-close-x]:!w-[30px] [&_.ant-modal-close-x]:!h-4 [&_.ant-modal-close-x]:!leading-[1.6rem] [&_.ant-modal-body]:!py-2 [&_.ant-modal-footer]:flex [&_.ant-modal-footer]:justify-center">
                                             {modalCliente}
                                        </Modal>
                                   </div>

                                   <div >
                                        <span onClick={() => setIsModalDireccionOpen(true)} className="select-none cursor-pointer underline ">Direcciones</span>
                                        <span>{datos.direccion.find((x) => x.principal == true)?.direccion}</span>
                                        <Modal maskClosable={false} footer={null} okButtonProps={{ hidden: true }} open={isModalDireccionOpen} destroyOnClose={true} onCancel={HandleModalClose} className="!w-fit h- [&_.ant-modal-close-x]:!w-[30px] [&_.ant-modal-close-x]:!h-4 [&_.ant-modal-close-x]:!leading-[1.6rem] [&_.ant-modal-body]:!py-2 [&_.ant-modal-footer]:flex [&_.ant-modal-footer]:justify-center">
                                             {modalDireccion}
                                        </Modal>
                                   </div>
                                   <div>
                                        <span>Creditos</span>
                                        <span>{datos.creditos.length}</span>
                                   </div>
                                   <div>
                                        <span>F.Ingreso</span>
                                        <span>{moment(datos.fIngreso).format("DD/MM/YYYY")}</span>
                                   </div>
                                   <div >
                                        <span className="underline cursor-pointer select-none" onClick={() => setIsModalNegocioOpen(true)}>T.Negocio</span>
                                        <span >{datos.tNegocio}</span>
                                        <Modal maskClosable={false} footer={null} okButtonProps={{ hidden: true }} open={isModalNegocioOpen} destroyOnClose={true} onCancel={HandleModalClose} className="!w-fit h- [&_.ant-modal-close-x]:!w-[30px] [&_.ant-modal-close-x]:!h-4 [&_.ant-modal-close-x]:!leading-[1.6rem] [&_.ant-modal-body]:!py-2 [&_.ant-modal-footer]:flex [&_.ant-modal-footer]:justify-center">
                                             {modalNegocio}
                                        </Modal>
                                   </div>
                                   <div>
                                        <span>Valor</span>
                                        <span>{datos.valor}</span>
                                   </div>
                                   <div>
                                        <span>Calificación</span>
                                        <span>{datos.calificacion}/10</span>
                                   </div>


                                   {width < 900 ? <><div></div><div></div></> : ""}

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
                                        slidesPerView={1}
                                   >
                                        {datos.creditos.map((val, i) => {
                                             return (
                                                  <SwiperSlide>

                                                       <div className="innerDiv ">
                                                            <div className="flex mb-2  gap-2 justify-evenly flex-wrap sm:justify-between [&>div]:justify-center  sm:[&>div]:flex-col sm:[&>div]:w-[85px]  [&>div]:w-[120px] [&>div]:items-center [&>div]:flex [&>div>span:first-child]:mr-1 [&>div>span:first-child]:text-arena [&>div>span:first-child]:font-semibold [&>div>span:first-child]:flex [&>div>span:first-child]:items-center">
                                                                 <span className="flex sm:items-center w-[120px] justify-center font-medium text-emerald-green sm:flex-col sm:w-[85px]">
                                                                      <span>Credito #</span>{" "}
                                                                      <span className="sm:text-lg">{val.creditoNum}</span>
                                                                 </span>
                                                                 <div>
                                                                      <span>F.Inicio:</span>
                                                                      <span>{moment(val.fInicio).format("DD/MM/YYYY")}</span>
                                                                 </div>
                                                                 <div>
                                                                      <span>Monto: </span>
                                                                      <span> ${val.monto.toLocaleString("es-CO")}</span>
                                                                 </div>
                                                                 <div>
                                                                      <span>Cuotas: </span>
                                                                      <span> {val.numCuotas}</span>
                                                                 </div>
                                                                 <div>
                                                                      <span>V/Cuota: </span>
                                                                      <span> ${val.valorCuota.toLocaleString("es-CO")}</span>
                                                                 </div>
                                                                 <div>
                                                                      <span>Pagado: </span>
                                                                      <span> ${val.pagado.toLocaleString("es-CO")}</span>
                                                                 </div>
                                                                 <div>
                                                                      <span>Deuda:</span>
                                                                      <span> ${val.deuda.toLocaleString("es-CO")}</span>
                                                                 </div>
                                                                 <div>
                                                                      <span>Atraso: </span>
                                                                      <span> {val.atraso}</span>
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
                                                                                {ready ? <CuadriculaCuotas cuotas={val.numCuotas} fecha={[...val.listaCuotas]} /> : ""}
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
                                             )
                                        })}



                                   </Swiper>
                              </div>
                         </CustomCard>
                         <div className="flex gap-4 w-full sm:flex-col [&_.ant-collapse]:w-full [&_.ant-collapse-content-box]:flex [&_.ant-collapse-content-box]:gap-4 sm:[&_.ant-collapse-content-box]:justify-center [&_.ant-collapse-content-box]:flex-wrap ">
                              <Collapse>
                                   <Panel key={"1"} header={"Fotos"}>


                                        <Image.PreviewGroup>
                                             {imagenes.map((data, i) => {
                                                  return <Image

                                                       onClick={() => handlepruebainsert(1)}
                                                       width={150}
                                                       src={data}


                                                  />
                                             })}


                                             <div>asd</div>
                                        </Image.PreviewGroup>
                                   </Panel>
                                   <Panel key={"2"} header={<div className="flex justify-between"><span>Maps</span><MdGpsFixed /></div>}>
                                        <div className="w-full h-[300px]">
                                             <Map position={position} />
                                        </div>
                                        {/* {ready ?  : ""} */}
                                   </Panel>
                              </Collapse>
                         </div>
                         {visible ? <Prueba23 cuadro={document.getElementsByClassName("ant-image-preview-operations")[0] as HTMLElement} /> : ""}
                         <div id="prueba"></div>
                         <Button type="primary" onClick={() => { var pru = DatosApiCliente("asd"); }}>
                              Presioname Duro
                         </Button>
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

interface ModalInterface {
     Tipo: "nombre" | "direccion" | "negocio" | undefined;
}
function obtenerPosicion() {
     if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
               console.log("Latitude is :", position.coords.latitude);
               console.log("Longitude is :", position.coords.longitude);
          });
     } else {
          console.log("Not Available");
     }

}
export const getServerSideProps: GetServerSideProps = async (context) => {
     const res = await DatosApiCliente(String(context.params));

     const data: ClienteInterface | null = res;

     return {
          props: {
               data
          }
     }
}