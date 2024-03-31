import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  skie: any;
  skie2: any;

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
   
   // this.skie= this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.paramMap
    .pipe(map(() => window.history.state)).subscribe(res=>{
      this.skie= res;   
      this.skie2= res.line_items;   
      console.log(this.skie2);
                              
     })
  }
  save(name:any,quantity:any,price:any,total:any){
    console.log("order",name);
    const data = {
      name: name,
      quantity: quantity,
      price: price,
      total:total,
    };

  }
}
