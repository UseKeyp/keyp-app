import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'

const AssetCard = (props) => {
  return (
    <AppBar sx={{ borderRadius: 4, background: '#21201D' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt="Asset Icon" src={props.src} />
          <div className="flex flex-col text-xl ml-4">
            <div className="font-bold">{props.asset}</div>
            <div className="text-sm">{props.description}</div>
          </div>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <div className="text-2xl whitespace-nowrap">
              {props.balance} {props.acronym}
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default AssetCard
