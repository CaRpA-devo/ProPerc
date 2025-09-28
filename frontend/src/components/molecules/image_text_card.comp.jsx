// import { CardWrapper } from "../atoms/cardwrapper.org";

// export function Image_Text_Card({
//   imageSrc,
//   category,
//   title,
//   description,
//   href,
//   containerClass = "",
//   imageClass = "",
//   categoryClass = " ",
//   titleClass = "",
//   descriptionClass = "",
//   reverse = false,
// }) {
//   return (
//     <CardWrapper
//       className={`bg-second-bg  md:max-w-220 w-full ${containerClass}`}
//     >
//       <div
//         className={`flex flex-col  gap-8 justify-center items-center md:flex-row ${
//           reverse ? "md:flex-row-reverse" : ""
//         }`}
//       >
//         {/* Bild oben auf Mobile, links auf Desktop */}
//         <div
//           className={`h-48 w-full md:h-100 md:w-100 bg-cover bg-center ${imageClass}`}
//           style={{ backgroundImage: `url(${imageSrc})` }}
//         ></div>

//         {/* Textbereich */}
//         <div className="gap-8 flex text-center justify-center flex-col items-center sm:p-8 sm:flex-1 sm:text-start sm:items-start  ">
//           <div
//             className={`text-sm sm:text-3xl font-semibold tracking-wide text-indigo-600 uppercase ${categoryClass}`}
//           >
//             {category}
//           </div>

//           <p className={`font-bold text-xl ${descriptionClass}`}>
//             {description}
//           </p>

//           {/* TODO durch Button ersetzten  */}
//           <a
//             href={href}
//             className={` mt-1   block text-lg leading-tight font-medium hover:underline ${titleClass}`}
//           >
//             {title}
//           </a>
//         </div>
//       </div>
//     </CardWrapper>
//   );
// }
export function ImageTextCard({ title, description, image, reverse = false }) {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        reverse ? "lg:grid-flow-dense" : ""
      }`}
    >
      {/* Image */}
      <div className={`${reverse ? "lg:col-start-2" : ""}`}>
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>

      {/* Content */}
      <div className={`${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
        <div className="max-w-lg">
          <h3 className="text-3xl font-bold text-primary mb-6">{title}</h3>
          <p className="text-lg text-base-content/80 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Feature Points */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-base-content/70">
                Personalisiert für Sie
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-base-content/70">
                Wissenschaftlich fundiert
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span className="text-base-content/70">Einfach zu verwenden</span>
            </div>
          </div>

          <button className="btn btn-primary btn-outline">
            Mehr erfahren
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
