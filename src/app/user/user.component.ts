import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent{
 userform:FormGroup|any;
 data:any;
 isedit:boolean=false;
 username:any;
 usernameShow:any;
  
constructor(private _dataservice:DataserviceService, private _toast:ToastrService){}

    ngOnInit():void{
      this.userform = new FormGroup({
        'name':new FormControl(),
        'email':new FormControl(),
        'phone':new FormControl(),
        'profileid':new FormControl()
      })
      this.getdata();
      }

      update(user:any){
        this.userform.id = user.id;
        this.usernameShow= this.userform.value.name;
        this._dataservice.update(this.userform.id,this.userform.value).subscribe(res=>{
          this.showInfo();
          this.getdata();
        })

      }
      senddata(userform:FormGroup){
        this.data.push(this.userform.value);
        this.username= this.userform.value.name;
        this._dataservice.postdata(this.userform.value).subscribe(res=>{
          this.showSuccess();
          this.getdata();
        })
      }

      getdata(){
        this._dataservice.getdata().subscribe(res=>{
          this.data = res;
        })
      }

    submit(){

    }
    
    addmodel(){
      this.isedit=false;
      this.userform.reset();
    }
    
    edit(i:any, user:any){
      this.isedit=true;
      this.userform.id= user.id;
      this.userform.setValue({
        name:user.name,
        email:user.email,
        phone:user.phone,
        profileid:user.profileid
      })
    }

    delete(index:number, user:any){
      this.userform.id= user.id;
      this._dataservice.delete(this.userform.id, user).subscribe(res=>{
        this.data.splice(index, 1);
        this.showError();
      })
    }
  

    public showSuccess():void{
      this._toast.success('Data Successfully added', this.username);
    }
    public showInfo():void{
      this._toast.success('Data Successfully updated', this.usernameShow);
    }
    public showError():void{
      this._toast.error('Data Successfully deleted', this.username);
    }
    

}
     
  
