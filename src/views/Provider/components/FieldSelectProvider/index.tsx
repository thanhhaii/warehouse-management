import { ProFormSelect, ProFormSelectProps } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import apiService from "@/services/apiService/apiService";

type FieldSelectProviderProps = ProFormSelectProps;

const FieldSelectProvider: React.FC<FieldSelectProviderProps> = (props) => {
    const [options, setOptions] = useState<ProFormSelectProps['options']>([]);

    // Handler
    // const debounceFetcher = useMemo(() => {
    //     const loadOptions = (value: string) => {
    //         setOptions([]);
    //         setFetching(true);
            
    //         apiService.getListCategory({
    //             desc: true,
    //             metricFilters: [{
    //                 filterField: 'name',
    //                 value: value
    //             }],
    //             pageNumber: 0,
    //             pageSize: 20,
    //             sortField: ''
    //         }).then(resp => {
    //             setFetching(false);
    //             setOptions(resp?.data?.map(cate => ({
    //                 label: cate.name,
    //                 value: cate.id
    //             })));
    //         });

    //     };

    //     return debounce(loadOptions, 500);
    // }, []);

    useEffect(() => {
        apiService.getListSupplier().then(resp => {
            setOptions(resp?.data?.map(sup => ({
                label: sup.name,
                value: sup.id,
            })));
        });
    }, []);

    return (
        <ProFormSelect 
            {...props} 
            fieldProps={{
                ...props.fieldProps,
                // onSearch: debounceFetcher,
                filterOption: false,
                showSearch: true,
            }} 
            options={options}
        />
    );
};

export default FieldSelectProvider;