import { ArrowButton } from "../atoms/arrowbutton.comp";

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
    <div
      className={`flex flex-col gap-36  justify-between md:flex-row ${containerClass}  ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Bild oben auf Mobile, links auf Desktop */}
      <div
        className={`h-48 w-full rounded-xl md:h-100 md:w-100 bg-cover bg-center ${imageClass}`}
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>

      {/* Textbereich */}
      <div className="gap-4 flex text-center p-0 max-w-120 justify-center flex-col items-center sm:p-8 sm:flex-1 sm:text-start sm:items-start">
        <div
          className={`text-3xl font-bold text-primary tracking-wide uppercase ${categoryClass}`}
        >
          {category}
        </div>

        <p
          className={`text-lg text-base-content/80  leading-relaxed mb-8 ${descriptionClass}`}
        >
          {description}
        </p>

        {/* Dynamische Liste */}
        {listItems.length > 0 && (
          <ul className="flex flex-col items-center  list-disc list-inside marker:text-secondary  marker:text-xl">
            {listItems.map((item, index) => (
              <li key={index} className="text-base-content/70 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        )}
        <ArrowButton text={buttonText} />
      </div>
    </div>
  );
}
