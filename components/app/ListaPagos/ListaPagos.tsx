import { Button, Input, InputNumber, List } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { FaSyncAlt } from "react-icons/fa";
import { ListaDiariaPagos } from "../../../interfaces/Credito";
import "moment/locale/es";

export default function ListaPagos(props: listaProps) {

     const [loadings, setLoadings] = useState<boolean[]>([]);

     const handleEnterLoadings = (x: number) => {
          setLoadings((value) => {
               const nuevosValores = [...value];
               nuevosValores[x] = true;
               return nuevosValores;
          });
     };

     const handleOutLoadings = (x: number) => {
          setLoadings((value) => {
               const nuevosValores = [...value];
               nuevosValores[x] = false;
               return nuevosValores;
          });
     };
     return (
          <div className="w-full flex justify-center">
               <div className="w-full border flex flex-col   max-w-[500px]  [&_.ant-btn-loading-icon]:flex [&_.ant-btn-loading-icon]:justify-center [&_.ant-btn-loading-icon]:items-center">
                    <div className="w-full flex border-b ">
                         <div className="border-r  w-[50px] text-center">
                              <p className="text-arena-oscura m-0">Pago</p>
                         </div>
                         <div className="border-r w-[115px] text-center">
                              <p className="text-arena-oscura m-0">Fecha</p>
                         </div>
                         <div className="flex flex-col items-center w-[130px] border-r">
                              <p className="text-arena-oscura m-0">Valor</p>
                         </div>
                         <div className="flex text-arena-oscura justify-center flex-grow sm:after:content-['Mod'] after:content-['Modificar']">

                         </div>
                    </div>
                    {(props.data != undefined && props.data.length) ? <List dataSource={props.data} renderItem={(item, index) => <List.Item key={"list" + index} className="!p-0">{
                         <div className="w-full  flex items-center h-[32px] [&>div]:h-full [&>div]:flex [&>div]:justify-center [&>div]:items-center">
                              <div className="border-r w-[50px] text-center">
                                   <span className="text-emerald-green-2 ">#{index + 1}</span>
                              </div>
                              <div className="border-r w-[115px] text-center">

                                   <span className="">{moment(item.fecha).format("ddd DD/MM")}</span>
                              </div>
                              <div className="flex  w-[130px] border-r">

                                   <InputNumber defaultValue={item.valor} controls={false} className="!w-[100px] h-[20px] text-center [&_input]:h-[18px] [&_input]:text-center [&_.ant-input-number-input-wrap]:flex" type={"number"} disabled={loadings[index]} />
                              </div>
                              <div className="flex justify-center items-center flex-grow">

                                   <Button
                                        onClick={() => handleEnterLoadings(index)}
                                        loading={loadings[index]}
                                        className="!w-[22px] !h-[22px]"
                                        type="primary"
                                        icon={<FaSyncAlt className="w-full" />}
                                   />
                              </div>
                         </div>
                    }</List.Item>} /> : ""}



               </div>
          </div>
     );
}
interface listaProps {
     data: ListaDiariaPagos[];
}
