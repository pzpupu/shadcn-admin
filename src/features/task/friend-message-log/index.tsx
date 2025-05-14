import DataTableProvider from "@/components/data-table/data-table-context";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ThemeSwitch } from "@/components/theme-switch";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { FriendMessageLog } from "./data/schema";
import { columns } from "./components/columns";
import { FriendMessageLogDataTable } from "./components/table";
import { DataTableToolbar } from "./components/toolbar";


export default function FriendMessageLogPage() {
  return (
    <DataTableProvider>
      <Header fixed hideSpacer>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>任务</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/task/friend-message">好友私信</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>好友私信记录</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>好友私信记录</h2>
            <p className='text-muted-foreground'>
              查看好友私信记录。
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <FriendMessageLogDataTable<FriendMessageLog> columns={columns}  Toolbar={DataTableToolbar}/>
        </div>
      </Main>
    </DataTableProvider>
  )
}