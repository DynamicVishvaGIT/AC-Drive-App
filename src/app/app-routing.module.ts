import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'vdf-select-tool',
    loadChildren: () => import('./vdf-select-tool/vdf-select-tool.module').then( m => m.VdfSelectToolPageModule)
  },
  {
    path: 'my-quiz',
    loadChildren: () => import('./my-quiz/my-quiz.module').then( m => m.MyQuizPageModule)
  },
  {
    path: 'my-enquiry',
    loadChildren: () => import('./my-enquiry/my-enquiry.module').then( m => m.MyEnquiryPageModule)
  },
  {
    path: 'my-quiz-details',
    loadChildren: () => import('./my-quiz-details/my-quiz-details.module').then( m => m.MyQuizDetailsPageModule)
  },
  {
    path: 'my-questionnaire',
    loadChildren: () => import('./my-questionnaire/my-questionnaire.module').then( m => m.MyQuestionnairePageModule)
  },
  {
    path: 'my-result',
    loadChildren: () => import('./my-result/my-result.module').then( m => m.MyResultPageModule)
  },
  {
    path: 'training-registration',
    loadChildren: () => import('./training-registration/training-registration.module').then( m => m.TrainingRegistrationPageModule)
  },
  {
    path: 'my-enquiry-details',
    loadChildren: () => import('./my-enquiry-details/my-enquiry-details.module').then( m => m.MyEnquiryDetailsPageModule)
  },
  {
    path: 'my-new-enquiry',
    loadChildren: () => import('./my-new-enquiry/my-new-enquiry.module').then( m => m.MyNewEnquiryPageModule)
  },
  {
    path: 'my-profile',
    loadChildren: () => import('./my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'my-leads',
    loadChildren: () => import('./my-leads/my-leads.module').then( m => m.MyLeadsPageModule)
  },
  {
    path: 'my-service-request',
    loadChildren: () => import('./my-service-request/my-service-request.module').then( m => m.MyServiceRequestPageModule)
  },
  {
    path: 'add-new-lead',
    loadChildren: () => import('./add-new-lead/add-new-lead.module').then( m => m.AddNewLeadPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'vdf-selection-result',
    loadChildren: () => import('./vdf-selection-result/vdf-selection-result.module').then( m => m.VdfSelectionResultPageModule)
  },
  {
    path: 'registration-success',
    loadChildren: () => import('./registration-success/registration-success.module').then( m => m.RegistrationSuccessPageModule)
  },
  {
    path: 'service-request-success',
    loadChildren: () => import('./service-request-success/service-request-success.module').then( m => m.ServiceRequestSuccessPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
