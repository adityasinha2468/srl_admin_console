import React from 'react';



import {
    BrowserRouter,
    Switch,
    Route,
    useLocation,
    Link,
    useRouteMatch
  } from "react-router-dom";
import DepartmentList from './DepartmentList';
import AddDepartment from './AddDepartment';

interface Props {
    
}

 const Department = (props: Props) => {
  const {path} =  useRouteMatch()
     console.log(useLocation(), "useRouteMatch",useRouteMatch())
    return (
        <Switch>
        <Route exact path={path} render={()=> <DepartmentList className='mb-5 mb-xl-8' /> }  />
        <Route path={`${path}/addDepartment`} component={AddDepartment} />
        <Route path={`${path}/editDepartment/:id`} component={AddDepartment} />
        {/* <Route
          path="/users/:id"
          render={({ match }) => (
            <User id={match.params.id} />
          )}
        /> */}
      </Switch>
    )
}
    
export default Department;
