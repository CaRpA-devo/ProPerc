import { CardWrapper } from "../atoms/cardwrapper.org";

export function Image_Text_Card({
  imageSrc,
  category,
  title,
  description,
  href,
  containerClass = "",
  imageClass = "",
  categoryClass = "",
  titleClass = "",
  descriptionClass = "",
}) {
  return (
    <CardWrapper className={` ${containerClass}`}>
      <div className="flex flex-col  md:flex-row ">
        {/* Bild oben auf Mobile, links auf Desktop */}
        <div
          className={`h-48 w-full md:h-auto md:w-48 bg-cover bg-center ${imageClass}`}
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        {/* Textbereich */}
        <div className="p-6 md:p-8 flex-1">
          <div
            className={`text-sm font-semibold tracking-wide uppercase ${categoryClass}`}
          >
            {category}
          </div>
          <a
            href={href}
            className={`mt-1 block text-lg leading-tight font-medium hover:underline ${titleClass}`}
          >
            {title}
          </a>
          <p className={`mt-2 ${descriptionClass}`}>{description}</p>
        </div>
      </div>
    </CardWrapper>
  );
}
