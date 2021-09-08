import ModalContainer from '../../../ModalContainer/ModalContainer'

import {
  Form,
  FormError,
  FieldError,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import MintSetTitle from '../MintSetTitle/MintSetTitle'

const Mint = () => {
  const [step, setStep] = React.useState(1)
  const [error, setError] = React.useState()

  const onSubmit = (data) => {
    console.log(data)
    setStep(step + 1)
  }

  let stepContent = <></>

  switch (step) {
    case 1:
      stepContent = <MintSetTitle onSubmit={onSubmit} error={error} />
      break
  }

  return (
    <div>
      <ModalContainer
        title="Mint Game"
        statusText="Step 1 of 2"
        stepNum={step}
        totalNumSteps={4}
      >
        {stepContent}
      </ModalContainer>
    </div>
  )
}

export default Mint
