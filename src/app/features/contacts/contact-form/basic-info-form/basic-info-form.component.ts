import { Component, OnInit, Input } from '@angular/core';
import { ValidationErrors, FormGroup, AsyncValidatorFn, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { sources } from '../../constants/source';
import { contactStatuses } from '../../constants/contact-status';
import { linesOfBusiness } from '../../constants/line-of-business';
import { DropdownOption } from '../../../ui/model/dropdown-option'
import { Contact } from '../../models/contact';
import { Observable, of } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';
import { ContactService } from '../../../service/contact.service';

@Component({
  selector: 'contact-basic-info-form',
  templateUrl: './basic-info-form.component.html',
  styleUrls: ['./basic-info-form.component.css']
})
export class BasicInfoFormComponent implements OnInit {

  basicInfoFormGroup: FormGroup;
  originalFormState: Contact;

  availableSources: DropdownOption[] = sources;
  availableContactStatuses: DropdownOption[] = contactStatuses;
  availableLinesOfBusiness: DropdownOption[] = linesOfBusiness;

  @Input() contact: Contact;

  constructor(private fb: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.createForm();
    this.saveForm();
  }

  private saveForm() {
    this.originalFormState = this.basicInfoFormGroup.getRawValue();
  }

  private createForm() {
    if (!this.contact) this.contact = { 'status': 'NEW', 'authority': false } as Contact;

    let authority: string = this.contact.authority ? 'true' : 'false';

    this.basicInfoFormGroup = this.fb.group({
      'firstName': [this.contact.firstName, [Validators.required, Validators.pattern('[A-Za-z \-\_]+')]],
      'lastName': [this.contact.lastName, [Validators.required, Validators.pattern('[A-Za-z \-\_]+')]],
      'email': [this.contact.email, [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      [this.emailExistsValidator()],
        'blur'
      ],
      'source': [this.contact.source, [Validators.required]],
      'sourceDetails': [this.contact.sourceDetails, [Validators.pattern('[A-Za-z0-9 \-\_]+')]],
      'status': [this.contact.status, [Validators.required]],
      'lineOfBusiness': [this.contact.linesOfBusiness],
      'authority': [authority],
      'title': [this.contact.title, [Validators.pattern('[A-Za-z \-\_]+')]],
      'company': [this.contact.company, [Validators.pattern('[A-Za-z0-9 \-\_]+')]]
    });
  }

  private emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!this.contact.id) {
        //if we get here it's a new contact
        return this.checkEmail(control);
      } else {
        //if the user has an ID, that means a duplicate email is okay - it could be the
        //user's original email address
        if (this.originalFormState && this.originalFormState.email == control.value) {
        //if we get here the user has the same email address as always - no conflict
          return of(null);
        } else {
          //the user changed the email address - need to check
          return this.checkEmail(control);
        }
      }
    };
  }

  private checkEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    if (control.value && (<string>control.value).trim().length > 0) {
      return of(control.value).pipe(
        delay(500),
        switchMap((email) => this.contactService.doesEmailExist(email).pipe(
          map(emailExists => emailExists ? { emailExists: true } : null)
        ))
      );
    } else {
      return of(null);
    }
  }

  populateContact(contact: Contact) {
    let basicInfo: FormGroup = this.basicInfoFormGroup;

    contact.authority = (basicInfo.controls['authority'].value == 'true');
    contact.company = basicInfo.controls['company'].value;
    contact.email = basicInfo.controls['email'].value;
    contact.firstName = basicInfo.controls['firstName'].value;
    contact.lastName = basicInfo.controls['lastName'].value;
    contact.linesOfBusiness = basicInfo.controls['lineOfBusiness'].value;
    contact.source = basicInfo.controls['source'].value;
    contact.sourceDetails = basicInfo.controls['sourceDetails'].value;
    contact.status = basicInfo.controls['status'].value;
    contact.title = basicInfo.controls['title'].value;
  }
}
