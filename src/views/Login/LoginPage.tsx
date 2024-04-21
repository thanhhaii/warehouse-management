// Vendor
import { Col, Row } from "antd";
import { ProCard, ProForm, ProFormText } from "@ant-design/pro-components";
import { useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";

// Src
import { LoginFormType } from "@/views/Login/types/loginModels.ts";
import { useAppDispatch, useAppSelector } from "@/states/hooks.ts";
import { authActions } from "@/states/slices/authSlice.ts";
import { selectUserIsSignedIn } from "@/states/selectors/authSelector";

const LoginPage: React.FunctionComponent = () => {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const isLogin = useAppSelector(selectUserIsSignedIn);
    console.log('1');

    // Handler
    const handleFinish = useCallback(async (value: LoginFormType) => {
        {console.log('4');}
        if(value.password === 'admin' && value.username === 'admin'){
            dispatch(authActions.loginSuccess());
            navigator("/", {
                replace: true
            });
        }
    }, [dispatch]);

    if(isLogin){
        return <Navigate to="/" replace />;
    }

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
