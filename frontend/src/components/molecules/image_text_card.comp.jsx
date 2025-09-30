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
    <CardWrapper className={`md:max-w-220 w-full ${containerClass}`}>
      <div
        className={`flex flex-col gap-${gap} justify-between md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Bild */}
        <div
          className={`h-48 w-full md:rounded-xl md:h-100 md:w-100 bg-cover bg-center ${imageClass}`}
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        {/* Textbereich */}
        <div className="gap-4 flex flex-wrap text-center p-0  justify-center flex-col items-center sm:p-8 sm:flex-1 sm:text-start sm:items-start">
          <div
            className={`text-3xl font-bold text-primary tracking-wide uppercase ${categoryClass}`}
          >
            {category}
          </div>

          <p
            className={`text-lg text-base-content/80 leading-relaxed ${descriptionClass}`}
          >
            {description}
          </p>

          {/* Dynamische Liste */}
          {listItems.length > 0 && (
            <ul className="flex flex-col items-center list-disc list-inside marker:text-primary marker:text-xl">
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

          <ArrowButton text={buttonText} />
        </div>
      </div>
    </CardWrapper>
  );
}
