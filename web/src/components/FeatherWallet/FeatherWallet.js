import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'

const FeatherWallet = (props) => {
  const [isConnected, setIsConnected] = React.useState(false)

  return (
    <div className="max-width-container">
      <Card sx={{ maxWidth: 300, borderRadius: 4, background: '#21201D' }}>
        <CardActionArea>
          <Typography
            className="text-center text-white pt-2"
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.title}
          </Typography>
          <div className="flex shrink justify-center">
            <img src={props.src} alt="rainbow-wallet" />
          </div>
          <CardContent>
            <Typography className="text-center" variant="body2" color="#FFFFFF">
              {props.description}
            </Typography>
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
