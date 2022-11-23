import axios from "axios"



export const uploadImage = async (id, token, file) => {

  return axios.patch(`${process.env.NEXT_PUBLIC_BASE_URI}/investigationCenters/upload-image/${id}`, file, {
    headers: {
      "Authorization": token,
    }
  })
  .then(data => {return data})
  .catch(err => {console.log(err)})


  
    // return fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/investigationCenters/upload-image/${id}`, 
    // {
    //   method: 'PATCH',
    //   headers: {
    //     "Authorization": token
    //   },
    //   body: file
    // })
    //   .then(res => res.json())
    //   .then(data => { return data })
    //   .catch(error => {
    //     console.error('uploadImage', error)
    //   })
  }

export const saveInvestigationCenter = (centerData, token,
  setStatusNumber, setCenterNumber, setSubmitSuccess,
  setOpenNotification, openNotification) => {

  return fetch(
    `${process.env.NEXT_PUBLIC_BASE_URI}/investigationCenters`,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(centerData)
    }).then(res => res.json())
    .then(data => {
      console.log('data', data)
      if (data.status) {
        setStatusNumber(1)
      } else {
        setCenterNumber(data.pkInvestigationCenter)
        setStatusNumber(0)
        setSubmitSuccess(true)
      }
      setOpenNotification({ ...openNotification, open: true })
      return data
    }).catch(error => {
      console.log('11:error ', error)
      alert('Ocorreu um erro no servidor!')
      throw (error)
    })
}