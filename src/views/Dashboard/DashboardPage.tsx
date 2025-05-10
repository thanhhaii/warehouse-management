import { ProCard } from '@ant-design/pro-components';
import { Col, Row } from 'antd';
import React from 'react';
import RevenueChart from './RevenueChart';

const DashboardPage: React.FunctionComponent = () => {
    return (
        <Row gutter={[24,24]}>
            <Col span={12}>
                <ProCard title="Doanh thu">
                    <RevenueChart />
                </ProCard>
            </Col>
            <Col span={12}>
                <ProCard title="Số lượng đơn hàng">
                    <RevenueChart />
                </ProCard>
            </Col>
        </Row>
    );
};

export default DashboardPage;