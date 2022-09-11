import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/interfaces/medicine.model';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  medicines!: Medicine[]|undefined;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get(environment.base + '/medicine/get-all').subscribe({
      next: (medicinesApi: any) => {
        if (medicinesApi.status == 'ok') {
          this.medicines = medicinesApi.medicines;
          console.log(this.medicines);
          console.log(medicinesApi);
        }
      },
    });
  }
}
