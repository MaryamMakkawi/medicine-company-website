import { Component, OnInit } from '@angular/core';

import { AnimationOptions } from 'ngx-lottie';
import { CompanyInfo } from 'src/app/interfaces/companyInfo.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  companyInfo!: CompanyInfo|undefined;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .get('http://localhost/aphamea_project/web/index.php/company/get?id=1')
      .subscribe({
        next: (res: any) => {
          if (res.status == 'ok') {
            this.companyInfo = res.company;
            console.log(this.companyInfo);
          }
        },
      });
  }
  team: AnimationOptions = {
    path: '../../../../assets/lottieFiles/team-blue.json',
  };
  aboutUs: AnimationOptions = {
    path: '../../../../assets/lottieFiles/about-us.json',
  };
}


// {
//   "id": 1,
//   "name": "Muhammad Co.",
//   "description": "Hi this company belongs to muhammad nawlo",
//   "img": null,
//   "logo": null,
//   "numOfEmployee": 50,
//   "companyTeams": [
//       {
//           "id": 1,
//           "companyId": 1,
//           "userId": 1,
//           "position": "manager",
//           "description": "this is a good manager"
//       },
//       {
//           "id": 2,
//           "companyId": 1,
//           "userId": 1,
//           "position": "employee",
//           "description": "this is a bad employee"
//       }
//   ],
//   "contacts": [
//       {
//           "id": 1,
//           "companyId": 1,
//           "userId": null,
//           "type": 1,
//           "content": "+96355548214"
//       },
//       {
//           "id": 2,
//           "companyId": 1,
//           "userId": null,
//           "type": 1,
//           "content": "nawlo@gmail.com"
//       }
//   ]
// }
