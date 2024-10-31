type MetricFilter = { 
    filterField: string;
    value: string;
};

export function buildMetricFilter(params?: Record<string, string | number>): MetricFilter[] { 
    if(!params || Object.keys(params)?.length === 0){
        return [];
    }

    return Object.keys(params).filter(key => !!params[key]).map((key) => ({
        filterField: key,
        value: params[key]?.toString()
    }));
}