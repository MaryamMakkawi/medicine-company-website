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
  medicines = [
    {
      barcode: '1111',
      productName: 'ogmantin',
      indications: 'fsdfdsfdsfdsf',
      packing: '26',
      composition: 'this is test medice',
      medicineImages: ['../../../../assets/images/vitamin.jpg'],
      expiredDate: '2022/02/02',
      price: '1500',
      netPrice: '1500',
      pharmaceuticalFormId: '4',
      categoryId: '2',
    },
    {
      barcode: '1111',
      productName: 'ogmantin',
      indications: 'fsdfdsfdsfdsf',
      packing: '26',
      composition: 'this is test medice',
      medicineImages: ['../../../../assets/images/vitamin.jpg'],
      expiredDate: '2022/02/02',
      price: '1500',
      netPrice: '1500',
      pharmaceuticalFormId: '4',
      categoryId: '2',
    },
    {
      barcode: '1111',
      productName: 'ogmantin',
      indications: 'fsdfdsfdsfdsf',
      packing: '26',
      composition: 'this is test medice',
      medicineImages: ['../../../../assets/images/vitamin.jpg'],
      expiredDate: '2022/02/02',
      price: '1500',
      netPrice: '1500',
      pharmaceuticalFormId: '4',
      categoryId: '2',
    },
    {
      barcode: '1111',
      productName: 'ogmantin',
      indications: 'fsdfdsfdsfdsf',
      packing: '26',
      composition: 'this is test medice',
      medicineImages: ['../../../../assets/images/vitamin.jpg'],
      expiredDate: '2022/02/02',
      price: '1500',
      netPrice: '1500',
      pharmaceuticalFormId: '4',
      categoryId: '2',
    },
    {
      barcode: '1111',
      productName: 'ogmantin',
      indications: 'fsdfdsfdsfdsf',
      packing: '26',
      composition: 'this is test medice',
      medicineImages: ['../../../../assets/images/vitamin.jpg'],
      expiredDate: '2022/02/02',
      price: '1500',
      netPrice: '1500',
      pharmaceuticalFormId: '4',
      categoryId: '2',
    },
    {
      barcode: '1111',
      productName: 'ogmantin',
      indications: 'fsdfdsfdsfdsf',
      packing: '26',
      composition: 'this is test medice',
      medicineImages: ['../../../../assets/images/vitamin.jpg'],
      expiredDate: '2022/02/02',
      price: '1500',
      netPrice: '1500',
      pharmaceuticalFormId: '4',
      categoryId: '2',
    },
  ];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // this.api.get(environment.base + '/medicine/get-all').subscribe({
    //   next: (medicinesApi: any) => {
    //     console.log(medicinesApi);
    //     this.medicines = medicinesApi;
    //   },
    // });
  }
}
