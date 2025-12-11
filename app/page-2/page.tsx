import { redirect } from "next/navigation";

export default async function Page2() {
  redirect("/page-3");

  return (
    <div>
      <span>Page 2</span>
    </div>
  );
}
