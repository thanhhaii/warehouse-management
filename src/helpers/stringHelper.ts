const isIncludeText = (fullText: string, searchText?: string): boolean => {
    if(!searchText){
        return true;
    }

    return fullText?.toLowerCase().includes(searchText?.toLowerCase());
};

const stringHelpers = {
    isIncludeText
};

export default stringHelpers;
