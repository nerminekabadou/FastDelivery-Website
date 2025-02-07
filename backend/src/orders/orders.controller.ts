import {
    Controller,
    Get,
    Post,
    Body,
    Res,
    Req,
    Param,
    Delete,
    UseGuards
  } from '@nestjs/common';
  import { OrdersService } from './orders.service';
  import { OrderEntity } from './entities/order.entity';
  import { CreateOrderDto } from './dto/create-order.dto';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { OrderStatus } from './enums/order-status.enum';
  import { RoleGuard } from 'src/auth/guard/role.guard';
  import { Roles } from 'src/users/entities/user-roles.enum';
  
  @Controller('orders')
  @UseGuards(new RoleGuard(Roles.USER))
  export class OrdersController {
    constructor(
      public ordersService: OrdersService,
      @InjectRepository(OrderEntity)
      private readonly orderRepository: Repository<OrderEntity>,
    ) {}
   
   
    @Post('create')
    createOrder(@Body() createOrderDto: CreateOrderDto, @Req() req: any) {
      const userId = req.user.id;
      return this.ordersService.createOrder(createOrderDto, userId);
    }
    
    @Get('newOrderForCurrentUser')
    async getNewOrderForCurrentUser(@Req() req): Promise<OrderEntity> {
      const userId = req.user.id;
      return this.ordersService.getNewOrderForCurrentUser(userId);
  
    }
  
    @Post('pay')
    async pay(@Req() req) {
      const order = await this.ordersService.getNewOrderForCurrentUser(req.user.id);
  
      if (!order) {
        throw new Error('Order Not Found!');
      }
  
      order.paymentId = true;
      order.status = OrderStatus.PAYED;
      await this.ordersService.saveOrder(order);
  
      return order.id;
    }
  
  
    @Get('track/:id')
    async trackOrder(@Param('id') id: number) {
      return await this.orderRepository.findOne({where: {id : id}});
    }
  
 
    @Get('payed')
    async getAllPayedOrders(): Promise<OrderEntity[]> {
      return this.ordersService.getAllPayedOrders();
    }
  
  
    @Delete('payed/:id')
    async delete(@Param('id') id: number): Promise<void> {
      await this.ordersService.delete(+id);
    }
  }
  
  