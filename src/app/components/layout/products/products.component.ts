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
  medicines!: Medicine[] | undefined;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .post(environment.base + '/medicine/get-all', {
        searchFilters: {
          filters: [
            { name: 'productName', status: false },
            { name: 'indications', status: false },
            { name: 'composition', status: false },
          ],
          searchText: '',
          platform: 0,
        },
      })
      .subscribe({
        next: (medicinesApi: any) => {
          if (medicinesApi.status == 'ok') {
            this.medicines = medicinesApi.medicines;
            console.log(this.medicines);
            console.log(medicinesApi);
          }
        },
      });
  }

  onSearch(searchValue: any) {
    console.log(searchValue);
    this.api
      .post(environment.base + '/medicine/get-all', {
        searchFilters: {
          filters: [
            { name: 'productName', status: true },
            { name: 'indications', status: false },
            { name: 'composition', status: false },
          ],
          searchText: searchValue,
          platform: 0,
        },
      })
      .subscribe({
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
