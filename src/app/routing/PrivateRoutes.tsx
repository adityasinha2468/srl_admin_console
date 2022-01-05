import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import User from '../../Container/User/index'
import Department from '../../Container/Department/index'
import Collectioncenter from '../../Container/Collectioncenter/index'
import Centertype from '../../Container/Centertype/index'
import Checklistmodules from '../../Container/Checklistmodules/index'
import Checklist from '../../Container/Checklist'
import Audit from '../../Container/Audit'


import {MenuTestPage} from '../pages/MenuTestPage'

export function PrivateRoutes() {
  // const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  // const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  // const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  // const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  // const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  // const User = lazy(() => import('../../Container/User/index'))
  // const Department = lazy(() => import('../../Container/Department/index'))
  // const Collectioncenter = lazy(() => import('../../Container/Collectioncenter/index'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/user' component={User} />
        <Route path='/department' component={Department} />
        <Route path='/collectioncenter' component={Collectioncenter} />
        <Route path='/centertype' component={Centertype} />
        <Route path='/modules' component={Checklistmodules} />
        <Route path='/checklist' component={Checklist} />
        <Route path='/audit' component={Audit} />
        {/* <Route path='/crafted/pages/profile' component={ProfilePage} /> */}

        {/* <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} /> */}
        <Route path='/crafted/widgets' component={WidgetsPage} />
        {/* <Route path='/crafted/account' component={AccountPage} />
        <Route path='/apps/chat' component={ChatPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
        <Redirect to='error/404' /> */}
      </Switch>
    </Suspense>
  )
}
