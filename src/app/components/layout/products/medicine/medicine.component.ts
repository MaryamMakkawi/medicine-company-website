import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/interfaces/medicine.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.scss'],
})
export class MedicineComponent implements OnInit {
  medicine: Medicine |undefined;
  imgFirst!: string;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.api.get(environment.base + `/medicine/get?id=${id}`).subscribe({
      next: (res: any) => {
        if (res.status == 'ok') {
          this.medicine = res.medicine;
          this.imgFirst = res.medicine.imgs[0];
          console.log(res);
        }
      },
    });
  }
}
