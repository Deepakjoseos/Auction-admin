import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CommentList from './comment-list';

const Comment = (props) => {
  const { match } = props;

  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/comment-list`} />
      <Route path={`${match.url}/comment-list`} component={CommentList} />
    </Switch>
  );
};

export default Comment;
