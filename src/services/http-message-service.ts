import { BaseCrudService } from "./base-curd-service";
import { CreateHttpMessageTaskInput, HttpMessageTask } from "@/features/task/friend-message/data/schema";
import axios from "@/lib/axios";

/**
 * 好友私信任务服务类
 * 继承自基础CRUD服务，提供好友私信任务相关的操作
 */
class HttpMessageService extends BaseCrudService<HttpMessageTask> {
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
}

export const httpMessageService = new HttpMessageService() 