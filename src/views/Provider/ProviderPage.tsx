import { ProTable } from "@ant-design/pro-components";
import useColumnsTableProvider from "./hooks/useColumnsTableProvider";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const ProviderPage: React.FunctionComponent = () => {
    const columns = useColumnsTableProvider();

    return (
        <ProTable 
            columns={columns}
            size="small"
            search={{
                labelWidth: 'auto'
            }}
            toolBarRender={() => [
                <NavLink to="/provider/create" >
                    <Button 
                        icon={<PlusOutlined />}
                        children="Thêm nhà cung cấp" 
                        type="primary"
                    />
                </NavLink>
            ]}
        />
    );
};

export default ProviderPage;