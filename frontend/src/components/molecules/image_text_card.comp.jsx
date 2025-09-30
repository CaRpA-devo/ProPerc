import { ArrowButton } from "../atoms/arrowbutton.comp";
import { CardWrapper } from "../atoms/cardwrapper.org";

export function ImageTextCard({
  imageSrc,
  category,
  description,

  containerClass = "",
  imageClass = "",
  categoryClass = " ",
  descriptionClass = "",
  reverse = false,
  listItems = [],
  buttonText = "",
}) {
  return (
    <CardWrapper className={` md:max-w-220 w-full ${containerClass}`}>
      <div
        className={`flex flex-col gap-8 justify-center items-center md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Bild oben auf Mobile, links auf Desktop */}
        <div
          className={`h-48 w-full rounded-xl md:h-100 md:w-100 bg-cover bg-center ${imageClass}`}
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        {/* Textbereich */}
        <div className="gap-8 flex text-center justify-center flex-col items-center sm:p-8 sm:flex-1 sm:text-start sm:items-start">
          <div
            className={`text-3xl font-bold text-primary mb-6 tracking-wide uppercase ${categoryClass}`}
          >
            {category}
          </div>

          <p
            className={`text-lg text-base-content/80 mb-8 leading-relaxed ${descriptionClass}`}
          >
            {description}
          </p>

          {/* Dynamische Liste */}
          {listItems.length > 0 && (
            <ul className="flex flex-col items-center gap-3 list-disc list-inside marker:bg-secondary marker:text-xl">
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
