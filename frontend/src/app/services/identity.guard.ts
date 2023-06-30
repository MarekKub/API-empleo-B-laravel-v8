import { Injectable } from "@angular/core";
import { Router, CanActivate, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "./user.service";
import { Observable } from "rxjs";

@Injectable()
export class IdentityGuard implements CanActivate{

    constructor(        
        private _router: Router,
        private _userService: UserService
    ){
    }

    canActivate() {
        let identity = this._userService.getIdentity();

        if(identity.sub){
            return true;
        }
        else{
            this._router.navigate(['/error']);
            return false;
        }
    }
}