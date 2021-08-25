import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  DatetimeLocalField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const TreasureForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.treasure?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="blackId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Black id
        </Label>
        <TextField
          name="blackId"
          defaultValue={props.treasure?.blackId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="blackId" className="rw-field-error" />

        <Label
          name="whiteId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          White id
        </Label>
        <TextField
          name="whiteId"
          defaultValue={props.treasure?.whiteId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="whiteId" className="rw-field-error" />

        <Label
          name="minterAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Minter address
        </Label>
        <TextField
          name="minterAddress"
          defaultValue={props.treasure?.minterAddress}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="minterAddress" className="rw-field-error" />

        <Label
          name="ownerAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Owner address
        </Label>
        <TextField
          name="ownerAddress"
          defaultValue={props.treasure?.ownerAddress}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="ownerAddress" className="rw-field-error" />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.treasure?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="cardColor"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Card color
        </Label>
        <TextField
          name="cardColor"
          defaultValue={props.treasure?.cardColor}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="cardColor" className="rw-field-error" />

        <Label
          name="blackRating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Black rating
        </Label>
        <NumberField
          name="blackRating"
          defaultValue={props.treasure?.blackRating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="blackRating" className="rw-field-error" />

        <Label
          name="duration"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Duration
        </Label>
        <NumberField
          name="duration"
          defaultValue={props.treasure?.duration}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="duration" className="rw-field-error" />

        <Label
          name="whiteRating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          White rating
        </Label>
        <NumberField
          name="whiteRating"
          defaultValue={props.treasure?.whiteRating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="whiteRating" className="rw-field-error" />

        <Label
          name="termination"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Termination
        </Label>
        <TextField
          name="termination"
          defaultValue={props.treasure?.termination}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="termination" className="rw-field-error" />

        <Label
          name="endTime"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End time
        </Label>
        <DatetimeLocalField
          name="endTime"
          defaultValue={formatDatetime(props.treasure?.endTime)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="endTime" className="rw-field-error" />

        <Label
          name="event"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Event
        </Label>
        <TextField
          name="event"
          defaultValue={props.treasure?.event}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="event" className="rw-field-error" />

        <Label
          name="moves"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Moves
        </Label>
        <TextField
          name="moves"
          defaultValue={props.treasure?.moves}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="moves" className="rw-field-error" />

        <Label
          name="moveCount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Move count
        </Label>
        <NumberField
          name="moveCount"
          defaultValue={props.treasure?.moveCount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="moveCount" className="rw-field-error" />

        <Label
          name="gameRuleVariant"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Game rule variant
        </Label>
        <TextField
          name="gameRuleVariant"
          defaultValue={props.treasure?.gameRuleVariant}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="gameRuleVariant" className="rw-field-error" />

        <Label
          name="winner"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Winner
        </Label>
        <TextField
          name="winner"
          defaultValue={props.treasure?.winner}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="winner" className="rw-field-error" />

        <Label
          name="externalUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          External url
        </Label>
        <TextField
          name="externalUrl"
          defaultValue={props.treasure?.externalUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="externalUrl" className="rw-field-error" />

        <Label
          name="opening"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Opening
        </Label>
        <TextField
          name="opening"
          defaultValue={props.treasure?.opening}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="opening" className="rw-field-error" />

        <Label
          name="achievements"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Achievements
        </Label>
        <TextField
          name="achievements"
          defaultValue={props.treasure?.achievements}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="achievements" className="rw-field-error" />

        <Label
          name="tokenId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token id
        </Label>
        <NumberField
          name="tokenId"
          defaultValue={props.treasure?.tokenId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="tokenId" className="rw-field-error" />

        <Label
          name="mintedAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Minted at
        </Label>
        <DatetimeLocalField
          name="mintedAt"
          defaultValue={formatDatetime(props.treasure?.mintedAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="mintedAt" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TreasureForm
