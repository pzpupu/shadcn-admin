import { accountGroupSchema } from "@/features/account/groups/data/schema";
import { taskStatusEnum, taskStatusSchema } from "@/types/task-status";
import { z } from "zod";

/**
 * 好友私信任务类型
 */
export const httpMessageTaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  group: accountGroupSchema,
  total: z.number(),
  success: z.number(),
  failed: z.number(),
  status: taskStatusEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.number(),
  modifiedBy: z.number(),
})
export type HttpMessageTask = z.infer<typeof httpMessageTaskSchema>;

// 好友私信任务字段名称映射
export const httpMessageTaskFieldMap: Record<keyof HttpMessageTask, string> = {
  id: "ID",
  name: "任务名称",
  description: "任务描述",
  group: "账号组",
  total: "总数",
  success: "成功数",
  failed: "失败数",
  status: "任务状态",
  createdAt: "创建时间",
  updatedAt: "更新时间",
  createdBy: "创建者",
  modifiedBy: "修改者",
}

/**
 * 创建好友私信任务表单验证
 */
export const createHttpMessageTaskSchema = z.object({
  name: z.string().min(1, "任务名称不能为空").max(100, "任务名称最多100个字符"),
  description: z.string().max(500, "任务描述最多500个字符").optional(),
  groupId: z.string({ required_error: "请选择账号组" }),
  templateId: z.string({ required_error: "请选择模板" }),
  interval: z.number().default(0),
  regions: z.array(z.string()).default([]),
});

/**
 * 创建好友私信任务表单类型
 */
export type CreateHttpMessageTaskInput = z.infer<typeof createHttpMessageTaskSchema>; 