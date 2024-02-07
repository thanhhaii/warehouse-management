import { Col, Row } from "antd";
import { ProCard, ProForm, ProFormText } from "@ant-design/pro-components";
import { useCallback } from "react";
import { LoginFormType } from "@/views/Login/types/loginModels.ts";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FunctionComponent = () => {
    const navigator = useNavigate();

    // Handler
    const handleFinish = useCallback(async (value: LoginFormType) => {
        if(value.password === 'admin' && value.username === 'admin'){
            navigator("/", {
                replace: true
            });
        }
    }, []);

    return (
        <div className="h-dvh w-dvw">
            <Row className="w-full h-full justify-center items-center">
                <Col span={6}>
                    <ProCard
                        title={<h1 className="text-2xl">Đăng Nhập</h1>}
                        className="shadow-lg !rounded-xl">
                        <ProForm<LoginFormType>
                            submitter={{
                                resetButtonProps: false,
                                searchConfig: {
                                    submitText: "Đăng nhập",
                                },
                                render: (_, dom) => {
                                    return (
                                        <div className="flex justify-center">{dom}</div>
                                    );
                                }
                            }}
                            onFinish={handleFinish}
                        >
                            <ProFormText
                                label="Tên tài khoản"
                                name="username"
                                placeholder="Tên tài khoản"
                                rules={[
                                    {
                                        pattern: /^[a-zA-Z0-9]+$/,
                                        message: "Có kí tự không phù hợp"
                                    },
                                    {
                                        required: true,
                                        message: "Không được để trống"
                                    }
                                ]}
                            />
                            <ProFormText.Password
                                label="Mật khẩu"
                                name="password"
                                placeholder="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: "Không được để trống"
                                    }
                                ]}
                            />
                        </ProForm>
                    </ProCard>
                </Col>
            </Row>
        </div>
    );
};

export default LoginPage;
