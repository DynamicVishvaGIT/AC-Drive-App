import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { IonTabs, ModalController, Platform, PopoverController } from '@ionic/angular';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {

  @ViewChild('myTabs',{ static: false }) tabs!: IonTabs;
  selectedTab: string = '';
  activeTabName: string | undefined = '';
  tab_name: any;
  public selectedIndex = 0;
  selectedPath = '';
  selected:boolean = false;

  constructor(private platform: Platform, private statusBar: StatusBar, private popoverController: PopoverController, private modalCtrl: ModalController, private router: Router, private location: Location, private userService: User) {
    this.selectedPath = window.location.pathname;
    console.log(this.selectedPath);
    this.initializeApp();
    this.platform.backButton.subscribeWithPriority(9999, async () => {
      const modal = await this.modalCtrl.getTop();  // 👈 check if a modal is open
      if (modal) {
        await modal.dismiss();   // close modal instead of navigating
        return;
      }
      const popover = await this.popoverController.getTop();
        if (popover) {
          await popover.dismiss();
          return;
      }
      if ((this.router.url.includes('folder'))|| (this.router.url.includes('home')) || (this.router.url.includes('login'))) {
        (navigator as any).app.exitApp();
      }
      else if  (this.router.url.includes('sign-up')) {
        this.router.navigate(['login'])
      }
       
      else if  ((this.router.url.includes('my-profile')) ||(this.router.url.includes('my-quiz')) ||(this.router.url.includes('vdf-select')) ||(this.router.url.includes('my-enquiry')) ||(this.router.url.includes('my-leads')) ||(this.router.url.includes('my-service-request')) ||(this.router.url.includes('project-lead')) ||(this.router.url.includes('projectlist')) ||(this.router.url.includes('quiz'))   ||(this.router.url.includes('scanretailer')) || (this.router.url.includes('scheme')) ) {
        this.router.navigate(['home'])
      }
      else if  (this.router.url.includes('my-quiz-details')) {
        this.router.navigate(['my-quiz'])
      }

      else if  (this.router.url.includes('my-enquiry-details')) {
        this.router.navigate(['my-enquiry'])
      }
      else{
        this.location.back();
      }
       
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#2c56fa');
      this.statusBar.overlaysWebView(false);
    });
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.selectedPath = window.location.pathname;
  }

  async checkLoginStatus(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('118',currentUser);
    if (Object.keys(currentUser).length != 0) {
      this.userService.setCurrentUser(currentUser);  // Update via UserService
      this.router.navigateByUrl('/home');  // Navigate to home page after login
    } else {
      this.router.navigate(['/login']);
    }
  }

  getSelectedTab(): void {
    this.selected = true;
    this.activeTabName = this.tabs.getSelected();
    this.tab_name=this.activeTabName
  }
  openPage(page:any) {
    this.selectedPath = page.url;
   this.router.navigate([page.url])
  }
}
