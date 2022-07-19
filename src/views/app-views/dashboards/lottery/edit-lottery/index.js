import React from 'react'
import LotteryForm from '../LotteryForm'

const EditLottery = (props) => {
  return <LotteryForm mode="EDIT" param={props.match.params} />
}

export default EditLottery
