import { redirect } from "next/navigation";

export default async function DocsPage(
  props: PageProps<"/docs/[dynamic]/[[...slug]]">
) {
  const { dynamic, slug } = await props.params;

  if (slug?.join("/") === "page-1") {
    redirect("/docs/page-2");
  }

  return (
    <div>
      <span>Docs Page</span>
      <pre>{JSON.stringify({ dynamic, slug }, null, 2)}</pre>
    </div>
  );
}
