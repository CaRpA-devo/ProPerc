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
          className={`h-48 w-full md:h-100 md:w-100 bg-cover bg-center ${imageClass}`}
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        {/* Textbereich */}
        <div className="gap-8  flex text-center justify-center flex-col items-center sm:p-8 sm:flex-1 sm:text-start sm:items-start  ">
          <div
            className={`text-sm sm:text-3xl font-semibold tracking-wide text-indigo-600 uppercase ${categoryClass}`}
          >
            {category}
          </div>

          <p className={`font-bold text-xl ${descriptionClass}`}>
            {description}
          </p>

          {/* TODO durch Button ersetzten  */}
          <a
            href={href}
            className={` mt-1   block text-lg leading-tight font-medium hover:underline ${titleClass}`}
          >
            {title}
          </a>
        </div>
      </div>
    </CardWrapper>
  );
}
