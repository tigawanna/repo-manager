import {
  GetListResponse,
  HttpError,
  UseLoadingOvertimeReturnType,
} from "@refinedev/core";
import { InfiniteQueryObserverResult } from "@tanstack/query-core";
import { Loader } from "lucide-react";

interface InfiniteButtonProps<T> {
  query: InfiniteQueryObserverResult<GetListResponse<T>, HttpError> &
    UseLoadingOvertimeReturnType;
    innerRef:React.LegacyRef<HTMLDivElement> | undefined
}

export function InfiniteButton<T = any>({ query,innerRef }: InfiniteButtonProps<T>) {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = query;
  return (
    <div 
    ref={innerRef}
    className="w-full flex flex-col items-center justify-center">
      <button
        className="text-sm border rounded-xl px-5 py-1 hover:border-purple-400"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : hasNextPage ? (
          "Load More"
        ) : (
          ""
        )}
      </button>

      <div>
        {isLoading && !isFetchingNextPage ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : null}
      </div>
    </div>
  );
}
