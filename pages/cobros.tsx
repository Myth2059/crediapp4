import { Button, Divider, Dropdown, Input, Radio, RadioChangeEvent, Space, Table } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { ColumnsType, ColumnType } from "antd/lib/table";
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Column from "antd/lib/table/Column";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Highlighter from 'react-highlight-words';
import CustomCard from "../components/app/CustomFormCard/CustomCard";
import DefaultLayout from "../components/app/layout/DefaultLayout";



type DataIndex = keyof datosCobros;



const Datos: datosCobros[] = [{
     key: "1",
     Cobro: "limache",
     Cobrador: "Michael",
     Clientes: 13,
     Creditos: 54,
     Valor: 60000
},
{
     key: "3",
     Cobro: "tribuno",
     Cobrador: "Jimena",
     Clientes: 166,
     Creditos: 14,
     Valor: 650000
},
{
     key: "4",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
}
     ,
{
     key: "5",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
}
     ,
{
     key: "6",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
}
     ,
{
     key: "7",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
}
     ,
{
     key: "8",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
}
     ,
{
     key: "9",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
}
     ,
{
     key: "10",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
}
     ,
{
     key: "11",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "12",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "13",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "14",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "15",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "16",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "17",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "18",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "19",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "20",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "21",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "22",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "23",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "24",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "25",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "26",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
},
{
     key: "27",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
}];







export default function Cobros() {
     const [searchText, setSearchText] = useState('');
     const [columna, setColumna] = useState("Cobro");
     const [height, setHeight] = useState(0);
     const ref = useRef<HTMLDivElement>(null);

     useEffect(() => {
          if (ref.current != null) {
               setHeight(ref.current.clientHeight)
               console.log(ref.current.clientHeight)
          }
     })

     function timerHeigt(fn: () => void, ms: number) {
          var timer: NodeJS.Timeout;
          return () => {
               clearTimeout(timer);
               timer = setTimeout(fn, ms);

          }
     }

     useEffect(() => {
          const changeHeight = timerHeigt(() => {
               if (ref.current != null) {

                    setHeight(ref.current.clientHeight);
                    console.log("HandleResize " + ref.current.clientHeight);
               }
          }, 50);

          window.addEventListener("resize", changeHeight)

          return () => { window.removeEventListener("resize", changeHeight) }
     })









     const columns: ColumnsType<datosCobros> = [
          {
               title: "Cobro",
               dataIndex: "Cobro",
               sorter: (a, b) => {
                    var dato1 = a.Cobro.toUpperCase();
                    var dato2 = b.Cobro.toUpperCase();
                    if (dato1 < dato2) {
                         return -1;
                    }
                    if (dato1 > dato2) {
                         return 1;
                    }
                    return 0;
               },
               render: (cobro) => (<><Link href={"/cobros/" + cobro}><a>{cobro}</a></Link></>),
               align: "center",
               className: "text-xs",
               filteredValue: [""],

               onFilter: (value, record) => {
                    if (columna == "Cobro") {
                         return record.Cobro.toLowerCase().includes(searchText.toLowerCase())
                    }
                    return true;
               },

          },
          {
               title: "Cobrador",
               dataIndex: "Cobrador",
               sorter: (a, b) => {
                    var dato1 = a.Cobrador.toUpperCase();
                    var dato2 = b.Cobrador.toUpperCase();
                    if (dato1 < dato2) {
                         return -1;
                    }
                    if (dato1 > dato2) {
                         return 1;
                    }
                    return 0;
               }, align: "center",
               className: "text-xs",
               filteredValue: [""],

               onFilter: (value, record) => {
                    if (columna == "Cobrador") {

                         return record.Cobrador.toLowerCase().includes(searchText.toLowerCase())
                    }
                    return true;
               },

          },
          {
               title: "Cltes",
               dataIndex: "Clientes",
               sorter: (a, b) => a.Clientes - b.Clientes,
               align: "center",
               className: "text-xs"

          },
          {
               title: "Ctos",
               dataIndex: "Creditos",
               sorter: (a, b) => a.Creditos - b.Creditos,
               align: "center",
               className: "text-xs"
          },
          {
               title: "Valor",
               dataIndex: "Valor",
               sorter: (a, b) => a.Valor - b.Valor,
               render: (valor: number) => ("$" + valor.toLocaleString("es-CO")),
               align: "center",
               className: "text-xs"

          }

     ]



     const [width, setWidth] = useState(0);
     useEffect(() => {
          setWidth(window.innerWidth);
     }, [])

     const radioOnChange = (e: RadioChangeEvent) => {
          setColumna(e.target.value)
     }



     const overlay = (<div className="bg-white shadow-md rounded-md p-4 w-60">
          <Input allowClear={true} onChange={(e) => setSearchText(e.currentTarget.value)} />
          <Radio.Group onChange={radioOnChange} value={columna} className="!mt-4">
               <Radio value={"Cobro"}>Cobro</Radio>
               <Radio value={"Cobrador"}>Cobrador</Radio>
          </Radio.Group>

     </div>)

     return (
          <DefaultLayout>

               <div className="w-full h-full flex justify-center p-4">
                    <CustomCard className="w-[900px] p-3 flex flex-col min-h-[calc(100vh-78px)] h-[calc(100vh-78px)] max-h-[calc(100vh-45px)]" ref={ref}>
                         <div className="flex w-full justify-between">
                              <span className="font-semibold"> Lista de Cobros</span>

                              <Dropdown overlay={overlay} placement="bottomRight">

                                   <a >
                                        <SearchOutlined style={{ color: '#1890ff' }} />
                                   </a>
                              </Dropdown>
                         </div>
                         <Divider style={{ margin: "12px 0px" }} />
                         <Table pagination={{ disabled: true, position: ["none", "none"], defaultPageSize: 500 }} dataSource={Datos} size={width < 500 ? "small" : "middle"} columns={columns} scroll={{ y: (height - 111) }} >

                         </Table>
                    </CustomCard>
               </div>
          </DefaultLayout>)
}

interface datosCobros {
     key: string,
     Cobro: string,
     Cobrador: string,
     Clientes: number,
     Creditos: number,
     Valor: number,


}