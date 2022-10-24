import { Button, Checkbox, Form, Input, Spin } from "antd";
import { useRouter } from "next/router";

export default function Login() {
     const router = useRouter();
     return <div className="flex justify-center items-center h-full flex-col">

          <div className="max-w-[332px] w-[300px] shadow-md rounded-sm">
               <div className="bg-[#24695cdb] font-light text-white w-full w max-w-[332px] text-[10px] p-[2px] flex justify-center">CrediApp</div>
               <div className="p-4 pt-4 ">
                    <Spin spinning={false} tip="Cargando..." size="large">

                         <div className="flex flex-col mb-3">
                              <span className="font-semibold text-xl">Login</span>
                              <span className="text-sm font-extralight">Hola de nuevo! Ingresa a tu cuenta</span>
                         </div>
                         <div>
                              <Form layout="vertical" onFinish={(value) => { router.push("/") }}   >
                                   <Form.Item style={{ marginBottom: "12px" }} label="Usuario" name="arroz" rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}>
                                        <Input />
                                   </Form.Item>
                                   <Form.Item
                                        style={{ marginBottom: "8px" }}
                                        label="Contraseña"
                                        name="password"
                                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
                                   >
                                        <Input.Password />
                                   </Form.Item>

                                   <Form.Item name="remember" valuePropName="checked" >
                                        <Checkbox>Recordar Contraseña</Checkbox>
                                   </Form.Item>


                                   <Form.Item className="flex [&_button]:w-[184px] justify-center">
                                        <Button type="primary" htmlType="submit" >
                                             Submit
                                        </Button>
                                   </Form.Item>
                              </Form>
                         </div>
                    </Spin>
               </div>
          </div>
     </div>
}
