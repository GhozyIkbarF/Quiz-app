import { useEffect } from "react";
import { Helmet } from "react-helmet";

type MetadataProps = {
  title: string;
  desc: string;
  image?: string;
};

const Metadata = ({ title = "", desc = "", image = "" }: MetadataProps) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default Metadata;
