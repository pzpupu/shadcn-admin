import {BaseCrudService} from "./base-curd-service";
import {CreateHttpMessageTaskInput, HttpMessageTask} from "@/features/task/friend-message/data/schema";
import axios from "@/lib/axios";
import {QueryFunctionContext} from "@tanstack/react-query";
import {ColumnFiltersState, PaginationState, SortingState} from "@tanstack/react-table";

/**
 * 好友私信任务服务类
 * 继承自基础CRUD服务，提供好友私信任务相关的操作
 */
class HttpMessageTaskService extends BaseCrudService<HttpMessageTask> {
    constructor() {
        super('task/httpMessage')
    }

    /**
     * 创建好友私信任务
     * @param form 创建任务的表单数据
     * @returns 创建的任务对象
     */
    async createTask(form: CreateHttpMessageTaskInput) {
        return await axios.post<HttpMessageTask>(`${this.path}`, form);
    }

    async logsPage(context: QueryFunctionContext<readonly unknown[], never>) {
        const pageable = context.queryKey[1] as PaginationState
        const filters = (context.queryKey[2] as ColumnFiltersState).reduce((acc, filter) => {
            return {...acc, [filter.id]: filter.value}
        }, {})
        const sorting = (context.queryKey[3] as SortingState)
        const sort = sorting.length > 0
            ? sorting.map((sort) => `${sort.id},${sort.desc ? 'desc' : 'asc'}`)
            : undefined
        // 发送请求
        const response = await axios.get(context.queryKey[0] as string, {
            params: {
                ...pageable,
                ...filters,
                sort
            }
        })
        return response.data
    }

      /**
   * 停止任务
   * @param id 任务ID
   */
  async stopTask(id: string) {
    const response = await axios.put(`${this.path}/${id}/stop`)
    return response.data
  }

}

export const httpMessageTaskService = new HttpMessageTaskService() 