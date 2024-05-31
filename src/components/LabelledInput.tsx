import { css } from '@emotion/react'
import { Color } from '../platte.ts'
import { FC, useState } from 'react'

import errorImg from '../assets/error.jpg'

interface LabelledInputProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  pattern?: RegExp
  errorMessage?: string
  className?: string
}

const LabelledInputStyle = {
  label: css`
    display: block;
    
    margin-left: 20px;
    
    font-size: 15px;
  `,
  input: css`
    border: 2px solid ${Color.DarkGrey};
    border-radius: 24px;
    outline: none;
        
    width: 100%;
    height: 48px;
        
    font-size: 15px;
        
    padding: 16px 0px 15px 20px;
    
    :focus {
      border-color: ${Color.Black};
    }
    
    &[data-valid="false"] {
      border-color: ${Color.Red};
    }
  `,
  errorMessage: css`
    color: ${Color.Red};
    
    font-size: 12px;
    
    margin: 3px 18px 0px;
    
    display: flex;
    align-items: center;
  `,
  errorIcon: css`
    display: inline-block;
  `
}

export const LabelledInput: FC<LabelledInputProps> = ({ name, label, pattern, className, errorMessage, ...inputProps }) => {
  const [ isValid, setValidity ] = useState(true)

  return (
    <div className={className}>
      <label
        htmlFor={name}
        css={LabelledInputStyle.label}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        pattern={pattern?.source}
        css={LabelledInputStyle.input}
        data-valid={isValid}
        onChange={event => pattern && setValidity(pattern.test(event.target.value))}
        {...inputProps}
      />
      {
        !isValid && errorMessage &&
          <div css={LabelledInputStyle.errorMessage}>
            <img src={errorImg} css={LabelledInputStyle.errorIcon} />
            <span>{errorMessage}</span>
          </div>
      }
    </div>
  )
}