import { ProFormSelect, ProFormSelectProps } from "@ant-design/pro-components";
import { useEffect, useMemo, useState } from "react";
import debounce from 'lodash/debounce';
import apiService from "@/services/apiService/apiService";
import { Spin } from "antd";

type FieldSelecteCategoryProps = ProFormSelectProps;

const FieldSelecteCategory: React.FC<FieldSelecteCategoryProps> = (props) => {
    const [isFetching, setFetching] = useState<boolean>(false);
    const [options, setOptions] = useState<ProFormSelectProps['options']>([]);

    // Handler
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            setOptions([]);
            setFetching(true);
            
            apiService.getListCategory({
                desc: true,
                metricFilters: [{
                    filterField: 'name',
                    value: value
                }],
                pageNumber: 0,
                pageSize: 20,
                sortField: ''
            }).then(resp => {
                setFetching(false);
                setOptions(resp?.data?.map(cate => ({
                    label: cate.name,
                    value: cate.id
                })));
            });

        };

        return debounce(loadOptions, 500);
    }, []);

    useEffect(() => {
        apiService.getListCategory({
            desc: true,
            metricFilters: [],
            pageNumber: 0,
            pageSize: 20,
            sortField: ''
        }).then(resp => {
            setFetching(false);
            setOptions(resp?.data?.map(cate => ({
                label: cate.name,
                value: cate.id
            })));
        });
    }, []);

    return (
        <ProFormSelect 
            {...props} 
            fieldProps={{
                ...props.fieldProps,
                onSearch: debounceFetcher,
                filterOption: false,
                showSearch: true,
                notFoundContent: isFetching ? <Spin size="small" /> : null,
            }} 
            options={options}
        />
    );
};

export default FieldSelecteCategory;