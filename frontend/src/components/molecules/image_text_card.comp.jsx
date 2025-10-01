import { ArrowButton } from "../atoms/arrowbutton.comp";
import { CardWrapper } from "../atoms/cardwrapper.org";

export function ImageTextCard({
  imageSrc,
  category,
  description,
  containerClass = "",
  imageClass = "",
  categoryClass = "",
  descriptionClass = "",
  reverse = false,
  listItems = [],
  buttonText = "",
  gap = 8,
}) {
  return (
    <CardWrapper className={`   ${containerClass}`}>
      <div
        className={`flex md:max-w-280 flex-col md:flex-wrap md:gap-16 gap-8 ${gap} justify-between md:flex-row  ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Bild */}
        <div
          className={`h-64  w-full   md:min-h-80 md:w-140 md:rounded-xl  bg-cover bg-center ${imageClass}`}
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        {/* Textbereich */}
        <div className="gap-4 flex flex-wrap text-center p-0  justify-center flex-col items-center  sm:flex-1 sm:text-start sm:items-start">
          <div
            className={`text-3xl font-bold text-primary tracking-wide uppercase ${categoryClass}`}
          >
            {category}
          </div>

          <p
            className={`text-lg px-4 md:px-0 text-base-content/80 leading-relaxed ${descriptionClass}`}
          >
            {description}
          </p>

          {/* Dynamische Liste */}
          {listItems.length > 0 && (
            <ul className="px-4 flex flex-col items-center list-disc list-inside marker:text-primary marker:text-xl">
              {listItems.map((item, index) => (
                <li
                  key={index}
                  className="text-base-content/70 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}

          <ArrowButton text={buttonText} className="mb-4 md:mb-0" />
        </div>
      </div>
    </CardWrapper>
  );
}
