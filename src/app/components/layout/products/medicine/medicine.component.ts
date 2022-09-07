import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
})
export class MedicineComponent implements OnInit {
  constructor(private route: ActivatedRoute, private api: ApiService,private auth:AuthService) {}

  ngOnInit(): void {
     this.auth.user$.subscribe(user=>{
      console.log(user?.getToken());
     })

    const id = this.route.snapshot.paramMap.get('id');
    let param = new HttpParams().set('id', +id!);
    console.log(environment.base + '/medicine/get?' + param);
    this.api.get(environment.base + '/medicine/get', param).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }
}
