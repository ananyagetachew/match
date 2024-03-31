export interface ReservedTableDate {
  id: number;
  date: string;
  numberOfTableReserved: number;
}

export interface ReservedOrder {
  id: number;
  date_created: string;
  total: number;
  line_items:Object;
}

export interface ReservationData {
  id: string;
  fullName: string;
  email: string;
  phone: number;
  numberOfPeople: number;
  date: string;
  time: string;
  occasion: string;
  message: string;
  status: string;
}
