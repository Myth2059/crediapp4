
import { ReactNode } from "react";








export default function CustomCard(props: customCardProps) {
     return <div {...props} className={"w-full h-full flex shadow-md bg-white rounded-sm " + props.className}>{props.children}</div>
}
interface customCardProps extends React.HTMLAttributes<HTMLElement> {
     children: ReactNode;

}