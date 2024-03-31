import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReservationData, ReservedTableDate,ReservedOrder } from 'src/app/reservation';
import { ReservationService } from 'src/app/reservation.service';

@Component({
  selector: 'app-reserved-table-date',
  templateUrl: './reserved-table-date.component.html',
  styleUrls: ['./reserved-table-date.component.css'],
})
export class ReservedTableDateComponent {
  editCache: { [key: string]: { edit: boolean; data: ReservedOrder } } = {};
  reservedTabelDate: ReservedTableDate[] = [];
  posts: ReservedOrder[] = [];
  constructor(
    private reservationService: ReservationService,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {
    this.reservationService.getOrder()
        .subscribe((response) => {
          this.posts = response.reverse();
          console.log("ghfh",this.posts)
         
        });
  
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  

  deleteData(id: number) {
    this.reservationService.deleteReservedTableData(id).subscribe((res) => {
      this.message.success('Delete successful!', { nzDuration: 3000 });
      location.reload();
    });
  }
}
