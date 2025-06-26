import { useQuery } from "@tanstack/react-query"
import { id } from "zod/v4/locales"
import { fetchToolById } from "../queries/tools"
import { queryKeys } from "../queryKeys"

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
