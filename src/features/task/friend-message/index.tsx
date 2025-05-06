import { Header } from "@/components/layout/header";
import { ThemeSwitch } from "@/components/theme-switch";
import DataTableProvider from "@/components/data-table/data-table-context";
import { HttpMessageTask } from "./data/schema";
import { Main } from "@/components/layout/main";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { httpMessageTaskService } from "@/services/http-message-service";
import { FriendMessagePrimaryButtons } from "./components/primary-buttons";
import { FriendMessageDialogs } from "./components/dialogs";
import { DataTableToolbar } from "./components/toolbar";

type DataTableDialogType = 'create'

/**
 * 好友私信任务列表页面
 */
export default function FriendMessagePage() {
  return (
    <DataTableProvider<HttpMessageTask, DataTableDialogType> >
      <Header fixed hideSpacer>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>好友私信</h2>
            <p className='text-muted-foreground'>
              管理好友私信任务。
            </p>
          </div>
          <FriendMessagePrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable<HttpMessageTask> columns={columns} service={httpMessageTaskService} Toolbar={DataTableToolbar} />
        </div>
      </Main>
      <FriendMessageDialogs />
    </DataTableProvider>
  );
}