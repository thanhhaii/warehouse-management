// Vendor
import { ProTable } from "@ant-design/pro-components";

// Src
import ModalConfigAccount from "@/views/Account/components/ModalConfigAccount/ModalConfigAccount.tsx";
import useGetListAccountQuery from "@/views/Account/hooks/useGetListAccountQuery.ts";
import useAccountColumns from "@/views/Account/hooks/useAccountColumns.tsx";
import { useCallback, useEffect, useState } from "react";
import { AccountModel } from "@/types/accountModels.ts";
import stringHelpers from "@/helpers/stringHelper.ts";

type AccountRequestObjectKey = Partial<{
    searchFullName?: string;
    searchPhone?: string;
    searchAddress?: string;
    searchEmail?: string;
    searchRole?: 'ADMIN_ROLE' | 'STAFF_ROLE'
}>;

const AccountPage: React.FunctionComponent = () => {
    const [dataSource, setDataSource] = useState<AccountModel[]>([]);

    // Hooks
    const columns = useAccountColumns();
    const accountQuery = useGetListAccountQuery({
        pageNumber: 0,
        pageSize: 1000
    });

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

            if(!stringHelpers.isIncludeText(account.phone, data.searchPhone)){
                return false;
            }

            return !(data.searchRole && account?.roles?.[0].role !== data?.searchRole);
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
        <ProTable<AccountModel, AccountRequestObjectKey>
            size="small"
            request={request}
            dataSource={dataSource}
            bordered
            rowKey="id"
            columns={columns}
            search={{
                labelWidth: 'auto',
                defaultCollapsed: false
            }}
            toolBarRender={() => [
                <ModalConfigAccount />
            ]}
            pagination={{
                defaultPageSize: 10,
                hideOnSinglePage: true
            }}
        />
    );
};

export default AccountPage;
