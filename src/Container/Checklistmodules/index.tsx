import {
    Switch,
    Route,
    useLocation,
    useRouteMatch
  } from "react-router-dom";
import AddChecklistModuleList from './Component/ChecklistModuleList';
import AddChecklistModule from './Component/AddChecklistModule';

interface Props {
    
}

 const User = (props: Props) => {
  const {path} =  useRouteMatch()
    return (
        <Switch>
        <Route exact path={path} render={()=> <AddChecklistModuleList className='mb-5 mb-xl-8' /> }  />
        <Route path={`${path}/add`} component={AddChecklistModule} />
        <Route path={`${path}/edit/:id`} component={AddChecklistModule} />
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