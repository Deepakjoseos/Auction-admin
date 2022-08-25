import React from 'react'
import AddCityForm from '../add-city/add-city-form'

const EditCity = () => {
    const path=window.location.href;
    const pathArr=path.split('/');
   const id=(pathArr[pathArr.length-1]);
  return (
    <AddCityForm mode="EDIT" param={{id:id}}/>
  )
}

export default EditCity