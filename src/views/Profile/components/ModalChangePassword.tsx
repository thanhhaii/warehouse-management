import { rulesHelper } from '@/helpers/formRulesHelper';
import apiService from '@/services/apiService/apiService';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import { selectNameOfUser } from '@/states/selectors/authSelector';
import { authActions } from '@/states/slices/authSlice';
import { ModalForm, ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { App, Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

type FormType = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const ModalChangePassword: React.FC = () => {
    const { notification } = App.useApp();
    const [open, setOpen] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [form] = ProForm.useForm<FormType>();
    const userName = useAppSelector(selectNameOfUser);
    const dispatch = useAppDispatch();

    const handleFinish = useCallback(async (values: FormType) => {
        try {
            await apiService.changePassword({
                userName: userName,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            });
            notification.success({
                message: 'Thành công',
                description: 'Đổi mật khẩu thành công bạn sẽ đăng xuất trong 3 giây tới!',
                duration: 5
            });
            setSuccess(true);
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }, [userName]);

    const validatePassword = useCallback((_: any, value: string) => {
        if(!value || !form.getFieldValue('confirmPassword')) return Promise.resolve();

        if(value !== form.getFieldValue('confirmPassword')){
            return Promise.reject('Mật khẩu không trùng khớp');
        }
        return Promise.resolve();
    }
    , [form]);

    const validateConfirmPassword = useCallback((_: any, value: string) => {
        if(!value || !form.getFieldValue('newPassword')) return Promise.resolve();


        if(value !== form.getFieldValue('newPassword')){
            return Promise.reject('Mật khẩu không trùng khớp');
        }
        return Promise.resolve();
    }
    , [form]);

    useEffect(() => {
        if(open){
            form.resetFields();
        }
    }, [open]);

    useEffect(() => {
        if(!isSuccess) return;

        const timer = setTimeout(() => {
            dispatch(authActions.logout());
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [isSuccess]);

    return (
        <ModalForm
            key="change-password"
            open={open}
            onOpenChange={setOpen}
            title="Đổi mật khẩu"
            form={form}
            trigger={
                <Button>
                    Đổi mật khẩu
                </Button>
            }
            modalProps={{
                width: 400,
            }}
            onFinish={handleFinish}
            grid
        >
            <ProFormGroup>
                <ProFormText.Password
                    required
                    colProps={{ span: 24 }}
                    label="Mật khẩu cũ"
                    placeholder="Nhập mật khẩu cũ"
                    name="oldPassword"
                    rules={[
                        rulesHelper.requiredRule
                    ]}
                />
                <ProFormText.Password
                    required
                    rules={[
                        rulesHelper.requiredRule,
                        {
                            validator: validatePassword
                        },
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
                            message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số!',
                        },
                        { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
                    ]}
                    dependencies={['confirmPassword']}
                    colProps={{ span: 24 }}
                    label="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                    name="newPassword"
                    hasFeedback
                />
                <ProFormText.Password
                    required
                    colProps={{ span: 24 }}
                    label="Nhập lại mật khẩu mới"
                    placeholder="Nhập lại mật khẩu mới"
                    name="confirmPassword"
                    hasFeedback
                    rules={[
                        rulesHelper.requiredRule,
                        {
                            validator: validateConfirmPassword
                        }
                    ]}
                    dependencies={['newPassword']}
                />
            </ProFormGroup>
        </ModalForm>
    );
};

export default ModalChangePassword;