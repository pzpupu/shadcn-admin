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
  proxyPort: z.string(),
  proxyUsername: z.string(),
  proxyPassword: z.string(),
})
export type UserProxy = z.infer<typeof UserProxySchema>

/**
 * 用户数据模型
 */
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string(),
  enabled: z.boolean(),
  locked: z.boolean(),
  expired: z.boolean(),
  credentialsExpired: z.boolean(),
  role: UserRoleEnum,
  proxy: UserProxySchema,
  quota: z.string(),
  lastLoginAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

// 用户字段名称映射
export const userFieldMap: Record<keyof User, string> = {
  id: "ID",
  username: "用户名",
  // nickname: "昵称",
  avatar: "头像",
  enabled: "状态",
  locked: "锁定",
  expired: "过期",
  credentialsExpired: "凭证过期",
  role: "角色",
  proxy: "代理",
  quota: "账号配额",
  lastLoginAt: "最后登录时间",
  createdAt: "创建时间",
}

// 创建用户表单
export const createUserFormSchema = z.object({
  username: z.string().min(1, { message: '用户名不能为空' }),
  password: z.string().min(5, { message: '密码不能少于5个字符' }),
  enabled: z.boolean(),
  role: UserRoleEnum,
  proxy: UserProxySchema,
  quota: z.string(),
})
export type CreateUserForm = z.infer<typeof createUserFormSchema>

// 更新用户表单
export const updateUserFormSchema = createUserFormSchema.extend({
  id: z.string(),
})
export type UpdateUserForm = z.infer<typeof updateUserFormSchema>
