import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "../queryKeys"
import { fetchToolById } from "../queries/tools"
import { id } from "zod/v4/locales"

// Query Factory
interface Props {
	for: "card" | "full-page"
}
export const useFetchToolById = (id: string, options?: Props) =>
	useQuery({
		queryKey: [queryKeys.tools.cardDetail(id)],
		queryFn: () =>
			fetchToolById({
				id,
			}),

		placeholderData: (prevData, prevQuery) => prevData,
	})
