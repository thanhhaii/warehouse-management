import { rulesHelper } from '@/helpers/formRulesHelper';
import { buildMetricFilter } from '@/helpers/objectHelper';
import apiService from '@/services/apiService/apiService';
import { DeleteOutlined } from '@ant-design/icons';
import { ProFormDependency, ProFormDigit, ProFormGroup, ProFormList, ProFormMoney, ProFormSelect } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { Button, Form, Popconfirm } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';

const ConfigProductsForm: React.FunctionComponent = () => {
    const [nameFilter, setNameFilter] = useState<string>("");

    const { data } = useQuery({
        queryKey: [nameFilter, 'selectProduct'],
        queryFn: async () => {
            const resp = await apiService.getListProduct({
                desc: false,
                metricFilters: buildMetricFilter({
                    name: nameFilter,
                }),
                pageNumber: 0,
                pageSize: 10,
                sortField: 'createDate'
            });

            return resp.data.data;
        },
    });

    const options = useMemo(() => {
        if(!data){
            return [];
        }

        return data.map((product) => ({
            label: product.name,
            value: product.id,
        }));
    }, [data]);

    const handleSearchProduct = useMemo(() => { 
        return debounce((value) => setNameFilter(value), 300);
    }, []);

    const handleSelectProduct = useCallback((value: string): number => {
        const product = data?.find(prod => prod.id === value);

        if(!product) {
            return 0;
        }

        return product.price;
    }, [data]);

    return (
        <ProFormGroup
            collapsible
            title="Danh sách sản phẩm">
            <ProFormList
                name="orderProducts"
                copyIconProps={false}
                deleteIconProps={false}
                alwaysShowItemLabel
            >
                {(_, index, action) => {
                    action.setCurrentRowData;
                    return (
                        <ProFormGroup>
                            <ProFormSelect
                                label="Sản phẩm"
                                name="productId"
                                width="xl"
                                valueEnum={undefined}
                                options={options}
                                fieldProps={{
                                    onChange: (value: string) => action.setCurrentRowData({
                                        price: handleSelectProduct(value),
                                        quantity: 1
                                    })
                                }}
                                required
                                rules={[rulesHelper.requiredRule]}
                            />
                            <ProFormDigit
                                label="Số lượng"
                                name="quantity"
                                width="md"
                                rules={[rulesHelper.requiredRule]}
                            />
                            <ProFormMoney 
                                label="Giá tiền"
                                disabled
                                name="price"
                                fieldProps={{
                                }}
                            />
                            <ProFormDependency name={['quantity', 'price']}>
                                {({ quantity, price }) => (
                                    <ProFormMoney 
                                        label="Thành tiền"
                                        disabled
                                        readonly
                                        width="md"
                                        fieldProps={{
                                            value: (quantity || 0) * (price || 0)
                                        }}
                                    />
                                )}
                            </ProFormDependency>
                            <Form.Item label="&nbsp;">
                                <Popconfirm 
                                    onConfirm={() => action.remove(index)}
                                    title="Xoá sản phẩm này" 
                                    description="Bạn có chắc chắn muốn xoá sản phẩm này không">
                                    <Button 
                                        danger
                                        icon={<DeleteOutlined />} 
                                        className='border-none'
                                    />
                                </Popconfirm>
                            </Form.Item>
                        </ProFormGroup>
                    );
                }}
            </ProFormList>
        </ProFormGroup>
    );
};

export default ConfigProductsForm;