import { notFound } from "next/navigation";
import { getCategories } from "@/services/queries";
import { createClient } from "@/services/supabase/server";
import { cookies } from "next/headers";
import { Form } from "./components/form";

export default async function Page({ params }: { params: { id: string } }) {
	const cookiesStore = cookies();
	const supabase = createClient(cookiesStore);
	const categories = await getCategories(supabase, { skip: 0, take: 10 });
	const product = params.id === "create" ? null : null;

	if (params.id !== "create" && !product) notFound();

	return <Form  product={product} categories={categories || []} />
}
