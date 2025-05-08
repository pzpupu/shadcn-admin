import { z } from 'zod'

/**
 * 用户角色
 */
export const UserRole = z.object({
  ADMIN: z.literal('管理员'),
  USER: z.literal('用户'),
})
export const UserRoleEnum = UserRole.keyof()
export type UserRoleEnum = z.infer<typeof UserRoleEnum>

export const UserProxySchema = z.object({
  proxyHost: z.string(),
  proxyPort: z.number(),
  username: z.string(),
  password: z.string(),
})
export type UserProxy = z.infer<typeof UserProxySchema>

/**
 * 用户数据模型
 */
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  nickname: z.string(),
  avatar: z.string(),
  enabled: z.boolean(),
  locked: z.boolean(),
  expired: z.boolean(),
  credentialsExpired: z.boolean(),
  role: UserRole,
  proxy: UserProxySchema,
  lastLoginAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

// 用户字段名称映射
export const userFieldMap: Record<keyof User, string> = {
  id: "ID",
  username: "用户名",
  nickname: "昵称",
  avatar: "头像",
  enabled: "状态",
  locked: "锁定",
  expired: "过期",
  credentialsExpired: "凭证过期",
  role: "角色",
  proxy: "代理",
  lastLoginAt: "最后登录时间",
  createdAt: "创建时间",
}

