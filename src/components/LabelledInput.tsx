import { css } from '@emotion/react'
import { Color } from '../platte.ts'
import { FC, useState } from 'react'

import errorImg from '../assets/error.jpg'
import discardImg from '../assets/discard.png'

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
  discardButton: css`
    display: inline-block;
    
    position: relative;
    bottom: 34px;
    left: 450px;
    
    object-fit: cover;
    
    cursor: pointer;
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
  const [ input, setInput ] = useState('')
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
        value={input}
        pattern={pattern?.source}
        css={LabelledInputStyle.input}
        data-valid={isValid}
        onChange={({ target: { value }}) => {
          setInput(value)
          setValidity(Boolean(pattern?.test(value)))
        }}
        {...inputProps}
      />
      {
        input &&
        <img
          src={discardImg}
          css={LabelledInputStyle.discardButton}
          onClick={event => {
            event.preventDefault()
            setInput('')
          }}
        />
      }
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