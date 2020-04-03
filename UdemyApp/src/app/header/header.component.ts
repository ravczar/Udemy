import { Subscription } from 'rxjs';
import { User } from './../shared/models/user.model';
import { AuthService } from './../shared/services/authentication/auth.service';
import { DataStorageService } from './../shared/storage/data-storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;
  private user: User;

  constructor(private dataStorage: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user:User) => {
      console.log("Otrzymałem zalogowanego usera!!!");
      this.isAuthenticated = !user ? false : true;
      this.user = user;
      console.log(!!user);
    });

  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData(){
    this.dataStorage.storeRecipes();
  }
  onFetchData(){
    this.dataStorage.fetchRecipes().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }


}
