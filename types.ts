interface UserId {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Address {
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface UserIdentification extends UserId, Address {
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type { UserIdentification };
