import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CommentList from './comment-list';
import useUserPrivilege from 'hooks/useUserPrivilege';

const Comment = (props) => {
  const { match, sellerId } = props;

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/comment-list`} />
      <Route
        path={`${match.url}/comment-list`}
        render={(props) => <CommentList {...props} />}
      />
    </Switch>
  );
};

export default Comment;
