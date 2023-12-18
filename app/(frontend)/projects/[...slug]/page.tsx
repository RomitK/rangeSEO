import type { Metadata } from "next";
import SingleProjectPage from "../../components/Project/SingleProjectPage";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function SingleProject({ params }) {
  return <SingleProjectPage params={params}></SingleProjectPage>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const slug = params.slug;
  const projectMeta = await fetch(`${process.env.API_HOST}projects/${slug}/meta`,  { cache: "no-store" }) 
  .then((res) => res.json())
  .catch((err) => {
    console.log("err", err);
  });

  return {
    title: projectMeta?.data?.name,
    description: projectMeta?.data?.meta_description,
    keywords: projectMeta?.data?.meta_keywords,
  };
};
