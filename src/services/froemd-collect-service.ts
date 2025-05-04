import { BaseCrudService } from "./base-curd-service";
import { CreateCollectFollowerTaskInput, FriendCollectTask } from "@/features/task/friend-collect/data/schema";
import axios from "@/lib/axios";

/**
 * 粉丝采集任务服务类
 * 继承自基础CRUD服务，提供粉丝采集任务相关的操作
 */
class FriendCollectService extends BaseCrudService<FriendCollectTask> {
  constructor() {
    super('task/friendCollect')
  }
  
  /**
   * 创建粉丝采集任务
   * @param form 创建任务的表单数据
   * @returns 创建的任务对象
   */
  async createTask(form: CreateCollectFollowerTaskInput) {
    return await axios.post<FriendCollectTask>(`${this.path}`, form);
  }
}

export const friendCollectService = new FriendCollectService() 