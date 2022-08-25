import React from 'react'
import AddStateForm from '../add-state/add-state-form'

const EditState = () => {
    
    const path=window.location.href;
   const pathArr=path.split('/');
  const id=(pathArr[pathArr.length-1]);
  return (
   <AddStateForm mode="EDIT" param={{id:id}}/>
  )
}

export default EditState