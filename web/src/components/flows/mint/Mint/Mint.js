import ModalContainer from '../../../ModalContainer/ModalContainer'

import MintSetTitle from '../MintSetTitle/MintSetTitle'
import MintPay from '../MintPay/MintPay'
import MintProcessing from '../MintProcessing/MintProcessing'
import MintComplete from '../MintComplete/MintComplete'

const Mint = () => {
  const [step, setStep] = React.useState(1)
  const [error, setError] = React.useState()

  const onSubmit = (data) => {
    console.log(data)
    if (step === 4) return setStep(1)
    return setStep(step + 1)
  }

  let stepContent = <></>

  switch (step) {
    case 1:
      stepContent = <MintSetTitle onSubmit={onSubmit} error={error} />
      break
    case 2:
      stepContent = <MintPay onClick={onSubmit} cash={3} />
      break
    case 3:
      stepContent = <MintProcessing onClick={onSubmit} />
      break
    case 4:
      stepContent = <MintComplete onClick={onSubmit} />
      break
  }

  const setStatusText = React.useMemo(() => {
    let statusText = ''

    switch (step) {
      case 1:
        statusText = 'Step 1 of 2'
        break
      case 2:
        statusText = 'Step 2 of 2'
        break
      case 3:
        statusText = 'Processing'
        break
      case 4:
        statusText = 'Complete'
        break
    }

    return statusText
  }, [step])

  return (
    <div>
      <ModalContainer
        title="Mint Game"
        statusText={setStatusText}
        stepNum={step}
        totalNumSteps={4}
      >
        {stepContent}
      </ModalContainer>
    </div>
  )
}

export default Mint
