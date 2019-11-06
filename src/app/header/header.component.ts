import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  constructor(private dataStorage: DataStorageService) { }

  ngOnInit() {
  }
  saveData(){
    this.dataStorage.storeRecipes();
  }
  fetchData(){
    this.dataStorage.fetchRecipes().subscribe();
  }
}
