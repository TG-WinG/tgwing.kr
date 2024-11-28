import { ChangeEvent, FC, useState } from 'react'

import { css } from '@emotion/react'

import { imageButtonBase } from './ImageButton.tsx'
import { Color } from '../platte.ts'
import discardIcon from '../assets/images/discard.png'
import successIcon from '../assets/images/success.png'
import errorIcon from '../assets/images/error.png'

interface Props {
  name: string
  label: string
  detailedLabel?: string
  pattern?: RegExp
  errorMessage?: string
  className?: string

  disabled?: boolean
  type?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
  login?: boolean
  onEnter?: () => void
  isError?: boolean
  maxLength?: number
}

const InputBoxStyle = {
  inputBoxContainer: css`
    display: flex;
    flex-direction: column;
    position: relative;
  `,
  mb: css`
    margin-top: 10px;
  `,
  labelParagraph: css`
    margin-bottom: 5px;
  `,
  label: css`
    font-size: 16px;
    font-weight: 500;
  `,
  detailedLabel: css`
    font-size: 12px;
    font-weight: 400;
    color: ${Color.Gray400};

    margin-top: 4px;
    margin-left: 4px;
    margin-bottom: 1px;

    :empty {
      display: none;
    }
  `,
  input: (readOnly: boolean) => css`
    display: block;
    height: 48px;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    color: ${Color.Gray900};
    border: 1px solid ${Color.Gray300};
    border-radius: 8px;
    padding: 14px 30px 15px 16px;
    outline: none;
    transition: 0.2s;
    background-color: ${readOnly ? Color.Gray100 : 'transparent'};

    ::placeholder {
      color: ${Color.Gray500};
    }

    :hover {
      border-width: 1.5px;
    }

    &[data-is-error='true'] {
      border-width: 1.5px;
      border-color: ${Color.Red};
    }

    :invalid:not(:focus)[data-is-touched='true'] {
      border-width: 1.5px;
      border-color: ${Color.Red};
    }

    :focus {
      border-width: 1.5px;
      border-color: ${Color.Primary};
    }

    :disabled {
      background-color: ${Color.Gray100};
    }
  `,
  discardButton: (inputId: string) => css`
    ${imageButtonBase(discardIcon)}
    position: absolute;
    top: 46px;
    left: 90%;
    width: 14px;
    height: 14px;
    display: none;

    #${inputId}:focus ~ & {
      display: inline-block;
    }
  `,
  statusIcon: (inputId: string) => css`
    display: none;

    height: 14px;
    width: 14px;
    position: absolute;
    top: 46px;
    left: 90%;

    #${inputId}:invalid:not(:focus)[data-is-touched='true'] ~ & {
      display: inline-block;
      content: url(${errorIcon});
    }

    #${inputId}:valid:not(:focus):not([value=''])[data-is-touched='true'] ~ & {
      display: inline-block;

      content: url(${successIcon});
    }
  `,
  errorMessage: (inputId: string, login: boolean) => css`
    position: absolute;
    bottom: -22px;
    font-size: 14px;
    color: ${Color.Red};

    ${login ? 'opacity: 0;' : 'display: none;'}

    #${inputId}:invalid:not(:focus)[data-is-touched='true'] ~ &,
    [data-is-error='true'] ~ & {
      ${login ? 'opacity: 1;' : 'display: inline;'}
    }
  `,
}

export const InputBox: FC<Props> = ({
  name,
  label,
  detailedLabel,
  className,
  pattern,
  errorMessage,
  onChange,
  onEnter,
  readOnly = false,
  login = false,
  isError = false,
  maxLength,
  ...props
}) => {
  const [input, setInput] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  return (
    <label
      css={[InputBoxStyle.inputBoxContainer, login && InputBoxStyle.mb]}
      className={className}
    >
      <p css={InputBoxStyle.labelParagraph}>
        <span css={InputBoxStyle.label}>{label}</span>
        <span css={InputBoxStyle.detailedLabel}>{detailedLabel}</span>
      </p>
      <input
        id={name}
        name={name}
        value={input}
        pattern={pattern?.source}
        css={InputBoxStyle.input(readOnly)}
        onChange={(event) => {
          setInput(event.target.value)
          if (onChange) onChange(event)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            if (onEnter) onEnter()
          }
        }}
        onFocus={() => setIsTouched(true)}
        data-is-touched={isTouched}
        data-is-error={isError}
        readOnly={readOnly}
        maxLength={maxLength}
        {...props}
      />
      <img css={InputBoxStyle.statusIcon(name)} />
      <button
        css={InputBoxStyle.discardButton(name)}
        onClick={() => setInput('')}
        disabled={readOnly}
      />
      <span
        css={InputBoxStyle.errorMessage(name, login)}
        style={{ display: isError ? 'inline' : undefined }}
      >
        {errorMessage}
      </span>
    </label>
  )
}
