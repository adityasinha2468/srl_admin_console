import {
    Switch,
    Route,
    useLocation,
    useRouteMatch
  } from "react-router-dom";
import CentertypeList from './Component/CentertypeList';
import AddCentertype from './Component/AddCentertype';

interface Props {
    
}

 const User = (props: Props) => {
  const {path} =  useRouteMatch()
    return (
        <Switch>
        <Route exact path={path} render={()=> <CentertypeList className='mb-5 mb-xl-8' /> }  />
        <Route path={`${path}/addCentertype`} component={AddCentertype} />
        <Route path={`${path}/editCentertype/:id`} component={AddCentertype} />
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