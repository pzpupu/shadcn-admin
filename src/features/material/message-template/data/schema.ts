import { z } from "zod";

/**
 * 私信模板类型枚举
 */
export const messageTemplateTypeSchema = z.object({
  TEXT: z.literal('文本私信'),
});
export const messageTemplateTypeEnum = messageTemplateTypeSchema.keyof();
export type MessageTemplateTypeEnum = z.infer<typeof messageTemplateTypeEnum>;

/**
 * 私信模板数据模型
 */
export const messageTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  contents: z.array(z.string()),
  type: messageTemplateTypeEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.number(),
  modifiedBy: z.number(),
});
export type MessageTemplate = z.infer<typeof messageTemplateSchema>;

// 私信模板字段名称映射
export const messageTemplateFieldMap: Record<keyof MessageTemplate, string> = {
  id: "ID",
  name: "模板名称",
  contents: "模板内容",
  type: "模板类型",
  createdAt: "创建时间",
  updatedAt: "更新时间",
  createdBy: "创建者",
  modifiedBy: "修改者",
};

/**
 * 创建私信模板表单验证
 */
export const createMessageTemplateSchema = z.object({
  name: z.string().min(1, "模板名称不能为空").max(100, "模板名称最多100个字符"),
  contents: z.array(z.string()).min(1, "至少需要一条模板内容"),
  type: messageTemplateTypeEnum,
});

/**
 * 创建私信模板表单类型
 */
export type CreateMessageTemplateInput = z.infer<typeof createMessageTemplateSchema>;

/**
 * 编辑私信模板表单验证
 */
export const editMessageTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "模板名称不能为空").max(100, "模板名称最多100个字符"),
  contents: z.array(z.string()).min(1, "至少需要一条模板内容"),
  type: z.literal("TEXT"),
});

/**
 * 编辑私信模板表单类型
 */
export type EditMessageTemplateInput = z.infer<typeof editMessageTemplateSchema>;