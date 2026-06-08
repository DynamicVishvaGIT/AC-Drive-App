import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-vdf-selection-result',
  templateUrl: './vdf-selection-result.page.html',
  styleUrls: ['./vdf-selection-result.page.scss'],
  standalone: false,
})
export class VdfSelectionResultPage implements OnInit {

  vdfSelectionData: any;
  currentUser:any;
  includePeripherals = true;

  constructor(private router: Router, private userService: User, private toastController: ToastController,
    private alertController: AlertController) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state) {
      this.vdfSelectionData = nav.extras.state['vdfSelectionData'];
      console.log(this.vdfSelectionData);
    }
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
      // this.quiz_details();
    });
  }

  /* =========================================
     VFD DATA
  ========================================= */

  selectedVfd = {
    motorFLC: '2.08',
    vfdCatNo: 'XDCP-D1K5-01A',
    rating: '1.5kW / 3.7A',
    ambient: 'Derated for 40°C ambient',
  };

  /* =========================================
     DOWNLOAD DATASHEET
  ========================================= */

  async downloadDatasheet() {

    // Replace with actual PDF URL from API

    const pdfUrl =
      'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

    window.open(pdfUrl, '_blank');

    const toast = await this.toastController.create({
      message: 'Datasheet download started',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });

    await toast.present();
  }

  /* =========================================
     DOWNLOAD REPORT
  ========================================= */

  async downloadSelectionReport() {

    try {

      const reportUrl =
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

      window.open(reportUrl, '_blank');

      const toast = await this.toastController.create({
        message: 'Selection Report download started',
        duration: 2000,
        color: 'success',
        position: 'bottom',
      });

      await toast.present();

    } catch (error) {

      const toast = await this.toastController.create({
        message: 'Unable to download report',
        duration: 2000,
        color: 'danger',
      });

      await toast.present();
    }
  }

  /* =========================================
     CREATE ENQUIRY
  ========================================= */

  createEnquiry() {

    this.router.navigate([
      '/my-new-enquiry'
    ]);

  }

  /* =========================================
     NEW CALCULATION
  ========================================= */

  newCalculation() {

    this.router.navigate([
      '/vdf-select-tool'
    ]);

  }

  /* =========================================
     INCLUDE PERIPHERALS
  ========================================= */

  onPeripheralToggle(event: any) {

    this.includePeripherals = event.detail.checked;

    console.log(
      'Include Peripherals:',
      this.includePeripherals
    );
  }

  /* =========================================
     SHARE REPORT (OPTIONAL)
  ========================================= */

  async shareReport() {

    const alert = await this.alertController.create({
      header: 'Selection Report',
      message:
        'Share functionality can be connected with Capacitor Share Plugin.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  /* =========================================
     PRINT REPORT (OPTIONAL)
  ========================================= */

  async printReport() {

    const toast = await this.toastController.create({
      message: 'Print functionality coming soon',
      duration: 2000,
      color: 'medium',
    });

    await toast.present();
  }

}
