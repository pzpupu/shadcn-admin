import { Header } from "@/components/layout/header";
import { ThemeSwitch } from "@/components/theme-switch";
import DataTableProvider from "@/components/data-table/data-table-context";
import { FriendCollectTask } from "./data/schema";
import { Main } from "@/components/layout/main";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { friendCollectService } from "@/services/froemd-collect-service";
import { FriendCollectPrimaryButtons } from "./components/primary-buttons";
import { FriendCollectDialogs } from "./components/dialogs";
import { DataTableToolbar } from "./components/toolbar";

export type DataTableDialogType = 'create'

/**
 * 粉丝采集任务列表页面
 */
export default function FollowerCollectPage() {
  return (
    <DataTableProvider<FriendCollectTask, DataTableDialogType> >
      <Header fixed hideSpacer>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>好友采集</h2>
            <p className='text-muted-foreground'>
              管理好友采集任务。
            </p>
          </div>
          <FriendCollectPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable<FriendCollectTask> columns={columns} service={friendCollectService} Toolbar={DataTableToolbar} />
        </div>
      </Main>
      <FriendCollectDialogs />
    </DataTableProvider>
  );
} 