

/**
 * Describes common keys along all API requests
 */
export default interface BaseRequest<T> {
    select?: Array<keyof T>
    max_results?: number
    page_token?: string
}