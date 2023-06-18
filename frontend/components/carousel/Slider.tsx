export const SliderIndicator = () => {
  return (
    <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
      <button
        type="button"
        className="w-3 h-3 rounded-full"
        aria-current="true"
        aria-label="Slide 1"
        data-carousel-slide-to="0"
      ></button>
      <button
        type="button"
        className="w-3 h-3 rounded-full"
        aria-current="false"
        aria-label="Slide 2"
        data-carousel-slide-to="1"
      ></button>
    </div>
  )
}
