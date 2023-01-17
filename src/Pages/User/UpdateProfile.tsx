import React, { useState } from 'react';
import { Button, Drawer, Input, Modal, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/configStore';
import { editUser, setModalOpen } from '../../redux/reducers/UserReducer';
import { useFormik, validateYupSchema, yupToFormErrors } from 'formik';
import * as yup from 'yup';
import { notifiFucntion } from '../../util/notificationCyberBug';
const UpdateProfile: React.FC = () => {
  const { ModalOpen, userLogin } = useSelector((state: RootState) => { return state.UserReducer })
  const dispatch: DispatchType = useDispatch()
  const handleCancel = () => {
    dispatch(setModalOpen(false))

  }
  const handleOk = () => {
    console.log('ok')
    form.handleSubmit()
  }
  const form = useFormik({
    initialValues: {
      id: userLogin.id,
      passWord: '',
      email: userLogin.email,
      name: userLogin.name,
      phoneNumber: userLogin.phoneNumber,
      passWordConfirm: '',
    },
    // validationSchema: yup.object().shape({
    //   email:yup.string().required('email cannot be blank').email('email is invalid'),
    //   password: yup.string().required("password cannot be blank!"),
    //   name: yup.string().required("name cannot be blank!"),
    //   phone: yup.string().required("phone cannot be blank!"),
    //   passwordConfirm: yup
    //     .string()
    //     .oneOf([yup.ref("password"), null], "Passwords must match"),
    // }),
    onSubmit: (value: any) => {

      if (value.passWord !== value.passWordConfirm) {
        notifiFucntion("error", "Mật khẩu không đúng");
        return;
      }
      const dataUser = {
        id: value.id.toString(),
        passWord: value.passWord,
        email: value.email,
        name: value.name,
        phoneNumber: value.phoneNumber
      }
    console.log(dataUser)
      const action = editUser(dataUser)
      dispatch(action)
    }

  })

  return (
    <>
      <Modal title="Update profile" open={ModalOpen} onOk={handleOk} okText='Update' onCancel={handleCancel}>
        <div className="profile-wrap row">

          <div className="col-12">
            <div className="profile-content">
              <div className="form-group">
                <p>
                  Id <span className="required-icon">*</span>
                </p>
                <Input defaultValue={userLogin.id} name='id' onChange={form.handleChange}  disabled={true}/>
              </div>
              <div className="form-group">
                <p>
                  Email <span className="required-icon">*</span>
                </p>
                <Input name='email' defaultValue={userLogin.email} onChange={form.handleChange} />

              </div>
              <div className="form-group">
                <p>
                  Name <span className="required-icon">*</span>
                </p>
                <Input name='name' defaultValue={userLogin.name} onChange={form.handleChange} />
              </div>
              <div className="form-group">
                <p>
                  Phone number <span className="required-icon">*</span>
                </p>
                <Input name='phoneNumber' defaultValue={userLogin.phoneNumber} onChange={form.handleChange} />
              </div>
              <div className="form-group">
                <p>
                  Password <span className="required-icon">*</span>
                </p>
                <Input.Password name='passWord' placeholder="Enter your password" onChange={form.handleChange} />
              </div>
              <div className="form-group">
                <p>
                  Password confirmation <span className="required-icon">*</span>
                </p>
                <Input.Password name='passWordConfirm' placeholder="Enter your password again" onChange={form.handleChange} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
export default UpdateProfile;