// Vendor
import { ProTable } from "@ant-design/pro-components";

// Src
import ModalConfigAccount from "@/views/Account/components/ModalConfigAccount/ModalConfigAccount.tsx";
import useGetListAccountQuery from "@/views/Account/hooks/useGetListAccountQuery.ts";
import useAccountColumns from "@/views/Account/hooks/useAccountColumns.tsx";
import { useCallback, useEffect, useState } from "react";
import { AccountModel } from "@/types/accountModels.ts";
import stringHelpers from "@/helpers/stringHelper.ts";
import { ActionEnum } from "@/enums/commonEnum";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

type AccountRequestObjectKey = Partial<{
    searchFullName?: string;
    searchPhone?: string;
    searchAddress?: string;
    searchEmail?: string;
    searchRole?: 'ADMIN_ROLE' | 'STAFF_ROLE'
}>;

type DataModelType = {
    data?: AccountModel;
    action: ActionEnum;
};

const AccountPage: React.FunctionComponent = () => {
    // States
    const [open, setOpen] = useState<boolean>(false);
    const [dataModel, setDataModel] = useState<DataModelType>({
        action: ActionEnum.VIEW
    });
    const [dataSource, setDataSource] = useState<AccountModel[]>([]);

    // Hooks
    const accountQuery = useGetListAccountQuery({
        pageNumber: 0,
        pageSize: 1000
    });

    // Handler
    const handleCreateAccount = useCallback(() => {
        setOpen(true);
        setDataModel({
            action: ActionEnum.CREATE,
            data: undefined,
        });
    }, []);

    const handleUpdateAccount = useCallback((data: AccountModel) => {
        setOpen(true);
        setDataModel({
            data,
            action: ActionEnum.UPDATE,
        });
    }, []);

    const handleViewAccount = useCallback((data: AccountModel) => {
        setOpen(true);
        setDataModel({
            data,
            action: ActionEnum.VIEW,
        });
    }, []);

    const request = useCallback(async (data: AccountRequestObjectKey) => {
        const dataFiltered = accountQuery?.data?.filter(account => {
            if(!stringHelpers.isIncludeText(account.fullName, data.searchFullName)){
                return false;
            }
            if(!stringHelpers.isIncludeText(account.email, data.searchEmail)){
                return false;
            }

            if(!stringHelpers.isIncludeText(account.address, data.searchAddress)){
                return false;
            }

            if(!stringHelpers.isIncludeText(account.phoneNumber, data.searchPhone)){
                return false;
            }

            return !(data.searchRole && account?.roles?.[0].name !== data?.searchRole);
        });

        setDataSource(dataFiltered ?? []);
        return {};
    }, [accountQuery.data]);

    // UseEffect
    useEffect(() => {
        if(accountQuery.data){
            setDataSource(accountQuery.data);
        }
    }, [accountQuery.data]);

    return (
        <>
            <ProTable<AccountModel, AccountRequestObjectKey>
                size="small"
                loading={accountQuery.isFetching}
                request={request}
                dataSource={dataSource}
                bordered
                rowKey="id"
                columns={ useAccountColumns({
                    onUpdate: handleUpdateAccount,
                    onView: handleViewAccount
                })}
                search={{
                    labelWidth: 'auto',
                    defaultCollapsed: false
                }}
                toolBarRender={() => [
                    <Button
                        key="create button"
                        onClick={handleCreateAccount}
                        type="primary"
                        icon={<PlusOutlined /> }
                    >
                        Tạo tài khoản
                    </Button>
                ]}
                pagination={{
                    defaultPageSize: 10,
                    hideOnSinglePage: true
                }}
                options={{
                    density: false,
                    reload: () => accountQuery.refetch(),
                    setting: false
                }}
            />
            <ModalConfigAccount open={open}
                setOpen={setOpen}
                action={dataModel.action}
                data={dataModel?.data}
            />
        </>
    );
};

export default AccountPage;
