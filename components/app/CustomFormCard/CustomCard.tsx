
import React from "react";
import { ReactNode } from "react";



const CustomCard = React.forwardRef<HTMLDivElement, customCardProps>((props, ref) => {
     return <div ref={ref} className={"w-full h-full flex shadow-md bg-white rounded " + props.className}>{props.children}</div>
});


// { children, ...divprops }: customCardProps<

export default CustomCard;


interface customCardProps extends React.ComponentProps<"div"> {
     children: ReactNode;

}