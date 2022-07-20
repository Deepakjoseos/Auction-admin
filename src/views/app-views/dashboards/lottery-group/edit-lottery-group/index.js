import React from 'react'
import LotteryGroupForm from '../lotteryGroupForm'
const EditLotteryGroup = (props) => {
  return <LotteryGroupForm mode="EDIT" param={props.match.params} />
}

export default EditLotteryGroup
