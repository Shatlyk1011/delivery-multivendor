import { useQuery } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { CATEGORIES } from "./query/restaurantQuery";

export const useGetCategories = () => {
  const { data: categories } = useQuery<Categories[]>({
    queryFn: async () => {
      const { data } = await axios({
        data: {
          query: CATEGORIES,
          variables: { limit: 20 },
        },
      });
      return await data.data.Categories.docs;
    },
    staleTime: Infinity,
    queryKey: ["categories"],
  });

  return { categories };
};
