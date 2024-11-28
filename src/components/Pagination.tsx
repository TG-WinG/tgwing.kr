import { css } from '@emotion/react'
import icon_left from '../assets/icons/icon_left_arrow.svg'
import icon_right from '../assets/icons/icon_right_arrow.svg'
import { Color } from '../palette'

const Style = {
  wrapper: css`
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 50px;
  `,
  pagesContainer: css`
    display: flex;
    gap: 9px;
  `,
  button: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
  `,
  icon: css`
    filter: invert(15%) sepia(9%) saturate(118%) hue-rotate(187deg)
      brightness(96%) contrast(85%);
  `,
  disabledIcon: css`
    filter: invert(50%) sepia(9%) saturate(118%) hue-rotate(187deg)
      brightness(96%) contrast(85%);
  `,
  pageBox: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 99px;
    font-size: 15px;
  `,
  currentBox: css`
    border: 1px solid ${Color.Primary};
    color: ${Color.Primary};
  `,
}

type PaginationProps = {
  totalPages: number
  currentPage: number
  setCurrentPage: (number: number) => void
}

export const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  return (
    <div css={Style.wrapper}>
      <button
        css={Style.button}
        onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
      >
        <img
          src={icon_left}
          alt=''
          css={currentPage > 0 ? Style.disabledIcon : Style.icon}
        />
      </button>
      <div css={Style.pagesContainer}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            css={[Style.pageBox, currentPage === index && Style.currentBox]}
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        css={Style.button}
        onClick={() =>
          setCurrentPage(
            currentPage < totalPages - 1 ? currentPage + 1 : totalPages - 1
          )
        }
      >
        <img
          src={icon_right}
          alt=''
          css={currentPage < totalPages - 1 ? Style.disabledIcon : Style.icon}
        />
      </button>
    </div>
  )
}
