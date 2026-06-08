import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-new-enquiry',
  templateUrl: './my-new-enquiry.page.html',
  styleUrls: ['./my-new-enquiry.page.scss'],
  standalone: false,
})
export class MyNewEnquiryPage implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;

  /* ========================= */
  /* CALCULATIONS */
  /* ========================= */

  calculations: any[] = [
    {
      model: 'INVT-CHF100A-7R5G/11P-4',
      power: '7.5',
      voltage: '415',
      type: 'Pump',
      date: '2024-03-05 14:30',
      selected: false
    },
    {
      model: 'INVT-GD100-5R5G-4',
      power: '5.5',
      voltage: '415',
      type: 'Fan',
      date: '2024-03-05 11:15',
      selected: false
    },
    {
      model: 'INVT-CHF100A-011G/015P-4',
      power: '11',
      voltage: '415',
      type: 'Conveyor',
      date: '2024-03-04 16:45',
      selected: false
    },
    {
      model: 'INVT-GD100-2R2G-4',
      power: '2.2',
      voltage: '415',
      type: 'Compressor',
      date: '2024-03-04 09:20',
      selected: false
    }
  ];

  selectedCount = 0;

  /* ========================= */
  /* PRODUCTS */
  /* ========================= */

  products: any[] = [];

  /* ========================= */
  /* FORM */
  /* ========================= */

  subject = '';
  requirements = '';
  fullName = '';
  companyName = '';
  email = '';
  phone = '';
  uploadedFiles: any[] = [];
  /* FOCUS */
  subjectFocused = false;
  requirementFocused = false;
  nameFocused = false;
  companyFocused = false;
  emailFocused = false;
  phoneFocused = false;

  constructor(private navCtrl: NavController,private toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {
  }

  /* ========================= */
  /* BACK */
  /* ========================= */

  goBack() {
    this.navCtrl.navigateBack('/my-enquiry');
  }

  /* ========================= */
  /* TOGGLE */
  /* ========================= */

  toggleSelection(item: any) {

    item.selected = !item.selected;

    this.selectedCount =
      this.calculations.filter(x => x.selected).length;

  }

  /* ========================= */
  /* ADD SELECTED */
  /* ========================= */

  addSelectedItems() {

    const selectedItems =
      this.calculations.filter(x => x.selected);

    selectedItems.forEach(item => {

      const alreadyExists =
        this.products.find(
          (x: any) => x.model === item.model
        );

      if (!alreadyExists) {

        this.products.push({

          model: item.model,
          power: item.power,
          voltage: item.voltage,
          application: item.type,
          quantity: 1,
          date: item.date,

          modelFocused: false,
          qtyFocused: false,
          powerFocused: false,
          voltageFocused: false

        });

      }

      item.selected = false;

    });

    this.selectedCount = 0;

  }

  /* ========================= */
  /* ADD MANUAL */
  /* ========================= */

  addManualProduct() {

    const currentDate =
      new Date().toLocaleString();

    this.products.push({

      model: '',
      power: '',
      voltage: '',
      application: '',
      quantity: 1,
      date: currentDate,

      modelFocused: false,
      qtyFocused: false,
      powerFocused: false,
      voltageFocused: false

    });

  }

  /* ========================= */
  /* DELETE */
  /* ========================= */

  deleteProduct(index: number) {

    this.products.splice(index, 1);

  }

  /* ========================= */
  /* FILE */
  /* ========================= */

  async openUploadConfirm() {
    const alert = await this.alertController.create({
      header: 'Permission Required',
      message: 'Do you want to select files from your device?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Allow',
          handler: () => {
            this.fileInput.nativeElement.click();
          }
        }
      ]
    });

    await alert.present();
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }
  }

  /* ========================= */
  /* SUBMIT */
  /* ========================= */

  async submitEnquiry() {

    const toast = await this.toastController.create({
      message: 'Enquiry Submitted Successfully',
      duration: 2000,
      position: 'bottom'
    });

    await toast.present();

  }

}
