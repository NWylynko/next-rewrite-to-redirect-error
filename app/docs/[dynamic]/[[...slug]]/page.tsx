import { redirect } from "next/navigation";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function DocsPage(
  props: PageProps<"/docs/[dynamic]/[[...slug]]">
) {
  const { dynamic, slug } = await props.params;

  if (slug?.join("/") === "page-1") {
    await wait(100);

    redirect("/docs/page-2");
  }

  if (slug?.join("/") === "page-3") {
    await wait(100);

    redirect("/docs/page-4");
  }

  return (
    <div>
      <span>Docs Page</span>
      <pre>{JSON.stringify({ dynamic, slug }, null, 2)}</pre>
    </div>
  );
}

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  return [
    { dynamic: "cats", slug: ["page-1"] },
    { dynamic: "cats", slug: ["page-2"] },
    { dynamic: "dogs", slug: ["page-1"] },
    { dynamic: "dogs", slug: ["page-2"] },
  ];
}

export async function generateMetadata(
  props: PageProps<"/docs/[dynamic]/[[...slug]]">
) {
  const { dynamic, slug } = await props.params;

  return {
    title: `Docs ${dynamic} ${slug?.join("/")}`,
    other: {
      "my-personal-metadata": "my-personal-metadata-value",
    },
  };
}
