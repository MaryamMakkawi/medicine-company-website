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
  categories: { id: number; name: string }[] = [];
  pharmaceuticalForms: { id: number; name: string }[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // All Pharmaceutical
    this.getAllPharmaceuticalForms();

    // All Categories
    this.getAllCategories();

    // All Medicines
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


getAllCategories() {
  this.api.get(environment.base + '/category/get-all').subscribe((res: any) => {
    if (res.status == 'ok') {
      this.categories = res.categories;
    } else {
      console.log(res);
    }
  });
}

getAllPharmaceuticalForms() {
  this.api.get(environment.base + '/pharmaceutical-form/get-all').subscribe((res: any) => {
    if (res.status == 'ok') {
      this.pharmaceuticalForms = res.pharmaceuticalForm;
    } else {
      console.log(res);
    }
  });
}

cateAllMedicine(cate:any){
  this.api.post(environment.base +`/category/get-medicines?categoryId=${cate}`,{id:cate}).subscribe((res: any) => {
    if (res.status == 'ok') {
      console.log(res);
      this.medicines=[];
      this.medicines = res.medicines;
    } else {
    }
  });
}
pharmeAllMedicine(pharme:any){
  this.api.get(environment.base +`/pharmaceutical-form/get-medicines?id=${pharme}`).subscribe((res: any) => {
    if (res.status == 'ok') {
      console.log(res);
      this.medicines=[];
      this.medicines = res.medicines;
    } else {
    }
  });
}


}
