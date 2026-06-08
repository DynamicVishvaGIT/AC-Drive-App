import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../user';
import { Common } from '../common';
import { Api } from '../api';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-my-leads',
  templateUrl: './my-leads.page.html',
  styleUrls: ['./my-leads.page.scss'],
  standalone: false,
})
export class MyLeadsPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  selectedTab = 'All';
  searchText = '';
  currentUser: any;
  dataLoaded: boolean = true;
  my_leads: any=[];
  count_data:any={won:0, lost:0,pending:0,won_amount:0};

  filteredLeads: any[] = [];

  constructor(private router: Router, private userService: User, private commonService: Common, private apiService: Api) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log('39',this.currentUser);
      } 
      else {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          this.currentUser = JSON.parse(storedUser);
          console.log('44',this.currentUser);
        }
      }
    });
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd) // Ensure the event is of type NavigationEnd
      ).subscribe((event: NavigationEnd) => {
        if (event.url.includes('/my-leads')){ // Check if user navigated back to a specific URL
          this.load_leads('All');
        }
    });
  }

  load_leads(status: string) {
    this.commonService.presentLoading();
    this.dataLoaded = false;
    let leadData:any={booking_id:''};
    leadData['user_id'] = this.currentUser.USER_ID;
    leadData['status'] = status;
    this.apiService.load_leads(leadData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      // this.commonService.showToastMessage(response.message, 'toast-success','', 2000);
      this.count_data = response.dashboard;
      this.my_leads = response.data;
      this.selectedTab = status;
      this.filteredLeads = [...this.my_leads];
      this.dataLoaded = true;
      this.commonService.dismissLoading();
    },
    respError => {
      this.dataLoaded = false;
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }


  // changeTab(tab: string) {
  //   this.selectedTab = tab;
  //   this.filterLeads();
  // }

  filterLeads() {
    let data = [...this.my_leads];
    if (this.selectedTab !== 'All') {
      data = data.filter(
        x => x.status === this.selectedTab
      );
    }
    if (this.searchText) {
      data = data.filter(
        x =>
          x.lead_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          x.phone_number.includes(this.searchText)
      );
    }
    this.filteredLeads = data;
  }

  goToAddLead() {
    this.router.navigate(['/add-new-lead']);
  }

}
