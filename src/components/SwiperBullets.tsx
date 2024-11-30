import { css } from '@emotion/react'
import { Color } from '../palette'
import icon_arrow_left from '../assets/icons/icon_left_arrow.svg'
import icon_arrow_right from '../assets/icons/icon_right_arrow.svg'

const Style = {
  swiperBullets: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: inherit;
    gap: 4px;
  `,

  swiperBullet: css`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${Color.Gray200};
    z-index: 99999;
  `,

  activeBullet: css`
    background-color: ${Color.Main400};
  `,
  button: css`
    display: flex;
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
    margin: 0 12px;
  `,
  arrowIcon: css`
    filter: invert(45%) sepia(9%) saturate(118%) hue-rotate(187deg)
      brightness(96%) contrast(85%);
  `,
  disabled: css`
    cursor: default;
    filter: invert(15%) sepia(9%) saturate(118%) hue-rotate(187deg)
      brightness(96%) contrast(85%);
  `,
}

type SwiperBulletsProps = {
  goToSlide: (idx: number) => void
  activeSlideIndex: number
  slideLength: number
}

export const SwiperBullets = ({
  goToSlide,
  activeSlideIndex,
  slideLength,
}: SwiperBulletsProps) => {
  return (
    <div css={Style.swiperBullets}>
      <button
        css={Style.button}
        onClick={() => activeSlideIndex > 0 && goToSlide(activeSlideIndex - 1)}
      >
        <img
          css={[Style.arrowIcon, activeSlideIndex === 0 && Style.disabled]}
          src={icon_arrow_left}
          alt='<'
        />
      </button>
      {new Array(slideLength).fill(0).map((_, idx) => (
        <div
          key={idx}
          css={[
            Style.swiperBullet,
            activeSlideIndex === idx && Style.activeBullet,
          ]}
        />
      ))}
      <button
        css={Style.button}
        onClick={() =>
          activeSlideIndex < slideLength - 1 && goToSlide(activeSlideIndex + 1)
        }
      >
        <img
          css={[
            Style.arrowIcon,
            activeSlideIndex >= slideLength - 1 && Style.disabled,
          ]}
          src={icon_arrow_right}
          alt='>'
        />
      </button>
    </div>
  )
}
