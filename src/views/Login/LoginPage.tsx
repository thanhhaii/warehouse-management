// Vendor
import { Col, Row } from "antd";
import { ProCard, ProForm, ProFormText } from "@ant-design/pro-components";
import { useCallback } from "react";
import { Navigate } from "react-router-dom";

// Src
import { LoginFormType } from "@/views/Login/types/loginModels.ts";
import { useAppDispatch, useAppSelector } from "@/states/hooks.ts";
import { selectUserIsSignedIn } from "@/states/selectors/authSelector";
import { useLoginMutation } from "@/states/services/authentication";

const LoginPage: React.FunctionComponent = () => {
    // Hooks
    const [form] = ProForm.useForm();
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectUserIsSignedIn);
    const [login, { isError }] = useLoginMutation();

    // Handler
    const handleFinish = useCallback(async (value: LoginFormType) => {
        await login({
            password: value.password,
            username: value.username
        });
    }, [dispatch, login]);

    const handleKeyUp = useCallback((event: any) => {
        if (event.keyCode === 13) {
            form.submit();
        }
    }, [form]);

    if(isLogin){
        return <Navigate to="/" replace />;
    }

    return (
        <div className="h-dvh w-dvw">
            <Row className="w-full h-full justify-center items-center">
                <Col span={18} sm={12} md={6}>
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
                            form={form}
                            onFinish={handleFinish}
                            onKeyUp={handleKeyUp}
                        >
                            {isError && (
                                <div className="p-2 rounded-lg bg-red-200 mb-3">
                                    <p className="mb-0 text-xs text-red-600 font-bold">
                                        Tên tài khoản hoặc mật khẩu không chính xác!
                                    </p>
                                </div>
                            )}
                            <ProFormText
                                label="Tên tài khoản"
                                name="username"
                                placeholder="Tên tài khoản"
                                rules={[
                                    {
                                        pattern: /^[a-zA-Z0-9._@]+$/,
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
