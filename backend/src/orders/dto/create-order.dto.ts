import { OrderItemDto } from './order-item.dto';
import { OrderStatus } from '../enums/order-status.enum';
import { LatLngDto } from './latlng.dto';

export class CreateOrderDto {
  id: number;

  createdAt: Date;

  status: OrderStatus;

  totalPrice: number;

  name: string;

  adresse: string;

  paymentId!: string;

  addressLatLng: LatLngDto;

  userId: number;

  orderItems: OrderItemDto[];
}