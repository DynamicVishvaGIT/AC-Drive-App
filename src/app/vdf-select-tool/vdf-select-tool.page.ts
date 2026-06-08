import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { User } from '../user';
import { Api } from '../api';
import { Common } from '../common';
import { Subject, takeUntil } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-vdf-select-tool',
  templateUrl: './vdf-select-tool.page.html',
  styleUrls: ['./vdf-select-tool.page.scss'],
  standalone: false,
})
export class VdfSelectToolPage implements OnInit {

  private _unsubscribeAll: Subject<any>;

  currentUser:any;
  vfdJson:any = {main_supply_id:'', application_type_id:'', motor_type_id:'', motor_make:'', motor_poles:'', motor_kw:'', motor_flc:'', 
    ambient_temperature:'', encoder_feedback_id:'', communication_protocol_id:'', digital_input:'', digital_output:'', relay_output:'', analog_input:'',
    analog_output:'', safe_torque_off:'', remote_keypad_id:''};
  main_supply_array:any=[];
  application_type_array:any=[];
  motor_type_array:any=[];
  motor_poles_array: any=[];
  motor_kw_array: any=[];
  motor_flc_array:any=[];
  motor_efficiency_array:any=[];
  isProgrammaticUpdate = false;
  encoder_feedback_array: any=[];
  communication_protocol_array:any=[];
  encoderFeedback = 'no';
  remoteKeypad = 'yes';
  remote_keypad_array:any=[];
  disable: boolean = false;

  tempFocused = false;
  diFocused = false;
  doFocused = false;
  relayFocused = false;
  analogFocused = false;
  aoFocused = false;
  stoFocused = false;

