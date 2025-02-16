import { SaveOutlined } from '@ant-design/icons';
import { ProCard, ProForm, ProFormDigit, ProFormGroup, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useCallback } from 'react';
import ConfigProductsForm from './components/ConfigProductsForm';
import { invoiceFormInitialValue } from './helpers/invoiceDataHelper';
import { InvoiceFormType } from './types/invoiceData';
import apiService from '@/services/apiService/apiService';

const CreateInvoicePage: React.FunctionComponent = () => {
    const [form] = ProForm.useForm<InvoiceFormType>();

    const handleRequest = useCallback(async() => {
        return invoiceFormInitialValue;
    },[]);

    const handleFinish = useCallback(async (values: InvoiceFormType) => {
        apiService.createOrder(values);
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
                    />
                    <ProFormText 
                        name="phone"
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        required
                        width="xl"
                    />
                    <ProFormTextArea 
                        name="deliveryAddress"
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ"
                        required
                        width="xl"
                    />
                </ProFormGroup>
                <ProFormGroup
                    collapsible
                    title="Chi tiết đơn hàng">
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