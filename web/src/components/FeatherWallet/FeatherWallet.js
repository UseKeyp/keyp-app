import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Button, CardActionArea, CardActions } from '@mui/material'

const FeatherWallet = (props) => {
  const [isConnected, setIsConnected] = React.useState(false)

  return (
    <div className="max-width-container">
      <Card sx={{ maxWidth: 240, borderRadius: 4, background: '#21201D' }}>
        <CardActionArea>
          <div className="text-center text-2xl font-bold text-white pt-2 pb-2">
            {props.title}
          </div>
          <div className="flex shrink justify-center">
            <img src={props.src} alt="rainbow-wallet" />
          </div>
          <CardContent>
            <div className="text-center text-white text-sm">
              {props.description}
            </div>
          </CardContent>
        </CardActionArea>
        <div className="flex justify-center text-center">
          <CardActions onClick={() => setIsConnected(!isConnected)}>
            {!isConnected && (
              <Button size="medium" color="primary">
                Connect
              </Button>
            )}
            {isConnected && (
              <Button size="medium" color="error">
                Disconnect
              </Button>
            )}
          </CardActions>
        </div>
      </Card>
    </div>
  )
}

export default FeatherWallet
