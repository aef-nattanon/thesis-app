export type HouseT = { house_number: string; id: string };

export interface IHouse {
  house_number: string | null;
  id: string | null;
}
export type IHouses = IHouse[];
