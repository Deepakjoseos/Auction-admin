import React, { Component, useEffect, useState } from 'react'
import {
  Form,
  Avatar,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  message,
  Upload,
  Card,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { ROW_GUTTER } from 'constants/ThemeConstant'
import Flex from 'components/shared-components/Flex'
import CustomIcon from 'components/util-components/CustomIcon'
import { ImageSvg } from 'assets/svg/icon'
import { useDispatch, useSelector } from 'react-redux'
import useUpload from 'hooks/useUpload'
import Utils from 'utils'
import { singleImageUploader } from 'utils/s3/s3ImageUploader'
import authAdminService from 'services/auth/admin'
import { authenticated } from 'redux/actions/Auth'

const EditProfile = () => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [displayImage, setDisplayImage] = useState(null)
  const { user } = useSelector((state) => state.auth)
  console.log(user, 'mine')
  const dispatch = useDispatch()

  const [form] = Form.useForm()

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
      })
      let himg = []

      if (user.displayImage) {
        himg = [
          {
            uid: Math.random() * 1000,
            name: Utils.getBaseName(user.displayImage),
            url: user.displayImage,
            thumbUrl: user.displayImage,
          },
        ]
        console.log(user.displayImage, 'jeey', himg)
        setDisplayImage(himg)
        setFileListImages(himg)
      }
    }
  }, [user])

  const {
    fileList: fileListImages,
    beforeUpload: beforeUploadImages,
    onChange: onChangeImages,
    onRemove: onRemoveImages,
    setFileList: setFileListImages,
  } = useUpload(1)

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async (values) => {
        // Checking if image exists
        console.log(values, 'plss')
        if (displayImage?.length !== 0 && displayImage !== null) {
          const imgValue = await singleImageUploader(
            displayImage[0].originFileObj,
            displayImage,
            displayImage[0].url,
            'profile'
          )
          values.displayImage = imgValue
        } else {
          values.displayImage = null
        }

        const edited = await authAdminService.editProfile(values)
        if (edited) {
          message.success(`Edited Profile Successfully`)

          const data = await authAdminService.getProfile()

          console.log(data, 'heteet')
          if (data) {
            const userData = {
              ...user,
              firstName: data.firstName,
              lastName: data.lastName,
              displayImage: data.displayImage,
            }
            dispatch(
              authenticated({
                user: userData,
                token: window.localStorage.getItem('auth_token'),
              })
            )
          }
        }
      })
      .catch((info) => {
        // setSubmitLoading(false)
        console.log('info', info)
        message.error('Please enter all required field ')
      })
  }

  // const onFinishFailed = errorInfo => {
  // 	console.log('Failed:', errorInfo);
  // };

  // const onUploadAavater = info => {
  // 	const key = 'updatable';
  // 	if (info.file.status === 'uploading') {
  // 		message.loading({ content: 'Uploading...', key, duration: 1000 });
  // 		return;
  // 	}
  // 	if (info.file.status === 'done') {
  // 		this.getBase64(info.file.originFileObj, imageUrl =>
  // 			this.setState({
  // 				avatarUrl: imageUrl,
  // 			}),
  // 		);
  // 		message.success({ content: 'Uploaded!', key,  duration: 1.5 });
  // 	}
  // };

  const onRemoveAvater = () => {
    // this.setState({
    // 	avatarUrl: ''
    // })
    setDisplayImage(null)
    setPreviewUrl(null)
  }

  // const { name, email, userName, dateOfBirth, phoneNumber, website, address, city, postcode, avatarUrl } = this.state;

  const propsImages = {
    multiple: false,
    beforeUpload: beforeUploadImages,
    onRemove: onRemoveImages,
    onChange: onChangeImages,
    fileList: fileListImages,
  }

  useEffect(() => {
    if (fileListImages?.length) {
      // Setting Preview
      if (fileListImages?.length > 0 && fileListImages[0]?.originFileObj) {
        setPreviewUrl(URL.createObjectURL(fileListImages[0].originFileObj))
      } else {
        setPreviewUrl(fileListImages[0].url)
      }
      setDisplayImage(fileListImages)
    }
  }, [fileListImages])

  return (
    <>
      <Flex
        alignItems="center"
        mobileFlex={false}
        className="text-center text-md-left"
      >
        <Avatar size={90} src={previewUrl} icon={<UserOutlined />} />
        <div className="ml-3 mt-md-0 mt-3">
          <Upload
            // onChange={onUploadAavater}
            showUploadList={false}
            name="image"
            {...propsImages}
            // action={this.avatarEndpoint}
          >
            <Button type="primary">Change Avatar</Button>
          </Upload>
          <Button className="ml-2" onClick={onRemoveAvater}>
            Remove
          </Button>
        </div>
      </Flex>
      <div className="mt-4">
        <Form
          name="basicInformation"
          layout="vertical"
          form={form}
          // initialValues={
          // 	{
          // 		'name': name,
          // 		'email': email,
          // 		'username': userName,
          // 		'dateOfBirth': dateOfBirth,
          // 		'phoneNumber': phoneNumber,
          // 		'website': website,
          // 		'address': address,
          // 		'city': city,
          // 		'postcode': postcode
          // 	}
          // }
          //   onFinish={}
          // onFinishFailed={onFinishFailed}
        >
          {/* <Row gutter={16}>
            <Col xs={24} sm={24} lg={17}> */}
          <Row gutter={ROW_GUTTER}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: 'Required',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" htmlType="submit" onClick={onFinish}>
            Save Change
          </Button>
          {/* </Col>
            <Col xs={24} sm={24} md={7}>
              <Card title="Profile Image">
                <Upload listType="picture-card" name="image" {...propsImages}>
                  <CustomIcon className="display-3" svg={ImageSvg} />
                </Upload>
              </Card>
            </Col>
          </Row> */}
        </Form>
      </div>
    </>
  )
}

export default EditProfile
