import { Button, Divider, Layout, Menu } from "antd";
import { ReactNode, useState } from "react";
import { CgClose } from "react-icons/cg";
import Style from "./DefaultLayout.module.css"
import type { MenuProps } from "antd/es/menu";
import { AiOutlineHeart } from "react-icons/ai";
import Logo from "../../../public/LogoCrediApp.png";
import Logo2 from "../../../public/logop.png";


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
     label: React.ReactNode,
     key?: React.Key | null,
     icon?: React.ReactNode,
     children?: MenuItem[],
): MenuItem {
     return {
          key,
          icon,
          children,
          label,
     } as MenuItem;
}

const items: MenuItem[] = [
     getItem('Navigation One', '1', <AiOutlineHeart />),
     getItem('Navigation 2', '2', <AiOutlineHeart />),
     getItem('Navigation 3', '3', <AiOutlineHeart />),
     getItem('Navigation 4', '4', <AiOutlineHeart />),]
const { Header, Sider, Content } = Layout;

export default function DefaultLayout(props: layoutProps) {
     const [collapse, setCollapse] = useState<boolean>(false);

     return (
          <Layout className="h-full">
               <Sider
                    className={!collapse ? Style.Sider : ""}
                    breakpoint="xs"
                    collapsedWidth={0}
                    collapsed={collapse}
                    zeroWidthTriggerStyle={{ display: "flex", justifyContent: "center", alignItems: "center", top: "0px", }}
                    trigger={<img className="h-[28px]" src={Logo2.src} />}
                    onCollapse={(collapse) => setCollapse(collapse)}
               >
                    <div className="h-[64px] flex justify-center items-center relative"><img className="w-[150px]" src={Logo.src} alt="Loguito" /></div>
                    <Divider className="!mt-0" />
                    {<div className={(collapse ? Style.X : "") + " flex w-full pr-2 justify-end -mt-4 mb-1"}><a onClick={() => setCollapse(!collapse)} className="text-emerald-green"><CgClose size={18} /></a></div>}
                    <Menu theme="light" mode="inline" items={items} />


               </Sider>
               <Layout className="site-layout">
                    <Header style={{ height: "45px" }}>

                    </Header>
                    <Content className="overflow-hidden">{props.children}</Content>
               </Layout>
          </Layout>
     );
}
interface layoutProps {
     children: ReactNode;
}