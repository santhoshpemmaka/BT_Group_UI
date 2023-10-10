import React from 'react'

const FeebackItem = ({feedback,index}) => {
    const {name,email,company,comments} = feedback;
  return (
    <tr>
        <td>{index+1}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{company}</td>
        <td>{comments}</td>
    </tr>
  )
}

export default FeebackItem