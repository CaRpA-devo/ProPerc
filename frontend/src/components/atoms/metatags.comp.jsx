export function MetaTags({ title, desc, bots, keywords }) {
  const withBoths = bots ? "index, follow" : "noindex, nofollow";

  return (
    <>
      {/* TODO noch bearbeiten  */}
      <title>{title}</title>
      <meta property="og:title" content={title || "ProPerc"} />
      <meta name="description" content={desc || "ProPerc"} />
      <meta property="og:description" content={desc || "ProPerc"} />
      <meta name="robots" content={withBoths || false}></meta>
      <meta name="googlebot" content={withBoths || false}></meta>
      <meta name="keywords" content={keywords || "ProPerc"}></meta>
    </>
  );
}
