import React from 'react'

import {
    BrowserRouter,
    Switch,
    Route,
    useLocation,
    Link,
    useRouteMatch
  } from "react-router-dom";
import UserList from './Component/UserList';
import AddUser from './Component/AddUser';

interface Props {
    
}

 const User = (props: Props) => {
  const {path} =  useRouteMatch()
     console.log(useLocation(), "useRouteMatch",useRouteMatch())
    return (
        <Switch>
        <Route exact path={path} render={()=> <UserList className='mb-5 mb-xl-8' /> }  />
        <Route path={`${path}/addUser`} component={AddUser} />
        <Route path={`${path}/editUser/:id`} component={AddUser} />
        {/* <Route
          path="/users/:id"
          render={({ match }) => (
            <User id={match.params.id} />
          )}
        /> */}
      </Switch>
    )
}
export default User