// Vendor
import { ProTable } from "@ant-design/pro-components";

// Src
import ModalConfigAccount from "@/views/Account/components/ModalConfigAccount/ModalConfigAccount.tsx";
import useGetListAccountQuery from "@/views/Account/hooks/useGetListAccountQuery.ts";
import useAccountColumns from "@/views/Account/hooks/useAccountColumns.tsx";

const AccountPage: React.FunctionComponent = () => {
    const columns = useAccountColumns();

    // Hooks
    const accountQuery = useGetListAccountQuery({
        pageNumber: 0,
        pageSize: 1000
    });

    return (
        <ProTable
            size="small"
            dataSource={accountQuery?.data ?? []}
            bordered
            rowKey="id"
            columns={columns}
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
