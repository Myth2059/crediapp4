import { Button, Input, Space, Table } from "antd";
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
     key: "2",
     Cobro: "tribuno",
     Cobrador: "Jimena",
     Clientes: 166,
     Creditos: 14,
     Valor: 650000
},
{
     key: "3",
     Cobro: "congreso",
     Cobrador: "Sandra",
     Clientes: 19,
     Creditos: 24,
     Valor: 100000
}];







export default function Cobros() {
     const [searchText, setSearchText] = useState('');
     const [searchedColumn, setSearchedColumn] = useState('');
     const searchInput = useRef<InputRef>(null);



     const handleSearch = (
          selectedKeys: string[],
          confirm: (param?: FilterConfirmProps) => void,
          dataIndex: DataIndex,
     ) => {
          console.log(selectedKeys);
          console.log(dataIndex);
          confirm();
          setSearchText(selectedKeys[0]);
          setSearchedColumn(dataIndex);
     };

     const handleReset = (clearFilters: () => void) => {
          clearFilters();
          setSearchText('');
     };


     const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<datosCobros> => ({
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
               <div style={{ padding: 8 }}>
                    <Input
                         ref={searchInput}
                         placeholder={`Search ${dataIndex}`}
                         value={selectedKeys[0]}
                         onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                         onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                         style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                         <Button
                              type="primary"
                              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                              icon={<SearchOutlined />}
                              size="small"
                              style={{ width: 90 }}
                         >
                              Search
                         </Button>
                         <Button
                              onClick={() => clearFilters && handleReset(clearFilters)}
                              size="small"
                              style={{ width: 90 }}
                         >
                              Reset
                         </Button>
                         <Button
                              type="link"
                              size="small"
                              onClick={() => {
                                   confirm({ closeDropdown: false });
                                   setSearchText((selectedKeys as string[])[0]);
                                   setSearchedColumn(dataIndex);
                              }}
                         >
                              Filter
                         </Button>
                    </Space>
               </div>
          ),
          filterIcon: (filtered: boolean) => (
               <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
          ),
          onFilter: (value, record) =>
               record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()),
          onFilterDropdownOpenChange: visible => {
               if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
               }
          },
          render: text =>
               searchedColumn === dataIndex ? (
                    <Highlighter
                         highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                         searchWords={[searchText]}
                         autoEscape
                         textToHighlight={text ? text.toString() : ''}
                    />
               ) : (
                    text
               ),
     });


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
               render: (cobro) => (<><Link href={"/" + cobro}><a>{cobro}</a></Link></>),
               align: "center",
               className: "text-xs"

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
               ...getColumnSearchProps("Cobrador"),
               className: "text-xs"
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

     return <DefaultLayout>

          <div className="w-full flex  justify-center p-4">
               <CustomCard className="w-[900px] p-3">
                    <div className=""></div>
                    <Table dataSource={Datos} size={width < 500 ? "small" : "middle"} columns={columns}>

                    </Table>
               </CustomCard>
          </div>
     </DefaultLayout>
}

interface datosCobros {
     key: string,
     Cobro: string,
     Cobrador: string,
     Clientes: number,
     Creditos: number,
     Valor: number,


}