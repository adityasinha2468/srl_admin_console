import React from 'react';

import {
    BrowserRouter,
    Switch,
    Route,
    useLocation,
    Link,
    useRouteMatch
  } from "react-router-dom";
import CollectioncenterList from './CollectioncenterList';
import AddCollectioncenter from './AddCollectioncenter';
import EditCollectioncenter from './EditCollectionCenter';

interface Props {
    
}

 const Collectioncenter = (props: Props) => {
  const {path} =  useRouteMatch()
     console.log(useLocation(), "useRouteMatch",useRouteMatch())
    return (
        <Switch>
        <Route exact path={path} render={()=> <CollectioncenterList className='mb-5 mb-xl-8' /> }  />
        <Route path={`${path}/addCollectioncenter`} component={AddCollectioncenter} />
        <Route path={`${path}/editCollectioncenter/:id`} component={EditCollectioncenter} />
        {/* <Route
          path="/users/:id"
          render={({ match }) => (
            <User id={match.params.id} />
          )}
        /> */}
      </Switch>
    )
}

export default Collectioncenter;