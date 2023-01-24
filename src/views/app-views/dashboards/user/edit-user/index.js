import UserForm from '../form-user';

const EditUser = (props) => {
  return <UserForm mode="EDIT" param={props.match.params} />;
};

export default EditUser;
