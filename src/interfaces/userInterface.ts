export interface IUser {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  picture: {
    large: string;
    thumbnail: string;
  };
  location: {
    city: string;
    country: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  email: string;
  login: {
    uuid: string;
  };
}
