import { ProFormSelect, ProFormSelectProps } from "@ant-design/pro-components";
import { useEffect, useMemo, useState } from "react";
import apiService from "@/services/apiService/apiService";
import { buildMetricFilter } from "@/helpers/objectHelper.ts";
import { GetListFilterPayload } from "@/services/apiService/requestTypes.ts";
import debounce from "lodash/debounce";

type FieldSelectProviderProps = ProFormSelectProps;

const FieldSelectProvider: React.FC<FieldSelectProviderProps> = (props) => {
    const [options, setOptions] = useState<ProFormSelectProps['options']>([]);
    const [defaulFilter, setDefaulFilter] = useState<GetListFilterPayload>({
        desc: false,
        metricFilters: buildMetricFilter({
        }),
        pageNumber: 0,
        pageSize: 100,
        sortField: 'createDate'
    });
    const [isFetching, setFetching] = useState<boolean>(false);

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
        apiService.getListSupplier(defaulFilter).then(resp => {
            setOptions(resp?.data?.data?.map(sup => ({
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
                onSearch: debounceFetcher,
                filterOption: false,
                showSearch: true,
                loading: isFetching
            }}
            options={options}
        />
    );
};

export default FieldSelectProvider;
