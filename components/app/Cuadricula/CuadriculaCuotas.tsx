import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Style from "./CuadriculaCuotas.module.css";
import "moment/locale/es";

export default function CuadriculaCuotas(props: cuadriculaCuotasProps) {
     const ref = useRef<HTMLDivElement>(null);
     const [height, setHeight] = useState<number>(45);
     const [windowWidht, setWindowWidht] = useState<number>(450);
     console.log(windowWidht)
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
                    <div ref={ref} className={" justify-center w-full " + (i >= props.cuotas ? Style.desactivado : "relative ")}>
                         {/* Si el conteo es mayor a las cuotas va a devolver un string vacio que es donde va los cuadros desactivados para que quede parejito */}
                         {i >= props.cuotas ? (
                              ""
                         ) : pagos[i] != "" ? (
                              !isNaN(pagos[i] as any) ? (
                                   //   aqui van las colas

                                   <div className="pt-2 flex justify-center items-center h-full text-orange-700  "><span className="absolute top-0 left-0 w-[35%] h-[40%] flex justify-center items-center border-b border-r border-dashed border-[#a44e00] text-black text-xs font-bold">{i + 1}</span><span className="-rotate-45"> ${(+pagos[i]).toLocaleString("es-CO")}</span></div>
                              ) : (
                                   // aqui va la fecha
                                   <div className="flex flex-col w-full h-full text-emerald-green-2 ">
                                        <div className="h-[40%] flex justify-center items-center border-b border-dashed border-[#a44e00]"><span className="w-[35%] h-full flex justify-center items-center text-black text-xs font-bold border-r border-dashed border-[#a44e00]">{i + 1}</span><span className="w-[65%] text-center">{moment(x).locale("es").format("ddd").replace(".", "")}</span></div>
                                        <div className="h-[60%] flex justify-center items-center ">{moment(x).format("DD/MM")}</div>

                                   </div>
                                   // ""
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
      * @example 2022-06-28 fecha
      * @example 450 cola o sobrante de la cuota
      */
     fecha: string[];
}
