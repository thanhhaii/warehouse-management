import { Column } from '@ant-design/plots';

const RevenueChart = () => {
    const config = {
        data: {
            type: 'fetch',
            value: 'https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json',
        },
        xField: '月份',
        yField: '月均降雨量',
        colorField: 'name',
        group: true,
        style: {
            inset: 5,
        },
        height: 300,
        onReady: ({ chart }: any) => {
            try {
                chart.on('afterrender', () => {
                    chart.emit('legend:filter', {
                        data: { channel: 'color', values: ['London'] },
                    });
                });
            } catch (e) {
                console.error(e);
            }
        },
    };
    return <Column {...config} />;
};

export default RevenueChart;