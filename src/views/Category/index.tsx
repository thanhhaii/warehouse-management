import { ProTable } from "@ant-design/pro-components";
import { useCallback, useState } from "react";
import ModalCreateCategory from "./components/ModalCreateCategory";
import useGetListCategoryQuery from "./hooks/useGetListCategoryQuery";
import useColumnsTableCategory from "./hooks/useColumnsTableCategory";
import { CategoryItem } from "./types/categoryModels";

const CategoryPage: React.FunctionComponent = () => {
    // States
    const [searchName, setSearchName] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [categorySelected, setCategorySelected] = useState<CategoryItem>();

    // Hooks
    const getListCategory = useGetListCategoryQuery(searchName);

    // Handler
    const handleUpdateCategory = useCallback((category: CategoryItem) => {
        setOpenModal(true);
        setCategorySelected(category);
    }, []);

    const handleOpenChange = useCallback((open: boolean) => {
        setOpenModal(open);
        !open && setCategorySelected(undefined);
    }, []);

    const handleRequest = useCallback(async ({ name }: Record<string, any>) => {
        setSearchName(name || '');

        return {
            data: []
        };
    }, []);

    return (
        <>
            <ProTable
                rowKey="id"
                dataSource={getListCategory.data?.sort((first, next) => first.id - next.id) || []}
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
                size="small"
                options={{
                    reload: () => getListCategory.refetch()
                }}
                toolBarRender={() => [
                    <ModalCreateCategory 
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