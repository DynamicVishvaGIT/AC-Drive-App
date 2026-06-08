import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Common } from '../common';
import { Api } from '../api';
import { User } from '../user';
import { Subject, takeUntil } from 'rxjs';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Router } from '@angular/router';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';

@Component({
  selector: 'app-my-service-request',
  templateUrl: './my-service-request.page.html',
  styleUrls: ['./my-service-request.page.scss'],
  standalone: false,
})
export class MyServiceRequestPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  /* ======================= */
  /* FORM DATA */
  /* ======================= */
  currentUser: any;
  serviceJson :any ={request_type:'', priority_level:'', subject:'', drive_model:'', serial_number:'', issue_category:'', detailed_description:'', full_name:'', email_address:'', phone_number:'', site_location:'', };
  request_types:any=['Technical Support', 'Maintenance Request', 'Repair Service', 'Installation Support', 'Training Request', 'Complaint / Issue'];
  priority_levels: any=['Low - General Inquiry', 'Medium - Normal Issue', 'High - Urgent Support Needed', 'Critical - System Down'];
  issue_categories:any =['Equipment Malfunction', 'Error Code / Alarm', 'Performance Issue','Configuration Support', 'Parameter Settings', 'Communication Problem', 'Other'];
  cameraPhoto: File | null = null;
  cameraPhotoUrl: string = '';

  galleryImages: File[] = [];
  galleryImageUrls: string[] = [];
  disable: boolean = false;

  /* ======================= */
  /* INPUT FOCUS */
  /* ======================= */
  requestTypeFocused = false;
  priorityFocused = false;
  subjectFocused = false;

  driveModelFocused = false;
  serialFocused = false;
  issueFocused = false;
  descriptionFocused = false;

  nameFocused = false;
  emailFocused = false;
  phoneFocused = false;
  locationFocused = false;

  constructor(private router: Router, private commonService: Common, private apiService: Api, private userService: User, private camera: Camera, private webview: WebView) { 
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
    this.serviceJson.request_type = this.request_types[0];
    this.serviceJson.priority_level = this.priority_levels[1];
    this.serviceJson.issue_category = this.issue_categories[0];
  }
  /* ======================= */
  /* CAMERA */
  /* ======================= */
  openCamera() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true
    };
    this.camera.getPicture(options).then(
      async (imagePath) => {
        this.cameraPhotoUrl = this.webview.convertFileSrc(imagePath);
        const response = await fetch(this.cameraPhotoUrl);
        const blob = await response.blob();
        this.cameraPhoto = new File(
          [blob],
          `camera_${Date.now()}.jpg`,
          { type: blob.type || 'image/jpeg' }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  removeCameraPhoto() {
    this.cameraPhoto = null;
    this.cameraPhotoUrl = '';
  }
  /* ======================= */
  /* GALLERY */
  /* ======================= */
  openGallery() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(
      async (imagePath) => {
        this.galleryImageUrls.push(this.webview.convertFileSrc(imagePath));
        const response = await fetch(this.webview.convertFileSrc(imagePath));
        const blob = await response.blob();
        const file = new File(
          [blob],
          `gallery_${Date.now()}.jpg`,
          { type: blob.type || 'image/jpeg' }
        );
        this.galleryImages.push(file);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  removeGalleryImage(index: number) {
    this.galleryImages.splice(index, 1);
    this.galleryImageUrls.splice(index, 1);
  }

  /* ======================= */
  /* SUBMIT */
  /* ======================= */

  add_technical_support() {
    if (!this.serviceJson.request_type) {
      this.commonService.showToastMessage('Please select request type.', 'toast-error','', 2000);
      return;
    }
    if (!this.serviceJson.priority_level) {
      this.commonService.showToastMessage('Please select priority level.', 'toast-error','', 2000);
      return;
    }
    if (!this.serviceJson.subject) {
      this.commonService.showToastMessage('Please enter subject.', 'toast-error','', 2000);
      return;
    }
    if (!this.serviceJson.drive_model) {
      this.commonService.showToastMessage('Please enter drive model.', 'toast-error','', 2000);
      return;
    }
    if (!this.serviceJson.issue_category) {
      this.commonService.showToastMessage('Please select issue category.', 'toast-error','', 2000);
      return;
    }
    if (!this.serviceJson.detailed_description) {
      this.commonService.showToastMessage('Please enter detailed description.', 'toast-error','', 2000);
      return;
    }
    if (!this.serviceJson.full_name) {
      this.commonService.showToastMessage('Please enter full name.', 'toast-error','', 2000);
      return;
    }
    if (!this.serviceJson.email_address) {
      this.commonService.showToastMessage('Please enter email address.', 'toast-error','', 2000);
      return;
    }
    if (this.serviceJson.email_address) {
      let epattern = /[A-Za-z0-9._%+-]{1,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
      if (!epattern.test(this.serviceJson.email_address)) {
        this.commonService.showToastMessage('Please enter email in correct format.', 'toast-error', 'top', 2000);
        return;
      }
    }
    if (!this.serviceJson.phone_number) {
      this.commonService.showToastMessage('Please enter phone number.', 'toast-error','', 2000);
      return;
    }
    let phonePattern = /(^\d{10}$)/;
    if (!phonePattern.test(this.serviceJson.phone_number)) {
      this.commonService.showToastMessage('Please enter phone number in correct format.', 'toast-error', 'top', 2000);
      return;
    }
    if (!this.serviceJson.site_location) {
      this.commonService.showToastMessage('Please enter site location.', 'toast-error','', 2000);
      return;
    }
    if (!this.cameraPhoto) {
      this.commonService.showToastMessage('Please capture equipment photo.','toast-error','',2000);
      return;
    }
    this.commonService.presentLoading();
    this.disable = true;
    let formData = new FormData();
    if (this.cameraPhoto) {
      formData.append('camera_photo',this.cameraPhoto,this.cameraPhoto.name);
    }
    this.galleryImages.forEach(file => {
      formData.append('gallery_images',file,file.name);
    });
    formData.append("request_type",this.serviceJson.request_type),
    formData.append("priority_level",this.serviceJson.priority_level),
    formData.append("subject",this.serviceJson.subject),
    formData.append("drive_model",this.serviceJson.drive_model),
    formData.append("serial_number",this.serviceJson.serial_number),
    formData.append("issue_category",this.serviceJson.issue_category),
    formData.append("detailed_description",this.serviceJson.detailed_description),
    formData.append("full_name",this.serviceJson.full_name),
    formData.append("email_address",this.serviceJson.email_address),
    formData.append("phone_number",this.serviceJson.phone_number),
    formData.append("site_location",this.serviceJson.site_location),
    formData.append("user_id",this.currentUser.USER_ID),
    this.apiService.add_technical_support(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'toast-success','', 2000);
      this.commonService.dismissLoading();
      this.disable = false;
      this.resetForm();
      this.router.navigate(['/service-request-success']);
      // this.router.navigate(['/home']);
    },
    respError => {
      this.disable = false;
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  // submit() {
  //   this.router.navigate(['/service-request-success']);
  // }

  resetForm() {
    this.serviceJson ={request_type:'', priority_level:'', subject:'', drive_model:'', serial_number:'', issue_category:'', detailed_description:'', full_name:'', email_address:'', phone_number:'', site_location:'', };
    this.cameraPhoto = null;
    this.cameraPhotoUrl = '';
    this.galleryImages = [];
    this.galleryImageUrls = [];
    this.serviceJson.request_type = this.request_types[0];
    this.serviceJson.priority_level = this.priority_levels[1];
    this.serviceJson.issue_category = this.issue_categories[0];
  }

}
