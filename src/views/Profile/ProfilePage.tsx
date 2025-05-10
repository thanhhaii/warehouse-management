import apiService from '@/services/apiService/apiService';
import { ProCard } from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import { Descriptions } from 'antd';
import React, { lazy } from 'react';

const ModalChangePassword = lazy(() => import('./components/ModalChangePassword'));

const ProfilePage: React.FunctionComponent = () => {
    const { data: userProfile } = useQuery({
        queryKey: ['userProfile'],
        queryFn: () => apiService.getUserProfile(),
    });


    return (
        <ProCard
            extra={<ModalChangePassword />}
            title="Thông tin tài khoản"
        >
            <Descriptions
                items={[
                    { label: 'Họ và tên', children: userProfile?.fullName },
                    { label: 'Email', children: userProfile?.email },
                    { label: 'Số điện thoại', children: userProfile?.phoneNumber },
                    { label: 'Địa chỉ', children: userProfile?.address },
                ]}
            />
        </ProCard>
    );
};

export default ProfilePage;