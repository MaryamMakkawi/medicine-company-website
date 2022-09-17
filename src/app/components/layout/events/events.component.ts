import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  eventAll!: any[];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // All Article
    this.api
      .post('http://localhost/aphamea_project/web/index.php/activity/get-all', {
        type: 2,
        searchFilters: {
          filters: [
            { name: 'title', status: false },
            { name: 'content', status: false },
          ],
          searchText: '',
          platform: 0,
        },
      })
      .subscribe({
        next: (res: any) => {
          if (res.status == 'ok') {
            this.eventAll = res.activities;
            console.log(this.eventAll);
          }
        },
      });
  }
}
