import { ActionType, ProTable } from "@ant-design/pro-components";
import { useCallback, useRef, useState } from "react";
import ModalCreateCategory from "./components/ModalCreateCategory";
import useColumnsTableCategory from "./hooks/useColumnsTableCategory";
import { CategoryItem } from "./types/categoryModels";
import apiService from "@/services/apiService/apiService";
import { buildMetricFilter } from "@/helpers/objectHelper";

const CategoryPage: React.FunctionComponent = () => {
    // States
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [categorySelected, setCategorySelected] = useState<CategoryItem>();
    const actionRef = useRef<ActionType>(null);

    // Handler
    const handleUpdateCategory = useCallback((category: CategoryItem) => {
        setOpenModal(true);
        setCategorySelected(category);
    }, []);

    const handleOpenChange = useCallback((open: boolean) => {
        setOpenModal(open);
        !open && setCategorySelected(undefined);
    }, []);

    const handleRequest = useCallback(async ({ current, pageSize, id, name, categoryCode, createdBy }: any) => {
        const resp = await apiService.getListCategory({
            desc: false,
            metricFilters: buildMetricFilter({
                id, 
                name, 
                categoryCode, 
                createdBy
            }),
            pageNumber: current - 1,
            pageSize: pageSize || 10,
            sortField: 'createDate'
        });

        return {
            data: resp.data,
            success: true,
            total: resp.totalItems,
        };
    }, []);

    return (
        <>
            <ProTable
                rowKey="id"
                columns={useColumnsTableCategory({
                    onUpdate: handleUpdateCategory
                })}
                search={{
                    labelWidth: 'auto'
                }}
                request={handleRequest}
                pagination={{
                    hideOnSinglePage: true,
                }}
                scroll={{
                    x: 'max-content'
                }}
                size="small"
                options={{
                    setting: false,
                    density: false,
                }}
                actionRef={actionRef}
                toolBarRender={() => [
                    <ModalCreateCategory 
                        onReloadList={() => actionRef.current?.reload()}
                        open={openModal} 
                        key="ModalConfig" 
                        onOpenChange={handleOpenChange} 
                        dataUpdate={categorySelected}
                    />
                ]}
            />
        </>
    );
};

export default CategoryPage;