  constructor(private navCtrl: NavController, private toastController: ToastController, private userService: User, private apiService: Api, private commonService: Common,
    private router: Router
  ) { 
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
      this.load_main_supply();
      this.load_application_type();
      this.load_motor_type();
      this.load_motor_poles();
      this.load_motor_kw();
      this.load_motor_flc();
      this.load_motor_efficiency();
      this.load_encoder_feedback();
      this.load_communication_protocol();
      this.load_remote_keypad();
    });
  }

  load_main_supply() {
    this.apiService.load_main_supply()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.main_supply_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  load_application_type() {
    this.apiService.load_application_type()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.application_type_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  load_motor_type() {
    this.apiService.load_motor_type()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.motor_type_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  load_motor_efficiency() {
    this.apiService.load_motor_efficiency()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.motor_efficiency_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  load_motor_poles() {
    this.apiService.load_motor_poles()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.motor_poles_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  load_motor_kw() {
    this.apiService.load_motor_kw()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.motor_kw_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  load_motor_flc() {
    this.apiService.load_motor_flc()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.motor_flc_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  onMotorKwChange() {
    if (this.isProgrammaticUpdate) {
      return;
    }
    this.getMotorMapping('KW');
  }

  onMotorFlcChange() {
    if (this.isProgrammaticUpdate) {
      return;
    }
    this.getMotorMapping('FLC');
  }

  getMotorMapping(type: 'KW' | 'FLC') {
    if (!this.vfdJson.motor_make) {
      this.commonService.showToastMessage('Please select Motor Efficient Class.', 'toast-error','', 2000);
      return;
    }
    if (!this.vfdJson.motor_poles) {
      this.commonService.showToastMessage('Please select Motor No of Poles.', 'toast-error','', 2000);
      return;
    }
    let formData = new FormData();
    formData.append("motor_make", this.vfdJson.motor_make || '');
    formData.append("motor_poles", this.vfdJson.motor_poles || '');
    formData.append("motor_kw", this.vfdJson.motor_kw || '');
    formData.append("motor_flc", this.vfdJson.motor_flc || '');
    this.apiService.get_motor_mapping(formData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: any) => {
        if (response.status == 1) {
          this.isProgrammaticUpdate = true;
          if (type === 'KW') {
            // API returns selected_motor_flc
            this.vfdJson.motor_flc = response.selected_motor_flc;
          } 
          else {
            // API returns selected_motor_kw
            this.vfdJson.motor_kw = response.selected_motor_kw;
          }
          setTimeout(() => {
              this.isProgrammaticUpdate = false;
            }, 100);
          }
        },(respError) => {
          this.commonService.showToastMessage(respError,'toast-error','',4000);
        }
      );
  }

  load_encoder_feedback() {
    this.apiService.load_encoder_feedback()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.encoder_feedback_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  load_communication_protocol() {
    this.apiService.load_communication_protocol()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.communication_protocol_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  load_remote_keypad() {
    this.apiService.load_remote_keypad()
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.remote_keypad_array = response.data;
    },
    respError => {
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  get_motor_specifications() {
    if (!this.vfdJson.main_supply_id) {
      this.commonService.showToastMessage('Please select main supply.', 'toast-error','', 2000);
      return;
    }
    if (!this.vfdJson.application_type_id) {
      this.commonService.showToastMessage('Please select application type.', 'toast-error','', 2000);
      return;
    }
    if (!this.vfdJson.motor_type_id) {
      this.commonService.showToastMessage('Please select motor type.', 'toast-error','', 2000);
      return;
    }
    if (!this.vfdJson.motor_make) {
      this.commonService.showToastMessage('Please select motor efficient class.', 'toast-error','', 2000);
      return;
    }
    if (!this.vfdJson.motor_poles) {
      this.commonService.showToastMessage('Please select motor no of poles.', 'toast-error','', 2000);
      return;
    }
    if (!this.vfdJson.motor_kw) {
      this.commonService.showToastMessage('Please select motor capacity.', 'toast-error','', 2000);
      return;
    }
    if (!this.vfdJson.motor_flc) {
      this.commonService.showToastMessage('Please select motor full load current.', 'toast-error','', 2000);
      return;
    }
    if (!this.vfdJson.ambient_temperature) {
      this.commonService.showToastMessage('Please select motor ambient temperature.', 'toast-error','', 2000);
      return;
    }
    if(this.encoderFeedback=='yes'){
      if (!this.vfdJson.encoder_feedback_id) {
        this.commonService.showToastMessage('Please select encoder feedback card.', 'toast-error','', 2000);
        return;
      }
    }
    if (!this.vfdJson.communication_protocol_id) {
      this.commonService.showToastMessage('Please select communication protocol.', 'toast-error','', 2000);
      return;
    }
    if(this.remoteKeypad=='yes'){
      if (!this.vfdJson.remote_keypad_id) {
        this.commonService.showToastMessage('Please select motor full load current.', 'toast-error','', 2000);
        return;
      }
    }
    this.commonService.presentLoading();
    this.disable = true;
    let formData = new FormData();
    formData.append("main_supply_id",this.vfdJson.main_supply_id),  
    formData.append("application_type_id",this.vfdJson.application_type_id),
    formData.append("motor_type_id",this.vfdJson.motor_type_id),
    formData.append("motor_make",this.vfdJson.motor_make),
    formData.append("motor_poles",this.vfdJson.motor_poles),
    formData.append("motor_kw",this.vfdJson.motor_kw),  
    formData.append("motor_flc",this.vfdJson.motor_flc),
    formData.append("ambient_temperature",this.vfdJson.ambient_temperature)
    if(this.encoderFeedback=='yes'){
      formData.append("encoder_feedback_id",this.vfdJson.encoder_feedback_id)
    }
    formData.append("communication_protocol_id",this.vfdJson.communication_protocol_id),
    formData.append("digital_input",this.vfdJson.digital_input),
    formData.append("digital_output",this.vfdJson.digital_output),
    formData.append("relay_output",this.vfdJson.relay_output),
    formData.append("analog_input",this.vfdJson.analog_input),
    formData.append("analog_output",this.vfdJson.analog_output),
    formData.append("safe_torque_off",this.vfdJson.safe_torque_off)
    if(this.remoteKeypad=='yes'){
      formData.append("remote_keypad_id",this.vfdJson.remote_keypad_id)
    }
    this.apiService.get_motor_specifications(formData)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((response:any) => {
      console.log(response);
      this.commonService.showToastMessage(response.message, 'toast-success','', 2000);
      this.commonService.dismissLoading();
      this.disable = false;
      // this.vfdJson = {main_supply_id:'', application_type_id:'', motor_type_id:'', motor_make:'', motor_poles:'', motor_kw:'', motor_flc:'', 
      //   ambient_temperature:'', encoder_feedback_id:'', communication_protocol_id:'', digital_input:'', digital_output:'', relay_output:'', analog_input:'',
      //   analog_output:'', safe_torque_off:'', remote_keypad_id:''};
        // this.router.navigate(['/my-quiz']);
      const navigationExtras: NavigationExtras = {
        state: {
          vdfSelectionData: response.data
        }
      };
        this.router.navigate(['/vdf-selection-result'],navigationExtras);
    },
    respError => {
      this.disable = false;
      this.commonService.dismissLoading();
      this.commonService.showToastMessage(respError, 'toast-error','', 4000);
    })
  }

  doRefresh(event:any) {
    this.load_main_supply();
    this.load_application_type();
    this.load_motor_type();
    this.load_motor_poles();
    this.load_motor_kw();
    this.load_motor_flc();
    this.load_motor_efficiency();
    this.load_encoder_feedback();
    this.load_communication_protocol();
    this.load_remote_keypad();
    this.vfdJson = {main_supply_id:'', application_type_id:'', motor_type_id:'', motor_make:'', motor_poles:'', motor_kw:'', motor_flc:'', 
      ambient_temperature:'', encoder_feedback_id:'', communication_protocol_id:'', digital_input:'', digital_output:'', relay_output:'', analog_input:'',
      analog_output:'', safe_torque_off:'', remote_keypad_id:''};
    this.encoderFeedback = 'no';
    this.remoteKeypad = 'yes';
    event.target.complete();
  }


  goBack() {
    this.navCtrl.back();
  }

  async calculateDrive() {
    const toast = await this.toastController.create({
      message: 'Drive calculation started',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

}
