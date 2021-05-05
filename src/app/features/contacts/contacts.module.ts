import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AlertModule } from '../../ui/alert/alert.module';
import { BasicInfoFormComponent } from './contact-form/basic-info-form/basic-info-form.component';
import { AddressesFormComponent } from './contact-form/addresses-form/addresses-form.component';
import { PhonesFormComponent } from './contact-form/phones-form/phones-form.component';
import { AddressTypeFormComponent } from './contact-form/addresses-form/address-type-form/address-type-form.component';
import { PhoneTypeFormComponent } from './contact-form/phones-form/phone-type-form/phone-type-form.component';
import { ReviewFormComponent } from './contact-form/review-form/review-form.component';
import { NgxFlagPickerModule } from 'ngx-flag-picker';
import { PhoneMaskDirective } from '../../util/phone-mask.directive';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewContactsComponent } from './view-contacts/view-contacts.component';
import { ViewContactComponent } from './view-contact/view-contact.component';
import { MatCardModule } from '@angular/material/card';

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-contact' },
  { path: 'add-contact', component: AddContactComponent },
  { path: 'edit-contact', component: EditContactComponent },
  { path: 'view-contacts', component: ViewContactsComponent },
  { path: 'view-contact', component: ViewContactComponent }
];

@NgModule({
  declarations: [
    ContactFormComponent,
    AddContactComponent,
    BasicInfoFormComponent,
    AddressesFormComponent,
    PhonesFormComponent,
    AddressTypeFormComponent,
    PhoneTypeFormComponent,
    ReviewFormComponent,
    PhoneMaskDirective,
    EditContactComponent,
    ViewContactsComponent,
    ViewContactComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatStepperModule,
    MatRadioModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    ReactiveFormsModule,
    AlertModule,
    NgxFlagPickerModule,
    RouterModule.forChild(routes)
  ]
})

export class ContactsModule { }
