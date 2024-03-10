import { Skeleton } from "../ui/skeleton";

export function PokemonCardSkeleton() {
  return (
    <div className="flex items-center my-4 gap-2">
      <div>
        <Skeleton className="h-12 w-12 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[50px]" />
        <Skeleton className="h-4 w-[100px] md:w-[250px]" />
      </div>
    </div>
  );
}
