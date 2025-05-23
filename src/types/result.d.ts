/**
 * 统一API响应结果类型
 * 
 * @template T 响应数据类型
 */
export interface Result<T> {
    
    /**
     * 响应消息
     */
    message: string;

    /**
     * 响应描述
     */
    desc?: string;

    /**
     * 响应数据
     */
    data?: T;
}

/**
 * 错误响应结果类型
 */
export interface ErrorResult<T> {
    /**
     * 响应消息
     */
    message: string;

    /**
     * 响应数据
     */
    data?: T;
}