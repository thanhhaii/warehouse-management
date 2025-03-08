import { ProCard } from '@ant-design/pro-components';
import { Descriptions } from 'antd';
import React, { lazy } from 'react';

const ModalChangePassword = lazy(() => import('./components/ModalChangePassword'));

const ProfilePage: React.FunctionComponent = () => {
    return (
        <ProCard
            extra={<ModalChangePassword />}
            title="Thông tin tài khoản"
        >
            <Descriptions
                items={[
                    { label: 'Họ và tên', children: '' },
                    { label: 'Email', children: '' },
                    { label: 'Số điện thoại', children: '' },
                    { label: 'Địa chỉ', children: '' },
                    { label: 'Ngày sinh', children: '' },
                    { label: 'Giới tính', children: '' },
                    { label: 'Quyền', children: '' },
                ]}
            />
        </ProCard>
    );
};

export default ProfilePage;