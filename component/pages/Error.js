import { Typography } from '@mui/material'
import React from 'react'


const Error = () => {
   
  return (
    <div> 
        <Typography variant='h3' align='center' sx={{marginTop:8}}>
         (404)❌
        </Typography>
        <Typography variant="h6" align='center' style={{ color: 'black' ,margin:'1rem' }}>
        The page you’re looking for doesn’t exist.
      </Typography>
        </div>
  )
}

export default Error