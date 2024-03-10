import Image from "next/image";
import { PokemonType } from "../../_types/global";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

type PokemonCardProps = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: PokemonType[];
  color: string;
};

function getInitials(name: string): string {
  const nameParts: string[] = name?.split(" ") ?? [];
  let initials: string = "";

  if (name) {
    for (const part of nameParts) {
      initials += part[0];
    }
  }

  return initials.toUpperCase();
}

export const PokemonCard = (pokemon: PokemonCardProps) => {
  return (
    <article className="cursor-pointer flex flex-row items-center justify-start gap-4 my-4 transition-all duration-300 hover:bg-purple-300 hover:p-4 hover:rounded-lg">
      <div>
        <Avatar>
          <AvatarImage
            height={56}
            width={56}
            src={pokemon?.sprites?.front_default}
            alt={pokemon?.name}
            style={{ backgroundColor: pokemon?.color }}
          />
          <AvatarFallback
            data-testid="pokemon-card-initials"
            style={{ backgroundColor: pokemon?.color }}
          >
            {getInitials(pokemon?.name)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col">
        <div>{pokemon?.name}</div>
        <div className="flex flex-row gap-2 w-32">
          {pokemon?.types?.map((item) => (
            <Badge key={item.type.name}>{item.type.name}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
};
