import { SaveOutlined } from '@ant-design/icons';
import { ProCard, ProForm, ProFormDigit, ProFormGroup, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { App, Button } from 'antd';
import React, { lazy, useCallback, useState } from 'react';
import ConfigProductsForm from './components/ConfigProductsForm';
import { invoiceFormInitialValue } from './helpers/invoiceDataHelper';
import { InvoiceFormType } from './types/invoiceData';
import apiService from '@/services/apiService/apiService';
import { useNavigate } from 'react-router-dom';
import { AxiosError, isAxiosError } from 'axios';
import { ResponseBase } from '@/services/apiService/responseTypes';

const ModalPreviewInvoice = lazy(() => import('./components/ModalPreviewInvoice'));

const CreateInvoicePage: React.FunctionComponent = () => {
    const { notification } = App.useApp();
    const [form] = ProForm.useForm<InvoiceFormType>();
    const navigate = useNavigate();

    const [isShowPreview, setShowPreview] = useState<boolean>(false);

    const handleRequest = useCallback(async() => {
        return invoiceFormInitialValue;
    },[]);

    const handleFinish = useCallback(async () => {
        setShowPreview(true);
    }, []);

    const handleCreateInvoice = useCallback(async () => {
        const values = form.getFieldsValue(true);
        try {
            const resp = await apiService.createOrder(values);
            if(resp?.message.toLowerCase() === "success") {
                navigate('/invoice', { replace: true });
                notification.success({
                    message: 'Thành công',
                    description: 'Tạo hoá đơn thành công!'
                });
            } else {
                notification.error({
                    message: 'Thất bại',
                    description: `Tạo hoá đơn thất bại, vui lòng thử lại!. Lỗi: ${resp.message}`
                });
            }
        } catch (err){
            if(isAxiosError(err)) {
                const error = err as AxiosError<ResponseBase>;
                notification.error({
                    message: 'Lỗi',
                    description: `Có lỗi xảy ra khi tạo hoá đơn, vui lòng thử lại!. Lỗi: ${error.response?.data.message}`
                });
            }
        }
    }, []);

    return (
        <ProCard
            extra={[
                <Button 
                    type="primary" 
                    key="submit" 
                    icon={<SaveOutlined />}
                    onClick={() => form.submit()}>
                    Tạo hoá đơn
                </Button>
            ]} 
            title="Tạo đơn đặt hàng">
            <ProForm 
                onFinish={handleFinish}
                request={handleRequest}
                submitter={false}
                form={form}>
                <ProFormGroup 
                    collapsible
                    title="Thông tin khách hàng">
                    <ProFormText 
                        name="customerName"
                        label="Tên khách hàng"
                        placeholder="Nhập tên khách hàng"
                        required
                        width="xl"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}
                    />
                    <ProFormText 
                        name="phone"
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        required
                        width="xl"
                        rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại' },
                            { pattern: /^0[0-9]{9}$/, message: 'Số điện thoại không hợp lệ' }
                        ]}
                    />
                    <ProFormTextArea 
                        name="deliveryAddress"
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ"
                        width="xl"
                    />
                </ProFormGroup>
                <ProFormGroup
                    collapsible
                    title="Chi tiết đơn hàng">
                    <ProFormTextArea
                        name="description"
                        label="Mô tả đơn hàng"
                        width="lg"
                    />
                    <ProFormDigit 
                        name="discount"
                        label="Phần trăm giảm giá"
                    />   
                </ProFormGroup>
                <ConfigProductsForm />
                {isShowPreview && (
                    <ModalPreviewInvoice
                        open={isShowPreview}
                        onClose={() => setShowPreview(false)}
                        onSubmit={handleCreateInvoice}
                    />
                )}
            </ProForm>
        </ProCard>
    );
};

export default CreateInvoicePage;