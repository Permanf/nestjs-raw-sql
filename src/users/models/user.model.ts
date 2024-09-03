import { Exclude } from 'class-transformer';
import AddressModel from './address.model';

type UserModelData = {
  id: number;
  name: string;
  email: string;
  password: string;
  addressId?: number;
  address_street?: string;
  address_city?: string;
  address_country?: string;
};
class UserModel {
  id: number;
  name: string;
  email: string;
  @Exclude()
  password: string;
  address?: AddressModel;

  constructor(data: UserModelData) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    if (data.addressId) {
      this.address = new AddressModel({
        id: data.addressId,
        street: data.address_street,
        city: data.address_city,
        country: data.address_country,
      });
    }
  }
}

export default UserModel;