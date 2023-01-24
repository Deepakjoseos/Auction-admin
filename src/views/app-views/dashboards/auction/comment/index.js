import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CommentList from './comment-list';
import useUserPrivilege from 'hooks/useUserPrivilege';

const Comment = (props) => {
  const { match } = props;
   const privileges = useUserPrivilege('INVENTORY_COMMENT');

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/comment-list`} />
      <Route
        path={`${match.url}/comment-list`}
        render={(props) => <CommentList {...props} {...privileges} />}
      />
    </Switch>
  );
};

export default Comment;
