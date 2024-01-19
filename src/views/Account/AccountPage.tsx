import { ProTable } from "@ant-design/pro-components";
import { accountTableConfig } from "./helpers/accountTableConfig.tsx";
import ModalConfigAccount from "@/views/Account/components/ModalConfigAccount/ModalConfigAccount.tsx";

const AccountPage: React.FunctionComponent = () => {
    return (
        <ProTable
            columns={accountTableConfig}
            search={{
                labelWidth: 'auto'
            }}
            toolBarRender={() => [
                <ModalConfigAccount />
            ]}
        />
    );
};

export default AccountPage;
