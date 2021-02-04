type Address = {
  zipCode: string;
  street: string;
  neighborhood: string;
  number?: string;
};

export default interface ICreatePlaceDTO {
  name: string;
  description: string;
  categoryId: string;

  address: Address;
}
