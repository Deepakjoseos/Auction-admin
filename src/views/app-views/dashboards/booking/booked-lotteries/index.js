import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Table, Input, Menu, Modal } from 'antd'
import bookedLotteryService from 'services/BookedLottery'
import utils from 'utils'
import Flex from 'components/shared-components/Flex'
import bookingService from 'services/booking'
import { timestampToTime } from 'helpers/dateFunctions'

const BookedList = (props) => {
  const [list, setList] = useState([])
  const bookingNumber = props.match.params.bookingNumber
  const [bookingList, setBookingLIst] = useState([])

  useEffect(() => {
    const query = {}
    if (bookingNumber) {
      const getBookedLotteries = async () => {
        query.bookingNumber = bookingNumber
        const data = await bookedLotteryService.getBookedLotteries(query)
        if (data) {
          // console.log(data);
          setList(data)

          //   setSearchBackupList(data);
        }
      }
      getBookedLotteries()
    }
    const getBookings = async () => {
      const data = await bookingService.getBookings()
      if (data) {
        setList(data)
        //   setSearchBackupList(data);
      }
    }
    getBookings()
  }, [bookingNumber])
  const tableColumns = [
    {
      title: 'LotteryNumber',
      dataIndex: 'lotteryNumber',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'lotteryNumber'),
    },
    {
      title: 'Count',
      dataIndex: 'count',
      sorter: (a, b) => utils.antdTableSorter(a, b, 'count'),
    },
    {
      title: 'Booking Time',
      dataIndex: 'booking',
      render: (booking) => (
        <Flex alignItems="center">{timestampToTime(booking?.bookingTime)}</Flex>
      ),
      sorter: (a, b) =>
        a.booking.bookingTime.localeCompare(b.booking.bookingTime),
    },
  ]
  return (
    <Card>
      <Flex
        alignItems="center"
        justifyContent="between"
        mobileFlex={false}
      ></Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  )
}

export default BookedList
