import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
  standalone: false,
})
export class MyProfilePage implements OnInit {
  
  currentUser:any;

  constructor(private navCtrl: NavController, private userService: User, private router: Router) { }

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
  }

  /* ======================= */
  /* EDIT PROFILE */
  /* ======================= */

  goToEditProfile() {
    this.navCtrl.navigateForward('/edit-profile');
  }

  /* ======================= */
  /* SETTINGS */
  /* ======================= */

  goToSettings() {
    this.navCtrl.navigateForward('/settings');
  }

  /* ======================= */
  /* SUPPORT */
  /* ======================= */

  goToSupport() {
    this.navCtrl.navigateForward('/help-support');
  }

  /* ======================= */
  /* LOGOUT */
  /* ======================= */

  logout() {
    console.log('Logout clicked');
    this.userService.clearCurrentUser();  // 🔥 important
      // Clear user data from storage
    this.clearUserData();
    this.router.navigateByUrl('login');
  }

  private clearUserData() {
    // Clear user session data
    localStorage.removeItem('currentUser');
    sessionStorage.clear();
  }

}
