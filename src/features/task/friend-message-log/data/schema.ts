import { z } from "zod";
import { httpMessageTaskSchema } from "../../friend-message/data/schema";
import { accountSchema } from "@/features/account/list/data/schema";
import { tiktokFriendSchema } from "@/features/tiktok/friend/data/schema";


export const friendMessageLogSchema = z.object({
  id: z.string(),
  task: httpMessageTaskSchema,
  account: accountSchema,
  friend: tiktokFriendSchema,
  status: z.number(),
  error: z.string(),
  sequence: z.number(),
  proxy: z.string(),
  retryCount: z.number(),
  createdAt: z.date(),
})
export type FriendMessageLog = z.infer<typeof friendMessageLogSchema>;

// 好友私信日志字段名称映射
export const friendMessageLogFieldMap: Record<keyof FriendMessageLog, string> = {
  id: "ID",
  task: "任务",
  account: "账号",
  friend: "好友",
  status: "状态",
  error: "错误",
  sequence: "序号",
  proxy: "代理",
  retryCount: "重试次数",
  createdAt: "创建时间",
}
