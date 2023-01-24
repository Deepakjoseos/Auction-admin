import EmployeeTypeForm from '../employee-type-form';

const EditEmployeeType = (props) => {
  return <EmployeeTypeForm mode="EDIT" param={props.match.params} />;
};

export default EditEmployeeType;
