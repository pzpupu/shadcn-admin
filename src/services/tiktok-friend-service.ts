import { BaseCrudService } from "./base-curd-service";
import { TiktokFriend } from "@/features/tiktok/friend/data/schema";

class TiktokFriendService extends BaseCrudService<TiktokFriend> {
  constructor() {
    super('tiktok/friend')
  }
}

export default new TiktokFriendService();