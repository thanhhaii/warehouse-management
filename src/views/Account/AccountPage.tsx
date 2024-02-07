import { ProTable } from "@ant-design/pro-components";
import { accountTableConfig } from "./helpers/accountTableConfig.tsx";
import ModalConfigAccount from "@/views/Account/components/ModalConfigAccount/ModalConfigAccount.tsx";
// import useGetListAccountQuery, { GetListAccountQueryProps } from "@/views/Account/hooks/useGetListAccountQuery.ts";
// import { useCallback, useState } from "react";

const AccountPage: React.FunctionComponent = () => {
    // States
    // const [queryState, setQueryState] = useState<GetListAccountQueryProps>({
    //     pageSize: 1,
    //     pageNumber: 0
    // });

    // Hooks
    // const accountQuery = useGetListAccountQuery(queryState);

    // Handler
    // const request = useCallback(async ({ current, pageSize }: any) => {
    //     setQueryState({
    //         pageSize: pageSize,
    //         pageNumber: current - 1
    //     });
    //
    //     return {
    //         success: true,
    //         data: []
    //     };
    // }, [accountQuery]);

    return (
        <ProTable
            // request={request}
            // dataSource={accountQuery?.data ?? []}
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
                pageSize: 1,
            }}
        />
    );
};

export default AccountPage;
