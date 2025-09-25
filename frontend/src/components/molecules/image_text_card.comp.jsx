import { CardWrapper } from "../atoms/cardwrapper.org";

export function Image_Text_Card({
  imageSrc,
  category,
  title,
  description,
  href,
  containerClass = "",
  imageClass = "",
  categoryClass = " ",
  titleClass = "",
  descriptionClass = "",
  reverse = false,
}) {
  return (
    <CardWrapper
      className={`bg-second-bg  md:max-w-220 w-full ${containerClass}`}
    >
      <div
        className={`flex flex-col  gap-8 justify-center items-center md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Bild oben auf Mobile, links auf Desktop */}
        <div
          className={`h-48 w-full md:h-100 md:w-100 bg-cover bg-center rounded-none sm:rounded-lg${imageClass}`}
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        {/* Textbereich */}
        <div className="gap-8  flex text-center justify-center flex-col items-center sm:p-8 sm:flex-1 sm:text-start sm:items-start  ">
          <div
            className={`text-lg sm:text-4xl tracking-wide text-first-bg uppercase ${categoryClass}`}
          >
            {category}
          </div>

          <p className={` sm:p-0 pl-8 pr-8 sm:text-xl ${descriptionClass}`}>
            {description}
          </p>

          {/* TODO durch Button ersetzten  */}
          <a
            href={href}
            className={` mt-1 p-8 sm:p-0  block text-lg leading-tight  text-first-bg  font-medium hover:underline ${titleClass}`}
          >
            {title}
          </a>
        </div>
      </div>
    </CardWrapper>
  );
}
