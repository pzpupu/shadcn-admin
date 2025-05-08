import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import UsersProvider from './context/users-context'
import { User } from './data/schema'
import { DataTable } from '@/components/data-table'
import { userService } from '@/services/user-service'

export default function Users() {

  return (
    <UsersProvider>
      <Header fixed hideSpacer>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>用户列表</h2>
            <p className='text-muted-foreground'>
              系统用户管理.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable<User> columns={columns} service={userService} />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
