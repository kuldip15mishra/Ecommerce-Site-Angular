import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'salientink-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  id: string;
  msg: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.msg = this.route.snapshot.queryParams['msg'];
    this.id = this.route.snapshot.queryParams['id'];
  }

}
