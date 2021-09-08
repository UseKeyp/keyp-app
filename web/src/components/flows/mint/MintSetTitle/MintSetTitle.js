import {
  Form,
  FormError,
  FieldError,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const MintSetTitle = (props) => {
  return (
    <div className="rw-form-wrapper mint-set-title">
      <Form
        onSubmit={props.onSubmit}
        error={props.error}
        className="mint-set-title__form"
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <TextField
          name="Title"
          defaultValue={''}
          className="rw-input mint-set-title__input "
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          placeholder="Title"
        />
        <FieldError name="Title" className="rw-field-error" />
        {/* <div className="rw-button-group"> */}
        <Submit className="rect-button green rw-button rw-button-blue mint-set-title__submit">
          Continue
        </Submit>
        {/* </div> */}
      </Form>
      <a href="/" className="mint-set-title__link">
        What does mint mean?
      </a>
    </div>
  )
}

export default MintSetTitle
