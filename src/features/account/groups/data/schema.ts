import { z } from 'zod'

// 账号组数据模型
export const accountGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  region: z.string(),
  description: z.string(),
  accountCount: z.number(),
  totalFollowing: z.number(),
  totalFollowers: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
})
export type AccountGroup = z.infer<typeof accountGroupSchema>

// 账号组字段名称映射
export const accountGroupFieldMap: Record<keyof AccountGroup, string> = {
  id: "ID",
  name: "名称",
  region: "地区",
  description: "描述",
  accountCount: "账号数量",
  totalFollowing: "关注总数",
  totalFollowers: "粉丝总数",
  createdAt: "创建时间",
  updatedAt: "更新时间",
}

// 账号组列表模型
export const accountGroupListSchema = z.array(accountGroupSchema)

// 创建账号组请求数据模型
export const createAccountGroupSchema = z.object({
  name: z.string().min(2, "名称至少需要2个字符"),
  description: z.string(),
  region: z.string(),
})
export type CreateAccountGroupInput = z.infer<typeof createAccountGroupSchema>

// 更新账号组请求数据模型
export const updateAccountGroupSchema = createAccountGroupSchema.extend({
  id: z.string(),
})
export type UpdateAccountGroupInput = z.infer<typeof updateAccountGroupSchema> 