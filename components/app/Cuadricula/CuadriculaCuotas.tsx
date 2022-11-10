import moment from "moment";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Style from "./CuadriculaCuotas.module.css";
import "moment/locale/es";

export default function CuadriculaCuotas(props: cuadriculaCuotasProps) {
     const ref = useRef<HTMLDivElement>(null);
     const [height, setHeight] = useState<number>(45);
     const [windowWidht, setWindowWidht] = useState<number>(450);
     useEffect(() => {
          setHeight(ref.current!.clientWidth);

     }, []);
     useEffect(() => {
          setWindowWidht(window.innerWidth);
     }, [])
     var pagos: string[] = [];
     var cuadros =
          windowWidht < 321 ? 4 - (props.cuotas % 4 == 0 ? 4 : props.cuotas % 4) + props.cuotas : windowWidht > 999 ? 6 - (props.cuotas % 6 == 0 ? 6 : props.cuotas % 6) + props.cuotas : 5 - (props.cuotas % 5 == 0 ? 5 : props.cuotas % 5) + props.cuotas;
     for (let index = 0; index < cuadros; index++) {
          if (index < props.fecha.length) {
               pagos[index] = props.fecha[index];
          } else {
               pagos[index] = "";
          }
     }

     return (
          <div style={{ gridAutoRows: `${height}px` }} className={Style.Cuadricula + " w-full h-fit overflow-hidden rounded-md"}>
               {pagos.map((x, i) => (
                    <div ref={ref} className={" justify-center " + (i >= props.cuotas ? Style.desactivado : "relative ")}>
                         {/* Si el conteo es mayor a las cuotas va a devolver un string vacio que es donde va los cuadros desactivados para que quede parejito */}
                         {i >= props.cuotas ? (
                              ""
                         ) : pagos[i] != "" ? (
                              !isNaN(pagos[i] as any) ? (
                                   //   aqui van las colas
                                   <div className=" flex justify-center items-center h-full text-orange-700  ">{pagos[i]}</div>
                              ) : (
                                   // aqui va la fecha
                                   <div className="flex flex-col w-full h-full text-emerald-green-2 ">
                                        <div className="h-1/2 flex justify-center items-center border-b border-dashed border-[#a44e00]">{moment(x).format("DD/MM")}</div>
                                        <div className="h-1/2 flex justify-center items-center">{moment(x).locale("es").format("ddd").replace(".", "")}</div>
                                   </div>
                              )
                         ) : (
                              // aqui va el numero de la cuota
                              <div className="flex w-full h-full items-center text-base font-light  justify-center"> {i + 1}</div>
                         )}
                    </div>
               ))}
          </div>
     );
}
interface cuadriculaCuotasProps {

     cuotas: number;
     /**
      * Aca se recibe la fecha o el monto de cola
      */
     fecha: string[];
}
