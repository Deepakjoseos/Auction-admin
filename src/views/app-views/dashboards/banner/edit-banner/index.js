import React from 'react'
import BannerForm from '../bannerForm'


const EditBanner = (props) => {
  return <BannerForm mode="EDIT" param={props.match.params} />
}

export default EditBanner
