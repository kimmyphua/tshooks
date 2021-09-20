import { FC, ChangeEvent, useState } from "react";

interface Props {
  name?: string;
  age?: number;
  email?: string;
  haircolor: HairColor;
  // getName: (name:string) => string
}

export enum HairColor {
  Blonde = "Your hair is Brown.",
  Brown = "Your hair is Brown.",
  Pink = "Your hair is Pink.",
}

export const Person: FC<Props> = ({ name, age, email, haircolor }) => {
  const [country, setCountry] = useState<string | null>("");

  type NameType = "Pedro" | "Jack";
  const nameForType: NameType = "Jack";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  return (
    <div>
      <h1>{name}</h1>
      <h1>{age}</h1>
      <h1>{email}</h1>
      <h1>{haircolor}</h1>

      <h1>{country}</h1>

      <input placeholder="country" onChange={handleChange} />
    </div>
  );
};
