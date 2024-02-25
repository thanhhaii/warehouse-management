// Vendor
import { ProTable } from "@ant-design/pro-components";

// Src
import { accountTableConfig } from "./helpers/accountTableConfig.tsx";
import ModalConfigAccount from "@/views/Account/components/ModalConfigAccount/ModalConfigAccount.tsx";
import useGetListAccountQuery from "@/views/Account/hooks/useGetListAccountQuery.ts";

const AccountPage: React.FunctionComponent = () => {
    // Hooks
    const accountQuery = useGetListAccountQuery({
        pageNumber: 0,
        pageSize: 1000
    });

    return (
        <ProTable
            dataSource={accountQuery?.data ?? []}
            bordered
            rowKey="id"
            columns={accountTableConfig}
            search={{
                labelWidth: 'auto'
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
