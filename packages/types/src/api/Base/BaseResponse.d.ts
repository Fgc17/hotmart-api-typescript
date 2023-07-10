

/**
 * Pagination information that comes with big API responses
 * 
 * @example 
    ```json
     {
      "total_results": 30,
      "next_page_token": "05b60506b659c1c6e728db93eada6271e3adcfb4edf507b679874458e31577b3",
      "prev_page_token": "cf1fg8bd082e2864069035c057eca0bac7eb5d604719c5a76e80f0933f49c217",
      "results_per_page": 10
     }
    ```
 *
 */
interface PageInfo {
    total_results: number,
    next_page_token: string,
    prev_page_token: string,
    results_per_page: number
}

/** 
 * Describes common keys along all API responses
 */
export default interface BaseResponse<T> {
    items: T,
    page_info: PageInfo
}