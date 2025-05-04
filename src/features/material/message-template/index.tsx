import { Header } from "@/components/layout/header";
import { ThemeSwitch } from "@/components/theme-switch";
import DataTableProvider from "@/components/data-table/data-table-context";
import { MessageTemplate } from "./data/schema";
import { Main } from "@/components/layout/main";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { messageTemplateService } from "@/services/message-template-service";
import { MessageTemplatePrimaryButtons } from "./components/primary-buttons";
import { MessageTemplateDialogs } from "./components/dialogs";
import { DataTableToolbar } from "./components/toolbar";

type DataTableDialogType = 'create' | 'edit'

/**
 * 私信模板管理页面
 */
export default function MessageTemplatePage() {
  return (
    <DataTableProvider<MessageTemplate, DataTableDialogType> >
      <Header fixed hideSpacer>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>私信模板</h2>
            <p className='text-muted-foreground'>
              创建和管理私信模板，用于快速发送私信内容。
            </p>
          </div>
          <MessageTemplatePrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable<MessageTemplate> columns={columns} service={messageTemplateService} Toolbar={DataTableToolbar} />
        </div>
      </Main>
      <MessageTemplateDialogs />
    </DataTableProvider>
  );
} 