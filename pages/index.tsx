import dynamic from "next/dynamic";
import React from "react";

export default function Index() {
     const MapContainer = React.useMemo(
          () =>
               dynamic(() => import("./prueba"), {
                    ssr: false,
               }),
          []
     );
     return (
          <div className="w-[500px] h-[500px]">
               <MapContainer />
          </div>
     )
}