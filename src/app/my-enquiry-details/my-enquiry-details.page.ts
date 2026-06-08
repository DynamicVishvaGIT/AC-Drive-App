import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-enquiry-details',
  templateUrl: './my-enquiry-details.page.html',
  styleUrls: ['./my-enquiry-details.page.scss'],
  standalone: false,
})
export class MyEnquiryDetailsPage implements OnInit {

  constructor(private navCtrl: NavController, private toastController: ToastController) { }

  ngOnInit() {
  }

  /* BACK */
  goBack() {
    this.navCtrl.navigateBack('/my-enquiry');
  }

  /* DOWNLOAD PDF */
  async downloadPdf() {
    const content = `
        ENQUIRY DETAILS
        Enquiry ID: ENQ-1247
        Title:
        VFD 5.5kW Specification Request
        Drive Model:
        LK-VFD-5500
        Contact Person:
        John Smith
        Email:
        john.smith@example.com
        Phone:
        +91 98765 43210
        Company:
        ABC Industries Pvt. Ltd.
        Application Type:
        Pump Application
        Motor Power:
        5.5 kW
        Voltage:
        415V, 3-Phase=
        Frequency:
        50Hz
        Additional Notes:
        Requires remote keypad and Modbus RTU communication.
        Installation at Chennai location.
      `;
    const blob = new Blob(
      [content],
      { type: 'application/pdf' }
    );
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enquiry-details.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
    const toast = await this.toastController.create({
      message: 'PDF Download Started',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

}
