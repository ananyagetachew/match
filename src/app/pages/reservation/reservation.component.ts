import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';
import { ReservationData } from 'src/app/reservation';
import { ReservationService } from 'src/app/reservation.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<ReservationData> | null;
  sortDirections: NzTableSortOrder[];
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<ReservationData> | null;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  today = new Date();
  nextDay = new Date(this.today);
  tomorrow = this.nextDay.setDate(this.today.getDate() + 1);
  currentDate = this.today.toISOString().split('T')[0];
  tomorrowDate = this.nextDay.toISOString().split('T')[0];

  editCache: { [key: string]: { edit: boolean; data: ReservationData } } = {};
  listOfData: ReservationData[] = [];
  dates = ['Today', 'Tomorrow', 'All', 'Passed'];
  activeTabIndex: number = 0;
  mode = 'date';
  selectedDate: Date | null = null;
  query: string = '';
  posts:any;
  constructor(
    private reservationService: ReservationService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.reservationService.getOrder()
        .subscribe(response => {
          this.posts = response;
          console.log("ghfh",this.posts)
        });
  
    this.reservationService.getReservations().subscribe((res) => {
      var listOfDataToday = res.reverse();
      this.listOfData = listOfDataToday.filter(
        (reservedTabeleDataToday: { date: any }) =>
          reservedTabeleDataToday.date == this.currentDate.toString()
      );
      this.updateEditCache();
    });
  }

  onTabChange(index: number): void {
    this.activeTabIndex = index;
    if (this.activeTabIndex == 0) {
      this.reservationService.getReservations().subscribe((res) => {
        var listOfDataAll = res.reverse();
        this.listOfData = listOfDataAll.filter(
          (reservedTabeleDataToday: { date: any }) =>
            reservedTabeleDataToday.date == this.currentDate.toString()
        );
        this.dates[this.activeTabIndex] =
          'Today(' + this.listOfData.length + ')';
        this.updateEditCache();
      });
    }
    if (this.activeTabIndex == 1) {
      this.reservationService.getReservations().subscribe((res) => {
        var listOfDataAll = res.reverse();
        this.listOfData = listOfDataAll.filter(
          (reservedTabeleDataTomorrow: { date: any }) =>
            reservedTabeleDataTomorrow.date == this.tomorrowDate.toString()
        );
        this.dates[this.activeTabIndex] =
          'Tomorrow(' + this.listOfData.length + ')';
        this.updateEditCache();
      });
    }
    if (this.activeTabIndex == 2) {
      this.reservationService.getReservations().subscribe((res) => {
        var listOfDataAll = res.reverse();
        this.listOfData = listOfDataAll.filter(
          (reservedTabeleDataAll: { status: string }) =>
            reservedTabeleDataAll.status == 'Active' ||
            reservedTabeleDataAll.status == 'Pending'
        );
        this.dates[this.activeTabIndex] = 'All(' + this.listOfData.length + ')';
        this.updateEditCache();
      });
    }
    if (this.activeTabIndex == 3) {
      this.reservationService.getReservations().subscribe((res) => {
        var listOfDataAll = res.reverse();
        this.listOfData = listOfDataAll.filter(
          (reservedTabeleDataPassed: { status: string }) =>
            reservedTabeleDataPassed.status == 'Deactive'
        );
        this.dates[this.activeTabIndex] =
          'Passed(' + this.listOfData.length + ')';
        this.updateEditCache();
      });
    }
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    var editData = {
      id: +id,
      fullName: this.listOfData[index].fullName,
      email: this.listOfData[index].email,
      phone: this.listOfData[index].phone,
      numberOfPeople: this.listOfData[index].numberOfPeople,
      date: this.listOfData[index].date,
      time: this.listOfData[index].time,
      occasion: this.listOfData[index].occasion,
      message: this.listOfData[index].message,
      status: this.listOfData[index].status,
    };

    this.reservationService
      .updateReservedTableStatus(editData, editData.id)
      .subscribe((res) => {
        this.getReservationDataById(editData.id);
        this.message.success('Update successful!', { nzDuration: 3000 });
      });
  }

  getReservationDataById(id: number) {
    this.reservationService.getReservationById(id).subscribe((res) => {
      console.log(res);
    });
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  deleteData(id: string) {
    var resId = +id;
    this.reservationService.deleteReservation(resId).subscribe((res) => {
      this.message.success('Delete successful!', { nzDuration: 3000 });
      location.reload();
    });
  }

  expandSet = new Set<string>();
  onExpandChange(id: string, checked: boolean): void {
    // var reserveId = +id;
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  filterItems(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase().trim();
    if (query == '') {
      this.ngOnInit();
    } else {
      this.listOfData = this.listOfData.filter(
        (item) =>
          item.fullName.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query)
      );
    }
  }

  filterItemsByDate() {
    if (this.selectedDate) {
      this.listOfData = this.listOfData.filter(
        (item) =>
          new Date(item.date).toDateString() ===
          this.selectedDate!.toDateString()
      );
    } else {
      this.listOfData = this.listOfData;
    }
  }
}
