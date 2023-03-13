
export interface ResponsePagination  {
    docs: any[];
    totalDocs?: number;
    limit?: number;
    totalPages?: number;
    page?: number;
    pagingCounter?: number;
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    prevPage: any;
    nextPage: number;
    sum?: number;
}

