import { DataStorageService } from './../shared/storage/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private dataStorage: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData(){
    this.dataStorage.storeRecipes();
  }
  onFetchData(){
    this.dataStorage.fetchRecipes().subscribe();
  }


}
