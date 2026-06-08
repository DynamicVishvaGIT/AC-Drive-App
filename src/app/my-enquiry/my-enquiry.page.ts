import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-enquiry',
  templateUrl: './my-enquiry.page.html',
  styleUrls: ['./my-enquiry.page.scss'],
  standalone: false,
})
export class MyEnquiryPage implements OnInit {

  searchText: string = '';

  searchFocused: boolean = false;

  enquiries = [
    {
      id: 'ENQ-1247',
      priority: 'High',
      title: 'VFD 5.5kW Specification Request',
      code: 'LK-VFD-5500',
      status: 'Open',
      date: '2024-02-18',
      name: 'John Smith'
    },
    {
      id: 'ENQ-1246',
      priority: 'Medium',
      title: 'AC Drive for Pump Application',
      code: 'LK-VFD-7500-P',
      status: 'In Progress',
      date: '2024-02-17',
      name: 'Sarah Johnson'
    },
    {
      id: 'ENQ-1245',
      priority: 'Low',
      title: 'Industrial Conveyor Drive System',
      code: 'LK-VFD-11000',
      status: 'Resolved',
      date: '2024-02-15',
      name: 'Mike Chen'
    },
    {
      id: 'ENQ-1244',
      priority: 'Medium',
      title: 'HVAC Fan Drive Enquiry',
      code: 'LK-VFD-3700',
      status: 'Closed',
      date: '2024-02-14',
      name: 'Emily Davis'
    },
    {
      id: 'ENQ-1243',
      priority: 'High',
      title: 'Compressor Motor Drive',
      code: 'LK-VFD-15000',
      status: 'Open',
      date: '2024-02-13',
      name: 'Robert Wilson'
    }
  ];

  constructor(private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  getPriorityDotClass(priority: string) {

    switch (priority) {

      case 'High':
        return 'dot-high';

      case 'Medium':
        return 'dot-medium';

      case 'Low':
        return 'dot-low';

      default:
        return '';
    }
  }

  getPriorityTextClass(priority: string) {

    switch (priority) {

      case 'High':
        return 'priority-high';

      case 'Medium':
        return 'priority-medium';

      case 'Low':
        return 'priority-low';

      default:
        return '';
    }
  }

  getStatusClass(status: string) {

    switch (status) {

      case 'Open':
        return 'badge-open';

      case 'In Progress':
        return 'badge-progress';

      case 'Resolved':
        return 'badge-resolved';

      case 'Closed':
        return 'badge-closed';

      default:
        return '';
    }
  }

  createEnquiry() {
    this.router.navigate(['/my-new-enquiry']);
    // const toast = await this.toastController.create({
    //   message: 'Create New Enquiry clicked',
    //   duration: 1500,
    //   position: 'bottom'
    // });
    // await toast.present();
  }

  goToEnquiryDetails() {
    this.router.navigate(['/my-enquiry-details']);
  }

}
