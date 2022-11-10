import { Button, Checkbox, Dropdown, message, Modal, Select, Table } from "antd";
import { ColumnsType, TableRowSelection } from "antd/lib/table/interface";
import type { TableProps as TableProps } from "antd/lib/table";
import type { TableProps as RcTableProps } from "rc-table/lib/Table";
import Style from "./CustomTable.module.css";
import type { MenuProps } from 'antd';
import React, { ChangeEvent, useEffect, useState } from "react";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

const { Option } = Select;
export default function CustomTable(props: customTableProps) {
     const [Estado, setEstado] = useState<boolean>(false);
     const [modalOpen, setModalOpen] = useState<boolean>(false);
     const [selectionModal, setSelectionModal] = useState<number>(0);
     /**
      * Este useState tiene los id de las filas seleccionadas :)
      */
     const [selectedRowsK, setSelectedRows] = useState<React.Key[]>([]);
     useEffect(() => {
          setEstado(props.mostrarCheckbox);
     }, [props.mostrarCheckbox]);
     var rowSelect1: TableProps<any> = {};

     /**
      * Esta funcion se usa para el onchange de las selecciones de la tabla
      * @param selectedRowKeys este parametro devuelve el key el identificador de cada row
      * @param selectedRows este parametro devuelve el objeto que compone el row
      */
     const rowSelection = (selectedRowKeys: React.Key[], selectedRows: any[]) => {
          setSelectedRows(selectedRowKeys);

     };

     /**Este if se encarga de asignar las propiedades a la tabla cuando se cambia el esado del State */
     if (Estado) {
          rowSelect1 = { rowSelection: { type: "checkbox", onChange: rowSelection } };
     } else {
          rowSelect1 = {};
     }

     /**
      * Esta funcion se encarga de cambiar el estado de un State que modifica varias cosas
      * @param e 
      */
     const handleCheck = (e: CheckboxChangeEvent) => {
          if (e.target.checked) {
               setEstado(true);
          } else {
               setSelectedRows([]);
               setEstado(false);
          }
     };
     const error = () => {
          message.error({ content: 'Selecciona un elemento', className: "[&_.ant-message-error]:flex [&_.ant-message-error]:items-center" });
     };
     const handleOpenModal = () => {
          if (selectedRowsK.length != 0) {
               setModalOpen(true);

          } else {
               error();
          }
     }
     const onClick: MenuProps["onClick"] = ({ key }) => {
          if (key == "menu1") {
               setSelectionModal(0);
               handleOpenModal();
          }
          if (key == "menu2") {
               setSelectionModal(1);
               handleOpenModal();
          }
          if (key == "menu3") {
               setSelectionModal(2);
               handleOpenModal();
          }
     }
     var items: MenuProps["items"] = [
     ]
     const itemsCliente: MenuProps["items"] = [
          {
               key: "menu1",
               label: "Transferir",

          },
          {
               key: "menu2",
               label: "Eliminar"
          }

     ];
     const itemsCredito: MenuProps["items"] = [
          {
               key: "menu1",
               label: "Transferir",

          },
          {
               key: "menu3",
               label: "Moroso"
          }, {
               key: "menu2",
               label: "Eliminar"
          }


     ];

     if (props.tabla == "Cliente") {
          items = itemsCliente;
     } else {
          items = itemsCredito;
     }


     /**
      * Retorna los controles para el manejo de las transferencia y Eliminaciones
      * onClick={handleOpenModal}
      */
     const controles = (
          <div className="flex justify-end items-end mb-2">
               <div className="absolute -top-[50px] z-50 right-4 ">
                    {Estado ? (
                         <Dropdown menu={{ items, onClick }} placement="bottomRight">
                              <Button className="mr-2" type="primary" size="small">
                                   Opciones
                              </Button>
                         </Dropdown>
                    ) : (
                         <></>
                    )}
               </div>
               <div className="absolute -top-[50px] z-50">
                    <Checkbox onChange={handleCheck} />
               </div>
          </div>
     );

     const handleModalClose = () => {
          setModalOpen(false);



     }
     const selecciones: React.ReactNode[] = [];

     for (let i = 0; i < selectedRowsK.length; i++) {
          selecciones.push(<Option key={i}>{"Cobrador #" + (i + 1).toString()}</Option>);
     }

     const handleDataModal = (e: number) => {
          if (e == 0) {
               return (<div className="flex flex-col mt-4 items-center h-full justify-center w-[250px] gap-4">
                    <span className=" font-medium">Por favor seleccione el cobrador al cual se le transferira {selectedRowsK.length == 1 ? "el " + props.tabla : <> los <span className="text-xl font-semibold text-emerald-green">{selectedRowsK.length} </span>  {props.tabla}s.</>} </span>
                    <Select className="w-[90%] !mb-2" size="small">{selecciones}</Select>
               </div>

               )
          }

          if (e == 1) {
               return (<div className="flex flex-col mt-4 items-center h-full justify-center w-[200px]">
                    <span className=" font-medium">Esta seguro de <span className="text-lg text-red-600">eliminar</span></span>
                    <span className="text-xl font-semibold text-emerald-green">{selectedRowsK.length} <span className="text-base text-black text-opacity-[0.65] font-medium"> {selectedRowsK.length == 1 ? props.tabla + "?" : props.tabla + "s?"}</span></span>
               </div>

               )
          }
          if (e == 2) {
               return (<div className="flex flex-col mt-4 items-center h-full justify-center w-[200px]">
                    <span className=" font-medium">Esta seguro de enviar  <span className="text-xl font-semibold text-emerald-green">{selectedRowsK.length} </span></span>
                    <span>{selectedRowsK.length == 1 ? "Credito" : "Creditos"} a <span className="text-amber-600">Morosos</span></span>

               </div>

               )
          }

     }



     const handleFooter = (e: number) => {
          if (e == 0) {
               return (<div className="flex justify-between w-full">
                    <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
                    <Button type="primary">Aceptar</Button>
               </div>)
          }
          if (e == 1) {
               return (<div className="flex justify-between w-full">
                    <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
                    <Button type="primary">Aceptar</Button>
               </div>)
          }
          if (e == 2) {
               return (<div className="flex justify-between w-full">
                    <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
                    <Button type="primary">Aceptar</Button>
               </div>)
          }
     }



     return (
          <div className="flex flex-col [&_.ant-modal-footer]:flex w-full">
               {props.checkbox ? controles : ""}
               <Modal open={modalOpen} className="!w-fit [&_.ant-modal-body]:pt-4 [&_.ant-modal-body]:pb-[0.6rem] [&_.ant-modal-close-x]:w-[28px] [&_.ant-modal-close-x]:h-[34px] [&_.ant-modal-close-x]:leading-[24px]" footer={handleFooter(selectionModal)} onCancel={handleModalClose} destroyOnClose={true}>
                    <div className="min-h-[60px] w-full overflow-hidden">
                         <div className="min-h-full">
                              {handleDataModal(selectionModal)}
                         </div>


                    </div>
               </Modal>
               <Table
                    {...rowSelect1}
                    className={"flex flex-col overflow-y-auto  "}

                    size="small"
                    dataSource={props.dataSource}
                    columns={props.columns}
                    scroll={props.scroll != undefined ? { y: props.scroll } : {}}

                    pagination={{
                         disabled: true,
                         position: ["none", "none"],
                         defaultPageSize: 500,
                    }}
               />
          </div>
     );
}

interface customTableProps {
     columns?: ColumnsType<any>;
     dataSource?: RcTableProps<object>["data"];
     checkbox: boolean;
     mostrarCheckbox: boolean;
     funcion?: () => void;
     /**
      * Aca va el nombre de la tabla, el cual sera usado para mostrar en las opciones, el nombre debe ser en singular
      */
     tabla: "Cliente" | "Credito";
     scroll?: number | string;

}
CustomTable.defaultProps = {
     checkbox: false,
     mostrarCheckbox: false,
     tabla: "fila"
};
