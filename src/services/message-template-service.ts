import { BaseCrudService } from "./base-curd-service";
import { MessageTemplate } from "@/features/material/message-template/data/schema";

/**
 * 私信模板服务类
 * 继承自基础CRUD服务，提供私信模板相关的操作
 */
class MessageTemplateService extends BaseCrudService<MessageTemplate> {
  constructor() {
    super('material/message-template')
  }
}

export const messageTemplateService = new MessageTemplateService()