import { myRandomFlag } from "@/flags";
import { generatePermutations, getPrecomputed } from "flags/next";
import { redirect } from "next/navigation";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function DocsPage(
  props: PageProps<"/docs/[code]/[[...slug]]">
) {
  const { code, slug } = await props.params;

  const [myRandomFlagValue] = await getPrecomputed(
    [myRandomFlag],
    [myRandomFlag],
    code
  );

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
      <pre>{JSON.stringify({ myRandomFlagValue, code, slug }, null, 2)}</pre>
    </div>
  );
}

export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const permutations = await generatePermutations([myRandomFlag]);

  return permutations.flatMap((permutation) => [
    {
      code: permutation,
      slug: ["page-1"],
    },
    {
      code: permutation,
      slug: ["page-2"],
    },
  ]);
}

export async function generateMetadata(
  props: PageProps<"/docs/[code]/[[...slug]]">
) {
  const { slug } = await props.params;

  return {
    title: `Docs ${slug?.join("/")}`,
    other: {
      "my-personal-metadata": "my-personal-metadata-value",
    },
  };
}
