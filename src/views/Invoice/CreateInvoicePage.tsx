import { SaveOutlined } from '@ant-design/icons';
import { ProCard, ProForm, ProFormDigit, ProFormGroup, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useCallback } from 'react';
import ConfigProductsForm from './components/ConfigProductsForm';
import { invoiceFormInitialValue } from './helpers/invoiceDataHelper';
import { InvoiceFormType } from './types/invoiceData';
import apiService from '@/services/apiService/apiService';
import { useNavigate } from 'react-router-dom';

const CreateInvoicePage: React.FunctionComponent = () => {
    const [form] = ProForm.useForm<InvoiceFormType>();
    const navigate = useNavigate();

    const handleRequest = useCallback(async() => {
        return invoiceFormInitialValue;
    },[]);

    const handleFinish = useCallback(async (values: InvoiceFormType) => {
        const resp = await apiService.createOrder(values);
        if(resp?.message.toLowerCase() === "success") {
            navigate('/invoice', { replace: true });
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
            </ProForm>
        </ProCard>
    );
};

export default CreateInvoicePage;