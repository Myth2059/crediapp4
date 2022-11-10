import { Button, Collapse, Image } from "antd";
import { useEffect, useState } from "react";
import CuadriculaCuotas from "../../components/app/Cuadricula/CuadriculaCuotas";
import CustomCard from "../../components/app/CustomFormCard/CustomCard";
import CustomTable from "../../components/app/CustomTable/CustomTable";
import DefaultLayout from "../../components/app/layout/DefaultLayout";
import type { ColumnsType } from "antd/es/table";
import _ from "lodash";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react"; import { Pagination } from "swiper";
import { MdOutlineDelete } from "react-icons/md";
import dynamic from "next/dynamic";
import React from "react";



var historial: Historial[] = [];

for (let index = 0; index < 4; index++) {
     historial.push({
          Motivo: _.random(1) == 1 ? "Pago" : "Transferencia",
          Fecha: faker.date.between("2022-10-31", "2022-11-06"),
          Observacion: faker.lorem.sentence(),
     });
}

const { Panel } = Collapse;
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
{/* <li><MdOutlineDelete size={40} /></li> */ }



// var insertarBoton: HTMLCollection;
export default function Cliente() {
     const [width, setWidth] = useState<number>(400);
     const [ready, setReady] = useState<boolean>(false);
     const [imageId, setImageId] = useState<number>(0);
     const [insertarBoton, setInsertarBoton] = useState<HTMLCollection>();
     const position = { lat: -24.893795, lng: -65.4867887 };


     const Map = React.useMemo(
          () =>
               dynamic(() => import("../../components/Map/customMap"), {
                    loading: () => <span>Cargando...</span>,
                    ssr: false,
               }),
          []
     );
     var botonEliminar: HTMLElement;
     if (ready) {
          botonEliminar = document.createElement("li");
          botonEliminar.innerHTML = "X";
          botonEliminar.className = "";
          botonEliminar.addEventListener("click", () => console.log(imageId));
     }
     useEffect(() => {
          setReady(true);

          // insertarBoton[0].appendChild(botonEliminar);


     }, []);

     const handlepruebainsert = () => {
          setTimeout(() => {
               const asd = document.getElementsByClassName("ant-image-preview-operations")[0];
               asd.appendChild(botonEliminar);
          }, 150);

     }

     return (
          <DefaultLayout>
               <div className="w-full flex justify-center p-4 [&_img]:inline-block">
                    <div className="w-[900px] flex flex-col gap-4">
                         <CustomCard className="p-4 flex-col gap-2">
                              <span className="text-lg font-medium">Información del Cliente</span>
                              <hr />
                              <div className="flex gap-2 justify-evenly flex-wrap sm:justify-between  sm:[&>div]:min-w-[90px]  [&>div]:min-w-[100px] [&>div]:items-center [&>div]:flex [&>div]:flex-col [&>div>span:first-child]:text-arena [&>div>span:first-child]:font-semibold [&>div>span:first-child]:flex [&>div>span:first-child]:items-center">
                                   <div className="!sm:min-w-[90px]">
                                        <span>Nombre</span>
                                        <span>Andres Pastrana</span>
                                   </div>
                                   <div>
                                        <span>F.Ingreso</span>
                                        <span>06/06/2022</span>
                                   </div>
                                   <div className=" sm:min-w-[90px]">
                                        <span>Direcciones</span>
                                        <span>Juan Laperra 240</span>
                                   </div>
                                   <div>
                                        <span>Cdtos</span>
                                        <span>3</span>
                                   </div>
                                   <div>
                                        <span>Valor</span>
                                        <span>85600</span>
                                   </div>
                                   <div>
                                        <span>Calificación</span>
                                        <span>8/10</span>
                                   </div>
                              </div>
                         </CustomCard>
                         <CustomCard className=" flex-col w-full [&_.innerDiv]:!pb-6 [&_.innerDiv]:p-4 [&_.swiper-pagination]:!bottom-[2px] [&_.swiper-wrapper]:!w-full [&_.swiper-slide]:!w-full">
                              <span className="text-lg font-medium mb-2 px-4 pt-4">
                                   Creditos Activos
                              </span>
                              <hr className="mb-2" />
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
                         <div className="flex gap-4 w-full sm:flex-col [&_.ant-collapse]:w-full ">
                              <Collapse>
                                   <Panel key={"1"} header={"Fotos"}>
                                        <Image.PreviewGroup>
                                             <Image
                                                  onClick={handlepruebainsert}
                                                  width={200}
                                                  src="https://redgol.cl/__export/1586119895268/sites/redgol/img/2020/04/05/homero-simpson-1200x630_1.jpg_242310155.jpg"
                                             />

                                        </Image.PreviewGroup>
                                   </Panel>
                                   <Panel key={"2"} header={"Maps"}>
                                        <div className="w-full h-[300px]"><Map position={position} /></div>
                                        {/* {ready ?  : ""} */}
                                   </Panel>
                              </Collapse>
                         </div>
                         <Button type="primary" onClick={() => console.log(botonEliminar)}>Presioname Duro</Button>
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
