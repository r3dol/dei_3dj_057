import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/LoginService/login.service';
import { PackagingService } from 'src/app/Services/PackageService/package.service';


@Component({
  selector: 'app-create-package',
  templateUrl: './create-package.component.html',
  styleUrls: ['./create-package.component.css']
})
export class CreatePackageComponent implements OnInit {

  formCreatePackage!: FormGroup;
  constructor(private loginService:LoginService,private packagingService: PackagingService,private fb: FormBuilder, private router:Router) {}

  isAuth: boolean = false;
  authorizedRoles: string[] = ["logMan","admin"];
  async isAuthenticated() {
    const role= await this.loginService.getRole();
    if(!this.authorizedRoles.includes(role)){
      this.router.navigate(['/']);
      return false
    }
    else
      return true;
    
  }

  async ngOnInit() {
    this.isAuth = await this.isAuthenticated();
    this.formCreatePackage = this.fb.group({
      packagingID: [''],
      truckID: [''],
      deliveryID: [''],
      xPosition: [''],
      yPosition: [''],
      zPosition: [''],
    });

  }

  onSubmit() {
    console.log(this.formCreatePackage.value);
    this.packagingService.createPackage(this.formCreatePackage.value);
  
  }

  get packagingID() {
    return this.formCreatePackage.get('packagingID');
  }

  get truckID() {
    return this.formCreatePackage.get('truckID');
  }

  get deliveryID() {
    return this.formCreatePackage.get('deliveryID');
  }

  get xPosition() {
    return this.formCreatePackage.get('xPosition');
  }

  get yPosition() {
    return this.formCreatePackage.get('yPosition');
  }

  get Position() {
    return this.formCreatePackage.get('zPosition');
  }


}
