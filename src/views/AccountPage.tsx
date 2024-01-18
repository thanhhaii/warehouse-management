import { ProTable } from "@ant-design/pro-components";
import { accountTableConfig } from "../helpers/accountTableConfig.tsx";

const AccountPage: React.FunctionComponent = () => {
    return (
        <ProTable
            columns={accountTableConfig}
            search={{
                labelWidth: 'auto'
            }}
        />
    );
};

export default AccountPage;
