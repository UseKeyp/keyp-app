import Button from 'src/components/Button'
import Icon from 'src/components/Icon'

const FeatherSimpleSignInModal = (props) => {
  return (
    <div className="flex justify-center">
      <div className="w-80 sm:w-96 bg-chessBlack-200 p-8 rounded-2xl">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <h1 className="grid col-span-2 text-3xl justify-center">
            Sign In to Feather
          </h1>
          {props.discord && (
            <Button variant="white" textColor="black" size="small">
              <div className="grid h-[32px] justify-center items-center m-1">
                <div className="icon">
                  <Icon name="discord_blue" height="16px" />
                </div>
              </div>
            </Button>
          )}
          {props.facebook && (
            <Button variant="white" textColor="black" size="small">
              <div className="grid h-[32px] justify-center items-center m-1">
                <div className="icon">
                  <Icon name="facebook" height="16px" />
                </div>
              </div>
            </Button>
          )}
          {props.chess && (
            <Button variant="white" textColor="black" size="small">
              <div className="grid h-[32px] justify-center items-center m-1">
                <div className="icon w-[32px]">
                  <img
                    height="16px"
                    alt="chess_com_icon"
                    src="/icons/chess.png"
                  />
                </div>
              </div>
            </Button>
          )}
          {props.twitter && (
            <Button variant="white" textColor="black" size="small">
              <div className="grid h-[32px] justify-center items-center m-1">
                <div className="icon">
                  <Icon name="twitter" height="16px" />
                </div>
              </div>
            </Button>
          )}
        </div>
        <div className="flex flex-row justify-center gap-x-2 mt-4">
          <div className="flex text-sm text-blue hover:underline">
            Terms of Service
          </div>
          <div className="flex text-sm">•</div>
          <div className="flex text-sm text-blue hover:underline">
            Privacy Policy
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatherSimpleSignInModal
