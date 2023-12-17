import type { Metadata } from "next";
import SingleProjectPage from "../../components/Project/SingleProjectPage";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function SingleProject({ params }) {
  return <SingleProjectPage params={params}></SingleProjectPage>;
}

// export const generateMetadata = async ({
//   params,
// }: Props): Promise<Metadata> => {
//   const slug = params.slug;
//   const project = await fetch(`${process.env.API_HOST}projects/${slug}`).then(
//     (res) => res.json()
//   );

//   return {
//     title: project?.data?.name,
//     description: project?.data?.meta_description,
//     keywords: project?.data?.meta_keywords,
//   };
// };
