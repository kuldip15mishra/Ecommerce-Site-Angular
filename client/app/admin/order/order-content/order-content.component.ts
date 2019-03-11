import { Settings } from './../../../settings';
import { EventEmitter, Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'order-content',
  templateUrl: './order-content.component.html',
  styleUrls: ['./order-content.component.css']
})
export class OrderContentComponent implements OnInit {
  @Input() orders: any;
  @Output() changeOrderStatus = new EventEmitter();
  @Output() changePaymentStatus = new EventEmitter();
  @Output() cancelOrder = new EventEmitter();
  Settings: any;
  constructor() { }

  ngOnInit() {
    this.Settings = Settings;
  }
  orderStatus(order: any, status: any) {
    order.status = status.value;
    this.changeOrderStatus.emit(order);
  }
  paymentStatus(order: any, status: any) {
    order.payment.state = status.value;
    this.changePaymentStatus.emit(order);
  }
  cancelOrd(order: any) {
    this.cancelOrder.emit(order);
  }
}
