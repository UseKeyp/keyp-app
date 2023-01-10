import { Form, Label, TextField, FieldError, FormError } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import { useWallet } from 'src/providers/wallet'
import { isHexAddress } from 'src/utils/helpers'

const WalletFormTransferUsdc = () => {
  const { transferUsdc, transferUsdcLoading } = useWallet()

  const onSubmit = async (data) => {
    await transferUsdc({ ...data })
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit}>
        <FormError
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label name="amount" errorClassName="rw-label rw-label-error">
          amount
        </Label>
        <TextField
          name="amount"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            validate: (value) =>
              Number(value) > 0 || 'Please enter a valid number',
          }}
        />
        <FieldError name="amount" className="rw-field-error" />

        <Label name="toAddress" errorClassName="rw-label rw-label-error">
          Recipient Address
        </Label>
        <TextField
          name="toAddress"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            validate: (value) =>
              isHexAddress(value) ||
              'address should be 40 character hex string',
          }}
        />
        <FieldError name="toAddress" className="rw-field-error" />

        <div className="rw-button-group">
          <Button
            disabled={transferUsdcLoading}
            type="submit"
            className={`rw-button rw-button-blue w-32 text-xl shadow-m hover:sm items-center ${
              transferUsdcLoading && 'cursor-not-allowed'
            }`}
            size="small"
            variant={transferUsdcLoading ? 'grey' : 'blue'}
            label={transferUsdcLoading ? <LoadingDots /> : 'Transfer'}
          />
        </div>
      </Form>
    </div>
  )
}

export default WalletFormTransferUsdc
