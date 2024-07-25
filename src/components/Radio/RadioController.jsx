import { Controller } from 'react-hook-form'
import RadioInput from './RadioInput'

const RadioController = (props) => {
  const { name, control, options, disabled } = props
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Controller
        control={control}
        defaultValue={options[0].value}
        name={name}
        render={({ field }) => {
          return (
            <RadioInput
              value={field.value}
              onChange={(value) => {
                field.onChange(value)
                props.onChange?.(value)
                console.log(value)
              }}
              options={options}
              disabled={disabled}
            />
          )
        }}
      />
    </div>
  )
}

export default RadioController
