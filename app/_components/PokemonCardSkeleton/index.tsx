import { Skeleton } from "../ui/skeleton";

export function PokemonCardSkeleton() {
  return (
    <div className="flex items-center my-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
    </div>
  );
}
